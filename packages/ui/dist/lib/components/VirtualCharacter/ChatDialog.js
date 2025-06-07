import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { useStorage } from '@extension/shared';
import { characterStorage, chatHistoryStorage, mcpConfigStorage, speechChatConfigStorage } from '@extension/storage';
import { TaskSelector } from './TaskSelector.js';
import { TaskProgress } from './TaskProgress.js';
export const ChatDialog = ({ isOpen, onClose, onSendMessage, onTaskExecute, characterPosition, }) => {
    const config = useStorage(characterStorage);
    const mcpConfig = useStorage(mcpConfigStorage);
    const speechConfig = useStorage(speechChatConfigStorage);
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [showTaskSelector, setShowTaskSelector] = useState(false);
    const [showTaskProgress, setShowTaskProgress] = useState(false);
    const [currentTaskState, setCurrentTaskState] = useState();
    const [suggestedTask, setSuggestedTask] = useState('');
    const [suggestedQuery, setSuggestedQuery] = useState('');
    const [recognition, setRecognition] = useState(null);
    const [conversationSession, setConversationSession] = useState(false);
    const [hasRecognitionResult, setHasRecognitionResult] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    // Load recent messages when dialog opens
    useEffect(() => {
        if (isOpen) {
            loadRecentMessages();
            // Focus input when dialog opens
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [isOpen]);
    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    // Cleanup when dialog closes
    useEffect(() => {
        if (!isOpen) {
            // Stop all speech activities when dialog closes
            if (recognition) {
                recognition.abort();
                setRecognition(null);
            }
            if ('speechSynthesis' in window) {
                speechSynthesis.cancel();
            }
            setIsListening(false);
            setIsSpeaking(false);
            setConversationSession(false);
            setHasRecognitionResult(false);
        }
    }, [isOpen, recognition]);
    // Cleanup on unmount
    useEffect(() => {
        return () => {
            // Cleanup speech recognition when component unmounts
            if (recognition) {
                recognition.abort();
            }
            if ('speechSynthesis' in window) {
                speechSynthesis.cancel();
            }
        };
    }, [recognition]);
    const loadRecentMessages = async () => {
        try {
            const recentMessages = await chatHistoryStorage.getRecentMessages(10);
            setMessages(recentMessages.reverse()); // Show oldest first
        }
        catch (error) {
            console.error('Error loading recent messages:', error);
        }
    };
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    // Detect research requests in messages
    const detectResearchRequest = (message) => {
        const lowerMessage = message.toLowerCase();
        // Research keywords
        const researchKeywords = [
            '研究',
            '搜索',
            '查找',
            '寻找',
            '帮我找',
            '需要',
            '论文',
            'research',
            'search',
            'find',
            'look for',
            'help me find',
            'papers',
        ];
        // Academic keywords
        const academicKeywords = ['论文', '学术', '研究', '期刊', 'paper', 'academic', 'journal', 'arxiv'];
        // Code keywords
        const codeKeywords = ['代码', '库', '项目', '开源', 'code', 'library', 'project', 'github', 'repository'];
        const hasResearchKeyword = researchKeywords.some(keyword => lowerMessage.includes(keyword));
        if (!hasResearchKeyword) {
            return { isResearch: false };
        }
        // Determine suggested task
        let suggestedTaskId = 'general_research';
        if (academicKeywords.some(keyword => lowerMessage.includes(keyword))) {
            suggestedTaskId = 'research_papers';
        }
        else if (codeKeywords.some(keyword => lowerMessage.includes(keyword))) {
            suggestedTaskId = 'code_search';
        }
        // Extract query (simplified)
        let query = message
            .replace(/^(请|帮我|帮忙|能否|可以|我想|我需要|help me|can you|please)/i, '')
            .replace(/(搜索|查找|寻找|找到|research|search|find)/i, '')
            .replace(/(相关的|关于|有关|related to|about)/i, '')
            .replace(/(论文|资料|信息|papers|information|data)/i, '')
            .trim();
        // Extract content within brackets or quotes
        const bracketMatch = query.match(/[\[【]([^】\]]+)[\]】]/);
        if (bracketMatch) {
            query = bracketMatch[1];
        }
        const quoteMatch = query.match(/["'"]([^"'"]+)["'"]/);
        if (quoteMatch) {
            query = quoteMatch[1];
        }
        return {
            isResearch: true,
            suggestedTask: suggestedTaskId,
            query: query.trim() || message.trim(),
        };
    };
    const handleSendMessage = async () => {
        if (!inputText.trim() || isLoading)
            return;
        const messageText = inputText.trim();
        setInputText('');
        setIsLoading(true);
        try {
            // Check if MCP is enabled and detect research requests
            if (mcpConfig.enabled) {
                const detection = detectResearchRequest(messageText);
                if (detection.isResearch) {
                    // Show task selector with suggestions
                    setSuggestedTask(detection.suggestedTask || '');
                    setSuggestedQuery(detection.query || '');
                    setShowTaskSelector(true);
                    setIsLoading(false);
                    return;
                }
            }
            await onSendMessage(messageText, 'text');
            // Reload messages to get the latest
            await loadRecentMessages();
            // If speech output is enabled and auto-play is on, play the assistant's response
            if (speechConfig.output.enabled && speechConfig.output.autoPlay) {
                // Get the latest character message and play it
                const recentMessages = await chatHistoryStorage.getRecentMessages(1);
                if (recentMessages.length > 0 && recentMessages[0].sender === 'character') {
                    await playAssistantMessage(recentMessages[0].content);
                }
            }
        }
        catch (error) {
            console.error('Error sending message:', error);
        }
        finally {
            setIsLoading(false);
        }
    };
    // Play assistant message using TTS or Web Speech API
    const playAssistantMessage = async (text) => {
        try {
            setIsSpeaking(true);
            if (speechConfig.output.useTTS && typeof chrome !== 'undefined' && chrome.runtime) {
                // Use TTS service
                chrome.runtime.sendMessage({
                    type: 'PLAY_TTS_SOUND',
                    text: text,
                });
                // Simulate speaking duration (TTS doesn't provide end callback)
                const estimatedDuration = text.length * 100; // Rough estimate
                setTimeout(() => {
                    setIsSpeaking(false);
                }, estimatedDuration);
            }
            else {
                // Use Web Speech API
                await playWithWebSpeechAPI(text);
            }
        }
        catch (error) {
            console.error('Error playing assistant message:', error);
            setIsSpeaking(false);
        }
    };
    // Play text using Web Speech API
    const playWithWebSpeechAPI = async (text) => {
        return new Promise(resolve => {
            try {
                if (!('speechSynthesis' in window)) {
                    resolve();
                    return;
                }
                // Stop any current speech
                speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = speechConfig.input.language;
                utterance.rate = speechConfig.output.playSpeed;
                utterance.volume = speechConfig.output.volume;
                utterance.onend = () => {
                    setIsSpeaking(false);
                    resolve();
                };
                utterance.onerror = () => {
                    setIsSpeaking(false);
                    resolve();
                };
                speechSynthesis.speak(utterance);
            }
            catch (error) {
                console.error('Error with Web Speech API:', error);
                setIsSpeaking(false);
                resolve();
            }
        });
    };
    // Toggle conversation mode
    const toggleConversationMode = async () => {
        const newMode = !conversationSession;
        console.log('Toggling conversation mode:', newMode);
        if (newMode) {
            // Start conversation session
            setConversationSession(true);
            await speechChatConfigStorage.enableConversationMode(true);
            setHasRecognitionResult(false); // Reset result flag
            // Start with voice input
            handleVoiceInput();
        }
        else {
            // End conversation session
            console.log('Ending conversation session');
            setConversationSession(false);
            await speechChatConfigStorage.enableConversationMode(false);
            // Stop all speech activities
            if (recognition) {
                recognition.abort();
                setRecognition(null);
            }
            if ('speechSynthesis' in window) {
                speechSynthesis.cancel();
            }
            setIsListening(false);
            setIsSpeaking(false);
            setHasRecognitionResult(false);
        }
    };
    // Stop all speech activities
    const stopAllSpeech = () => {
        console.log('Stopping all speech activities');
        // Stop speech recognition
        if (recognition) {
            recognition.abort(); // Use abort for immediate stop
            setRecognition(null);
        }
        // Stop speech synthesis
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
        }
        // Reset all states
        setIsListening(false);
        setIsSpeaking(false);
        setHasRecognitionResult(false);
        // If in conversation mode, end it
        if (conversationSession) {
            setConversationSession(false);
            speechChatConfigStorage.enableConversationMode(false);
        }
    };
    const handleTaskSelect = async (taskId, query) => {
        try {
            if (onTaskExecute) {
                await onTaskExecute(taskId, query);
            }
            setShowTaskSelector(false);
        }
        catch (error) {
            console.error('Error executing task:', error);
        }
    };
    const handleTaskCancel = async (executionId) => {
        try {
            // This would be handled by the character manager
            console.log('Cancelling task:', executionId);
            setShowTaskProgress(false);
        }
        catch (error) {
            console.error('Error cancelling task:', error);
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };
    const handleVoiceInput = async () => {
        try {
            if (!speechConfig.input.enabled) {
                alert('语音录入功能已禁用，请在设置中启用');
                return;
            }
            // Check if browser supports speech recognition
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition) {
                alert('您的浏览器不支持语音识别功能');
                return;
            }
            if (isListening) {
                // Stop current recognition
                if (recognition) {
                    recognition.abort(); // Use abort instead of stop for immediate termination
                }
                setIsListening(false);
                setHasRecognitionResult(false);
                return;
            }
            // Clean up any existing recognition
            if (recognition) {
                recognition.abort();
                setRecognition(null);
            }
            // Request microphone permission first
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                stream.getTracks().forEach(track => track.stop()); // Stop immediately, just checking permission
            }
            catch (error) {
                alert('需要麦克风权限才能使用语音输入');
                return;
            }
            // Create and configure speech recognition with user settings
            const newRecognition = new SpeechRecognition();
            newRecognition.continuous = speechConfig.input.continuous;
            newRecognition.interimResults = speechConfig.input.interimResults;
            newRecognition.lang = speechConfig.input.language;
            newRecognition.maxAlternatives = speechConfig.input.maxAlternatives;
            newRecognition.onstart = () => {
                setIsListening(true);
                console.log('Speech recognition started');
            };
            newRecognition.onend = () => {
                setIsListening(false);
                console.log('Speech recognition ended');
                // Only continue listening in conversation mode if we got a valid result
                // and the user hasn't manually stopped the conversation
                if (conversationSession && speechConfig.conversationMode && hasRecognitionResult) {
                    console.log('Conversation mode: scheduling next listening session');
                    setTimeout(() => {
                        // Double-check states before restarting
                        if (conversationSession && !isListening && !isLoading) {
                            console.log('Conversation mode: starting next listening session');
                            setHasRecognitionResult(false); // Reset for next round
                            handleVoiceInput();
                        }
                    }, 2000); // Wait 2 seconds before starting next listening session
                }
            };
            newRecognition.onresult = (event) => {
                try {
                    const result = event.results[event.results.length - 1];
                    const transcript = result[0].transcript;
                    const isFinal = result.isFinal;
                    if (isFinal && transcript.trim()) {
                        setInputText(transcript.trim());
                        setIsListening(false);
                        setHasRecognitionResult(true); // Mark that we got a valid result
                        // Auto-send if enabled
                        if (speechConfig.input.autoSend) {
                            setTimeout(() => {
                                handleSendMessage();
                            }, 500);
                        }
                    }
                }
                catch (error) {
                    console.error('Error processing speech result:', error);
                    setHasRecognitionResult(false); // Reset on error
                }
            };
            newRecognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
                setHasRecognitionResult(false); // Reset on error
                let errorMessage = '语音识别出错';
                let shouldShowAlert = true;
                switch (event.error) {
                    case 'no-speech':
                        errorMessage = '没有检测到语音，请重试';
                        // In conversation mode, no-speech is normal, don't show alert
                        shouldShowAlert = !conversationSession;
                        break;
                    case 'aborted':
                        errorMessage = '语音识别被中断';
                        // Aborted is usually intentional, don't show alert
                        shouldShowAlert = false;
                        break;
                    case 'audio-capture':
                        errorMessage = '无法访问麦克风，请检查权限';
                        break;
                    case 'not-allowed':
                        errorMessage = '麦克风权限被拒绝';
                        break;
                    case 'network':
                        errorMessage = '网络错误，请检查连接';
                        break;
                }
                // Only show alert for serious errors or when not in conversation mode
                if (shouldShowAlert && !conversationSession) {
                    alert(`语音识别错误: ${errorMessage}`);
                }
            };
            setRecognition(newRecognition);
            newRecognition.start();
        }
        catch (error) {
            console.error('Error with voice input:', error);
            setIsListening(false);
            alert('启动语音识别失败');
        }
    };
    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };
    const getDialogPosition = () => {
        const dialogWidth = 320;
        const dialogHeight = 400;
        const padding = 20;
        // Position dialog relative to character
        let left = characterPosition.x - dialogWidth - padding;
        let top = characterPosition.y;
        // Adjust if dialog would go off-screen
        if (left < padding) {
            left = characterPosition.x + 80; // Position to the right of character
        }
        if (top + dialogHeight > window.innerHeight - padding) {
            top = window.innerHeight - dialogHeight - padding;
        }
        if (top < padding) {
            top = padding;
        }
        return { left, top };
    };
    const isDark = config.appearance.theme === 'dark' ||
        (config.appearance.theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (!isOpen)
        return null;
    const dialogPosition = getDialogPosition();
    return (_jsxs("div", { style: {
            position: 'fixed',
            left: `${dialogPosition.left}px`,
            top: `${dialogPosition.top}px`,
            width: '320px',
            height: '400px',
            zIndex: 10001,
            backgroundColor: isDark ? '#1f2937' : '#ffffff',
            border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
        }, children: [_jsxs("div", { style: {
                    padding: '12px 16px',
                    borderBottom: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                    backgroundColor: isDark ? '#374151' : '#f9fafb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '8px' }, children: [_jsx("div", { style: {
                                    width: '8px',
                                    height: '8px',
                                    backgroundColor: '#10b981',
                                    borderRadius: '50%',
                                } }), _jsx("span", { style: {
                                    fontWeight: '600',
                                    color: isDark ? '#f9fafb' : '#111827',
                                    fontSize: '14px',
                                }, children: config.personality.name })] }), _jsx("button", { onClick: onClose, style: {
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: isDark ? '#9ca3af' : '#6b7280',
                            fontSize: '18px',
                            padding: '4px',
                            borderRadius: '4px',
                        }, onMouseEnter: e => {
                            e.currentTarget.style.backgroundColor = isDark ? '#4b5563' : '#f3f4f6';
                        }, onMouseLeave: e => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                        }, children: "\u00D7" })] }), _jsxs("div", { style: {
                    flex: 1,
                    padding: '12px',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                }, children: [messages.length === 0 ? (_jsxs("div", { style: {
                            textAlign: 'center',
                            color: isDark ? '#9ca3af' : '#6b7280',
                            fontSize: '14px',
                            marginTop: '20px',
                        }, children: ["\u5F00\u59CB\u5BF9\u8BDD\u5427\uFF01\u6211\u662F\u4F60\u7684\u5B66\u4E60\u52A9\u624B ", config.personality.name, " \uD83D\uDE0A"] })) : (messages.map(message => (_jsxs("div", { style: {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: message.sender === 'user' ? 'flex-end' : 'flex-start',
                        }, children: [_jsx("div", { style: {
                                    maxWidth: '80%',
                                    padding: '8px 12px',
                                    borderRadius: '12px',
                                    backgroundColor: message.sender === 'user' ? (isDark ? '#3b82f6' : '#3b82f6') : isDark ? '#374151' : '#f3f4f6',
                                    color: message.sender === 'user' ? '#ffffff' : isDark ? '#f9fafb' : '#111827',
                                    fontSize: '14px',
                                    lineHeight: '1.4',
                                }, children: message.content }), _jsx("div", { style: {
                                    fontSize: '11px',
                                    color: isDark ? '#6b7280' : '#9ca3af',
                                    marginTop: '2px',
                                }, children: formatTime(message.timestamp) })] }, message.id)))), isLoading && (_jsx("div", { style: {
                            display: 'flex',
                            alignItems: 'flex-start',
                        }, children: _jsxs("div", { style: {
                                padding: '8px 12px',
                                borderRadius: '12px',
                                backgroundColor: isDark ? '#374151' : '#f3f4f6',
                                color: isDark ? '#9ca3af' : '#6b7280',
                                fontSize: '14px',
                            }, children: [_jsx("span", { children: "\u6B63\u5728\u601D\u8003" }), _jsx("span", { className: "animate-pulse", children: "..." })] }) })), _jsx("div", { ref: messagesEndRef })] }), (isListening || isSpeaking || conversationSession) && (_jsxs("div", { style: {
                    padding: '8px 12px',
                    backgroundColor: isDark ? '#1f2937' : '#f0f9ff',
                    borderTop: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '12px',
                }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '8px' }, children: [isListening && (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '4px', color: '#ef4444' }, children: [_jsx("span", { children: "\uD83C\uDFA4" }), _jsx("span", { children: "\u6B63\u5728\u76D1\u542C..." })] })), isSpeaking && (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '4px', color: '#10b981' }, children: [_jsx("span", { children: "\uD83D\uDD0A" }), _jsx("span", { children: "\u6B63\u5728\u64AD\u653E..." })] })), conversationSession && (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '4px', color: '#3b82f6' }, children: [_jsx("span", { children: "\uD83D\uDCAC" }), _jsx("span", { children: "\u5BF9\u8BDD\u6A21\u5F0F" })] }))] }), _jsx("button", { onClick: stopAllSpeech, style: {
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: isDark ? '#9ca3af' : '#6b7280',
                            fontSize: '12px',
                            padding: '2px 6px',
                            borderRadius: '4px',
                        }, title: "\u505C\u6B62\u6240\u6709\u8BED\u97F3\u6D3B\u52A8", children: "\u23F9\uFE0F" })] })), _jsxs("div", { style: {
                    padding: '12px',
                    borderTop: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                    backgroundColor: isDark ? '#374151' : '#f9fafb',
                }, children: [speechConfig.input.enabled && speechConfig.output.enabled && (_jsxs("div", { style: { marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }, children: [_jsx("span", { style: { fontSize: '12px', color: isDark ? '#9ca3af' : '#6b7280' }, children: "\u8FDE\u7EED\u8BED\u97F3\u5BF9\u8BDD" }), _jsx("button", { onClick: toggleConversationMode, disabled: isLoading, style: {
                                    padding: '4px 8px',
                                    border: 'none',
                                    borderRadius: '6px',
                                    backgroundColor: conversationSession ? '#3b82f6' : isDark ? '#4b5563' : '#e5e7eb',
                                    color: conversationSession ? '#ffffff' : isDark ? '#f9fafb' : '#374151',
                                    cursor: isLoading ? 'not-allowed' : 'pointer',
                                    fontSize: '11px',
                                    fontWeight: '500',
                                }, title: conversationSession ? '结束对话模式' : '开始对话模式', children: conversationSession ? '结束对话' : '开始对话' })] })), _jsxs("div", { style: { display: 'flex', gap: '8px', alignItems: 'flex-end' }, children: [_jsx("input", { ref: inputRef, type: "text", value: inputText, onChange: e => setInputText(e.target.value), onKeyDown: handleKeyDown, placeholder: isListening ? '正在监听语音...' : '输入消息...', disabled: isLoading || isListening, style: {
                                    flex: 1,
                                    padding: '8px 12px',
                                    border: `1px solid ${isDark ? '#4b5563' : '#d1d5db'}`,
                                    borderRadius: '8px',
                                    backgroundColor: isDark ? '#1f2937' : '#ffffff',
                                    color: isDark ? '#f9fafb' : '#111827',
                                    fontSize: '14px',
                                    outline: 'none',
                                    opacity: isListening ? 0.7 : 1,
                                } }), mcpConfig.enabled && (_jsx("button", { onClick: () => setShowTaskSelector(true), disabled: isLoading || isListening, style: {
                                    padding: '8px',
                                    border: 'none',
                                    borderRadius: '8px',
                                    backgroundColor: isDark ? '#4b5563' : '#e5e7eb',
                                    color: isDark ? '#f9fafb' : '#374151',
                                    cursor: isLoading || isListening ? 'not-allowed' : 'pointer',
                                    fontSize: '14px',
                                }, title: "\u7814\u7A76\u4EFB\u52A1", children: "\uD83E\uDD16" })), speechConfig.input.enabled && (_jsxs("button", { onClick: handleVoiceInput, disabled: isLoading, style: {
                                    padding: '8px',
                                    border: 'none',
                                    borderRadius: '8px',
                                    backgroundColor: isListening ? '#ef4444' : isDark ? '#4b5563' : '#e5e7eb',
                                    color: isListening ? '#ffffff' : isDark ? '#f9fafb' : '#374151',
                                    cursor: isLoading ? 'not-allowed' : 'pointer',
                                    fontSize: '14px',
                                    position: 'relative',
                                }, title: isListening ? '停止语音输入' : '开始语音输入', children: ["\uD83C\uDFA4", isListening && (_jsx("div", { style: {
                                            position: 'absolute',
                                            top: '-2px',
                                            right: '-2px',
                                            width: '8px',
                                            height: '8px',
                                            backgroundColor: '#ef4444',
                                            borderRadius: '50%',
                                            animation: 'pulse 1s infinite',
                                        } }))] })), speechConfig.output.enabled && isSpeaking && (_jsx("button", { onClick: () => {
                                    if ('speechSynthesis' in window) {
                                        speechSynthesis.cancel();
                                    }
                                    setIsSpeaking(false);
                                }, style: {
                                    padding: '8px',
                                    border: 'none',
                                    borderRadius: '8px',
                                    backgroundColor: '#10b981',
                                    color: '#ffffff',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                }, title: "\u505C\u6B62\u64AD\u653E", children: "\uD83D\uDD0A" })), _jsx("button", { onClick: handleSendMessage, disabled: !inputText.trim() || isLoading || isListening, style: {
                                    padding: '8px 12px',
                                    border: 'none',
                                    borderRadius: '8px',
                                    backgroundColor: !inputText.trim() || isLoading || isListening ? (isDark ? '#4b5563' : '#e5e7eb') : '#3b82f6',
                                    color: !inputText.trim() || isLoading || isListening ? (isDark ? '#9ca3af' : '#9ca3af') : '#ffffff',
                                    cursor: !inputText.trim() || isLoading || isListening ? 'not-allowed' : 'pointer',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                }, children: "\u53D1\u9001" })] })] }), _jsx(TaskSelector, { isOpen: showTaskSelector, onClose: () => setShowTaskSelector(false), onTaskSelect: handleTaskSelect, suggestedTask: suggestedTask, suggestedQuery: suggestedQuery, isDark: isDark }), _jsx(TaskProgress, { isOpen: showTaskProgress, onClose: () => setShowTaskProgress(false), onCancel: handleTaskCancel, taskState: currentTaskState, isDark: isDark })] }));
};
