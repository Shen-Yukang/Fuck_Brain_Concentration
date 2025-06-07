/**
 * 语音交互相关类型定义
 */
export declare enum VoiceErrorType {
    PERMISSION_DENIED = "PERMISSION_DENIED",
    MICROPHONE_ACCESS_DENIED = "MICROPHONE_ACCESS_DENIED",
    NETWORK_ERROR = "NETWORK_ERROR",
    API_TIMEOUT = "API_TIMEOUT",
    TTS_GENERATION_FAILED = "TTS_GENERATION_FAILED",
    TTS_PLAYBACK_FAILED = "TTS_PLAYBACK_FAILED",
    TTS_CONFIG_INVALID = "TTS_CONFIG_INVALID",
    SPEECH_RECOGNITION_FAILED = "SPEECH_RECOGNITION_FAILED",
    SPEECH_RECOGNITION_NOT_SUPPORTED = "SPEECH_RECOGNITION_NOT_SUPPORTED",
    NO_SPEECH_DETECTED = "NO_SPEECH_DETECTED",
    INVALID_STATE_TRANSITION = "INVALID_STATE_TRANSITION",
    CONCURRENT_OPERATION = "CONCURRENT_OPERATION",
    INVALID_CONFIGURATION = "INVALID_CONFIGURATION",
    MISSING_CONFIGURATION = "MISSING_CONFIGURATION",
    UNKNOWN_ERROR = "UNKNOWN_ERROR",
    OPERATION_CANCELLED = "OPERATION_CANCELLED"
}
export declare enum VoiceState {
    IDLE = "IDLE",
    LISTENING = "LISTENING",
    PROCESSING = "PROCESSING",
    SPEAKING = "SPEAKING",
    ERROR = "ERROR"
}
export declare class VoiceError extends Error {
    readonly type: VoiceErrorType;
    readonly originalError?: Error | undefined;
    readonly context?: Record<string, any> | undefined;
    constructor(type: VoiceErrorType, message: string, originalError?: Error | undefined, context?: Record<string, any> | undefined);
    getUserFriendlyMessage(): string;
    isRetryable(): boolean;
}
export interface VoiceResult<T = any> {
    success: boolean;
    data?: T;
    error?: VoiceError;
}
export interface SpeechOptions {
    voiceType?: string;
    speed?: number;
    volume?: number;
    interruptCurrent?: boolean;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (error: VoiceError) => void;
}
export interface SpeechResult {
    duration: number;
    interrupted: boolean;
}
export interface ListenOptions {
    language?: string;
    continuous?: boolean;
    interimResults?: boolean;
    maxAlternatives?: number;
    timeout?: number;
    onStart?: () => void;
    onResult?: (transcript: string, isFinal: boolean) => void;
    onEnd?: () => void;
    onError?: (error: VoiceError) => void;
}
export interface ListenResult {
    transcript: string;
    confidence: number;
    isFinal: boolean;
}
export interface VoiceStateInfo {
    state: VoiceState;
    isListening: boolean;
    isSpeaking: boolean;
    conversationMode: boolean;
    currentOperation?: string;
    error?: VoiceError;
}
export declare const STATE_TRANSITIONS: Record<VoiceState, VoiceState[]>;
export interface IVoiceService {
    getState(): VoiceStateInfo;
    speak(text: string, options?: SpeechOptions): Promise<VoiceResult<SpeechResult>>;
    stopSpeaking(): Promise<VoiceResult<void>>;
    listen(options?: ListenOptions): Promise<VoiceResult<ListenResult>>;
    stopListening(): Promise<VoiceResult<void>>;
    requestPermissions(): Promise<VoiceResult<boolean>>;
    checkPermissions(): Promise<VoiceResult<boolean>>;
    startConversation(): Promise<VoiceResult<void>>;
    stopConversation(): Promise<VoiceResult<void>>;
    cleanup(): Promise<void>;
}
//# sourceMappingURL=voiceTypes.d.ts.map