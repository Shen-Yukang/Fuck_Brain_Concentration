/**
 * 语音播放管理器
 * 解决TTS播放状态管理问题，提供准确的播放状态跟踪
 */
import { VoiceError } from '../types/voiceTypes.js';
export interface PlaybackState {
    isPlaying: boolean;
    startTime?: number;
    estimatedEndTime?: number;
    actualDuration?: number;
    text?: string;
    method: 'tts' | 'web-speech';
}
export interface PlaybackCallbacks {
    onStart?: () => void;
    onEnd?: (duration: number) => void;
    onError?: (error: VoiceError) => void;
    onProgress?: (progress: number) => void;
}
export declare class VoicePlaybackManager {
    private state;
    private callbacks;
    private progressInterval?;
    private endTimeout?;
    private currentUtterance?;
    constructor();
    getState(): PlaybackState;
    startTTSPlayback(text: string, callbacks?: PlaybackCallbacks): Promise<void>;
    startWebSpeechPlayback(text: string, options?: any, callbacks?: PlaybackCallbacks): Promise<void>;
    stop(): Promise<void>;
    private calculateEstimatedDuration;
    private sendTTSRequest;
    private startProgressTracking;
    private stopProgressTracking;
    private schedulePlaybackEnd;
    private setupWebSpeechMonitoring;
    private handleError;
    cleanup(): void;
}
//# sourceMappingURL=voicePlaybackManager.d.ts.map