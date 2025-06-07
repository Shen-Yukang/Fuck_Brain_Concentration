/**
 * 语音服务 - 处理语音输入和输出
 * 集成Web Speech API和现有的TTS系统
 */
export interface SpeechRecognitionResult {
    text: string;
    confidence: number;
    isFinal: boolean;
}
export interface SpeechRecognitionOptions {
    language?: string;
    continuous?: boolean;
    interimResults?: boolean;
    maxAlternatives?: number;
}
export interface SpeechRecognitionCallbacks {
    onResult?: (result: SpeechRecognitionResult) => void;
    onError?: (error: string) => void;
    onStart?: () => void;
    onEnd?: () => void;
}
/**
 * 语音服务类
 */
export declare class SpeechService {
    private static instance;
    private recognition;
    private isListening;
    private callbacks;
    private constructor();
    static getInstance(): SpeechService;
    /**
     * 初始化语音识别
     */
    private initializeSpeechRecognition;
    /**
     * 设置事件监听器
     */
    private setupEventListeners;
    /**
     * 开始语音识别
     */
    startListening(options?: SpeechRecognitionOptions, callbacks?: SpeechRecognitionCallbacks): Promise<boolean>;
    /**
     * 停止语音识别
     */
    stopListening(): void;
    /**
     * 检查是否正在监听
     */
    isCurrentlyListening(): boolean;
    /**
     * 检查浏览器是否支持语音识别
     */
    isSupported(): boolean;
    /**
     * 语音合成 - 让角色说话
     * 集成现有的TTS系统
     */
    speak(text: string): Promise<boolean>;
    /**
     * 回退语音合成（使用Web Speech API）
     */
    private fallbackSpeak;
    /**
     * 获取可用的语音
     */
    getAvailableVoices(): SpeechSynthesisVoice[];
    /**
     * 请求麦克风权限
     */
    requestMicrophonePermission(): Promise<boolean>;
}
//# sourceMappingURL=speechService.d.ts.map