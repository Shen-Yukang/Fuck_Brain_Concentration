/**
 * 语音交互相关常量定义
 * 消除魔法数字和硬编码值
 */
export declare const VOICE_CONSTANTS: {
    readonly ESTIMATED_DURATION_PER_CHAR: 150;
    readonly MIN_PLAY_DURATION: 1000;
    readonly MAX_PLAY_DURATION: 30000;
    readonly PLAY_STATUS_CHECK_INTERVAL: 500;
};
export declare const RECOGNITION_CONSTANTS: {
    readonly CONVERSATION_RESTART_DELAY: 2000;
    readonly AUTO_SEND_DELAY: 500;
    readonly PERMISSION_CHECK_TIMEOUT: 5000;
    readonly RECOGNITION_TIMEOUT: 10000;
};
export declare const CACHE_CONSTANTS: {
    readonly CACHE_EXPIRY_TIME: number;
    readonly MAX_CACHE_SIZE: number;
    readonly CACHE_CLEANUP_INTERVAL: number;
};
export declare const RETRY_CONSTANTS: {
    readonly MAX_RETRY_COUNT: 3;
    readonly RETRY_DELAY: 1000;
    readonly RETRY_BACKOFF_MULTIPLIER: 2;
};
//# sourceMappingURL=voiceConstants.d.ts.map