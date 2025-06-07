/**
 * 语音识别管理器
 * 解决语音识别状态竞争和内存泄漏问题
 */
import { VoiceError } from '../types/voiceTypes.js';
export interface RecognitionState {
    isListening: boolean;
    isConversationMode: boolean;
    hasResult: boolean;
    startTime?: number;
    sessionId?: string;
}
export interface RecognitionOptions {
    language?: string;
    continuous?: boolean;
    interimResults?: boolean;
    maxAlternatives?: number;
    timeout?: number;
}
export interface RecognitionCallbacks {
    onStart?: () => void;
    onResult?: (transcript: string, isFinal: boolean, confidence: number) => void;
    onEnd?: () => void;
    onError?: (error: VoiceError) => void;
}
export declare class VoiceRecognitionManager {
    private state;
    private recognition?;
    private callbacks;
    private timeoutHandle?;
    private conversationTimeoutHandle?;
    private cleanupTasks;
    constructor();
    getState(): RecognitionState;
    private checkBrowserSupport;
    requestPermission(): Promise<void>;
    startListening(options?: RecognitionOptions, callbacks?: RecognitionCallbacks): Promise<void>;
    stopListening(): Promise<void>;
    startConversationMode(options?: RecognitionOptions, callbacks?: RecognitionCallbacks): Promise<void>;
    stopConversationMode(): Promise<void>;
    private initializeRecognition;
    private setupRecognitionEvents;
    private setupTimeout;
    private scheduleNextListening;
    private clearTimeouts;
    private generateSessionId;
    private setupCleanupHandlers;
    private handleError;
    cleanup(): void;
}
//# sourceMappingURL=voiceRecognitionManager.d.ts.map