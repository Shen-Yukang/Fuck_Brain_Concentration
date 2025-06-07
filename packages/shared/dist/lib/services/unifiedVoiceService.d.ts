/**
 * 统一的语音服务实现
 * 解决代码重复和状态管理问题
 */
import type { IVoiceService, VoiceStateInfo, VoiceResult, SpeechOptions, SpeechResult, ListenOptions, ListenResult } from '../types/voiceTypes.js';
export declare class UnifiedVoiceService implements IVoiceService {
    private state;
    private isListening;
    private isSpeaking;
    private conversationMode;
    private currentError?;
    private playbackManager;
    private recognitionManager;
    private cleanupTasks;
    constructor();
    private initializeService;
    getState(): VoiceStateInfo;
    private setState;
    private setErrorState;
    requestPermissions(): Promise<VoiceResult<boolean>>;
    checkPermissions(): Promise<VoiceResult<boolean>>;
    speak(text: string, options?: SpeechOptions): Promise<VoiceResult<SpeechResult>>;
    stopSpeaking(): Promise<VoiceResult<void>>;
    stopListening(): Promise<VoiceResult<void>>;
    listen(options?: ListenOptions): Promise<VoiceResult<ListenResult>>;
    startConversation(): Promise<VoiceResult<void>>;
    stopConversation(): Promise<VoiceResult<void>>;
    cleanup(): Promise<void>;
}
export declare function createVoiceService(): UnifiedVoiceService;
export declare function getVoiceService(): UnifiedVoiceService | null;
export declare function destroyVoiceService(): void;
//# sourceMappingURL=unifiedVoiceService.d.ts.map