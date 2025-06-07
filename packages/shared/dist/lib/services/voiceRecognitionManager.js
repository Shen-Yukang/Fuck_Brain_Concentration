/**
 * 语音识别管理器
 * 解决语音识别状态竞争和内存泄漏问题
 */
import { VoiceError, VoiceErrorType } from '../types/voiceTypes.js';
import { RECOGNITION_CONSTANTS } from '../constants/voiceConstants.js';
export class VoiceRecognitionManager {
    state = {
        isListening: false,
        isConversationMode: false,
        hasResult: false,
    };
    recognition; // SpeechRecognition type varies by browser
    callbacks = {};
    timeoutHandle;
    conversationTimeoutHandle;
    cleanupTasks = [];
    constructor() {
        this.setupCleanupHandlers();
    }
    // 获取当前状态
    getState() {
        return { ...this.state };
    }
    // 检查浏览器支持
    checkBrowserSupport() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            throw new VoiceError(VoiceErrorType.SPEECH_RECOGNITION_NOT_SUPPORTED, 'Speech recognition not supported in this browser');
        }
    }
    // 请求麦克风权限
    async requestPermission() {
        try {
            if (typeof navigator === 'undefined' || !navigator.mediaDevices) {
                throw new VoiceError(VoiceErrorType.SPEECH_RECOGNITION_NOT_SUPPORTED, 'MediaDevices API not supported');
            }
            const stream = await Promise.race([
                navigator.mediaDevices.getUserMedia({ audio: true }),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Permission request timeout')), RECOGNITION_CONSTANTS.PERMISSION_CHECK_TIMEOUT)),
            ]);
            // 立即停止流，只是检查权限
            stream.getTracks().forEach(track => track.stop());
        }
        catch (error) {
            throw new VoiceError(VoiceErrorType.MICROPHONE_ACCESS_DENIED, 'Microphone permission denied', error);
        }
    }
    // 开始语音识别
    async startListening(options = {}, callbacks = {}) {
        // 检查是否已在监听
        if (this.state.isListening) {
            throw new VoiceError(VoiceErrorType.CONCURRENT_OPERATION, 'Already listening. Stop current recognition first.');
        }
        // 检查浏览器支持
        this.checkBrowserSupport();
        // 请求权限
        await this.requestPermission();
        // 清理之前的实例
        this.cleanup();
        this.callbacks = callbacks;
        const sessionId = this.generateSessionId();
        this.state = {
            isListening: true,
            isConversationMode: this.state.isConversationMode,
            hasResult: false,
            startTime: Date.now(),
            sessionId,
        };
        console.log('Starting speech recognition session:', sessionId);
        try {
            await this.initializeRecognition(options);
            this.setupTimeout(options.timeout);
        }
        catch (error) {
            this.handleError(error);
            throw error;
        }
    }
    // 停止语音识别
    async stopListening() {
        console.log('Stopping speech recognition');
        this.clearTimeouts();
        if (this.recognition) {
            try {
                this.recognition.abort(); // 使用abort而不是stop，确保立即停止
            }
            catch (error) {
                console.warn('Error aborting recognition:', error);
            }
        }
        this.state.isListening = false;
        this.state.hasResult = false;
    }
    // 开始对话模式
    async startConversationMode(options = {}, callbacks = {}) {
        if (this.state.isConversationMode) {
            return; // 已经在对话模式
        }
        console.log('Starting conversation mode');
        this.state.isConversationMode = true;
        // 开始第一次监听
        await this.startListening(options, {
            ...callbacks,
            onResult: (transcript, isFinal, confidence) => {
                callbacks.onResult?.(transcript, isFinal, confidence);
                if (isFinal && transcript.trim()) {
                    this.state.hasResult = true;
                    // 在对话模式下，识别完成后自动重新开始监听
                    this.scheduleNextListening(options, callbacks);
                }
            },
            onError: error => {
                callbacks.onError?.(error);
                // 在对话模式下，某些错误（如no-speech）是正常的
                if (error.type === VoiceErrorType.NO_SPEECH_DETECTED && this.state.isConversationMode) {
                    this.scheduleNextListening(options, callbacks);
                }
            },
        });
    }
    // 停止对话模式
    async stopConversationMode() {
        console.log('Stopping conversation mode');
        this.state.isConversationMode = false;
        if (this.conversationTimeoutHandle) {
            clearTimeout(this.conversationTimeoutHandle);
            this.conversationTimeoutHandle = undefined;
        }
        await this.stopListening();
    }
    // 初始化语音识别
    async initializeRecognition(options) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = options.continuous || false;
        this.recognition.interimResults = options.interimResults || true;
        this.recognition.lang = options.language || 'zh-CN';
        this.recognition.maxAlternatives = options.maxAlternatives || 1;
        this.setupRecognitionEvents();
        this.recognition.start();
    }
    // 设置识别事件监听器
    setupRecognitionEvents() {
        if (!this.recognition)
            return;
        this.recognition.onstart = () => {
            console.log('Speech recognition started');
            this.callbacks.onStart?.();
        };
        this.recognition.onresult = (event) => {
            try {
                const result = event.results[event.results.length - 1];
                const transcript = result[0].transcript;
                const confidence = result[0].confidence || 0;
                const isFinal = result.isFinal;
                this.callbacks.onResult?.(transcript, isFinal, confidence);
                if (isFinal && transcript.trim()) {
                    this.state.hasResult = true;
                }
            }
            catch (error) {
                console.error('Error processing speech result:', error);
                this.handleError(new Error('Error processing speech result'));
            }
        };
        this.recognition.onend = () => {
            console.log('Speech recognition ended');
            const wasListening = this.state.isListening;
            this.state.isListening = false;
            if (wasListening) {
                this.callbacks.onEnd?.();
            }
            this.recognition = undefined;
        };
        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            let errorType = VoiceErrorType.SPEECH_RECOGNITION_FAILED;
            let message = 'Speech recognition error';
            switch (event.error) {
                case 'no-speech':
                    errorType = VoiceErrorType.NO_SPEECH_DETECTED;
                    message = 'No speech detected';
                    break;
                case 'audio-capture':
                case 'not-allowed':
                    errorType = VoiceErrorType.MICROPHONE_ACCESS_DENIED;
                    message = 'Microphone access denied';
                    break;
                case 'network':
                    errorType = VoiceErrorType.NETWORK_ERROR;
                    message = 'Network error during speech recognition';
                    break;
                case 'aborted':
                    errorType = VoiceErrorType.OPERATION_CANCELLED;
                    message = 'Speech recognition was cancelled';
                    break;
            }
            const voiceError = new VoiceError(errorType, message, new Error(event.error));
            this.handleError(voiceError);
        };
    }
    // 设置超时
    setupTimeout(timeout) {
        if (!timeout)
            return;
        this.timeoutHandle = setTimeout(() => {
            if (this.state.isListening && !this.state.hasResult) {
                console.log('Recognition timeout reached');
                const error = new VoiceError(VoiceErrorType.NO_SPEECH_DETECTED, 'Recognition timeout - no speech detected');
                this.handleError(error);
            }
        }, timeout);
    }
    // 安排下次监听（对话模式）
    scheduleNextListening(options, callbacks) {
        // 清除之前的定时器
        if (this.conversationTimeoutHandle) {
            clearTimeout(this.conversationTimeoutHandle);
        }
        // 延迟后重新开始监听，避免状态竞争
        this.conversationTimeoutHandle = setTimeout(async () => {
            if (this.state.isConversationMode && !this.state.isListening) {
                console.log('Conversation mode: starting next listening session');
                try {
                    await this.startListening(options, {
                        ...callbacks,
                        onResult: (transcript, isFinal, confidence) => {
                            callbacks.onResult?.(transcript, isFinal, confidence);
                            if (isFinal && transcript.trim()) {
                                this.state.hasResult = true;
                                this.scheduleNextListening(options, callbacks);
                            }
                        },
                        onError: error => {
                            callbacks.onError?.(error);
                            if (error.type === VoiceErrorType.NO_SPEECH_DETECTED && this.state.isConversationMode) {
                                this.scheduleNextListening(options, callbacks);
                            }
                        },
                    });
                }
                catch (error) {
                    console.error('Error in conversation mode listening:', error);
                    // 如果出错，停止对话模式
                    this.stopConversationMode();
                }
            }
        }, RECOGNITION_CONSTANTS.CONVERSATION_RESTART_DELAY);
    }
    // 清理超时
    clearTimeouts() {
        if (this.timeoutHandle) {
            clearTimeout(this.timeoutHandle);
            this.timeoutHandle = undefined;
        }
    }
    // 生成会话ID
    generateSessionId() {
        return `recognition_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    }
    // 设置清理处理器
    setupCleanupHandlers() {
        if (typeof window === 'undefined')
            return;
        const handleUnload = () => this.cleanup();
        window.addEventListener('beforeunload', handleUnload);
        this.cleanupTasks.push(() => window.removeEventListener('beforeunload', handleUnload));
    }
    // 处理错误
    handleError(error) {
        const voiceError = error instanceof VoiceError
            ? error
            : new VoiceError(VoiceErrorType.SPEECH_RECOGNITION_FAILED, error.message, error);
        console.error('Voice recognition error:', voiceError);
        this.state.isListening = false;
        this.state.hasResult = false;
        this.clearTimeouts();
        this.callbacks.onError?.(voiceError);
    }
    // 清理资源
    cleanup() {
        console.log('Cleaning up voice recognition manager');
        this.clearTimeouts();
        if (this.conversationTimeoutHandle) {
            clearTimeout(this.conversationTimeoutHandle);
            this.conversationTimeoutHandle = undefined;
        }
        if (this.recognition) {
            try {
                this.recognition.abort();
            }
            catch (error) {
                console.warn('Error aborting recognition during cleanup:', error);
            }
            this.recognition = undefined;
        }
        // 执行清理任务
        this.cleanupTasks.forEach(task => {
            try {
                task();
            }
            catch (error) {
                console.warn('Error during cleanup task:', error);
            }
        });
        this.cleanupTasks = [];
        // 重置状态
        this.state = {
            isListening: false,
            isConversationMode: false,
            hasResult: false,
        };
        this.callbacks = {};
    }
}
