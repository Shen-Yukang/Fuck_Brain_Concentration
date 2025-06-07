/**
 * TTS工具函数 - 统一的TTS相关逻辑
 */
export interface TTSConfig {
    enabled: boolean;
    appid: string;
    token: string;
    cluster: string;
    voiceType: string;
    encoding: string;
    speedRatio: number;
    uid: string;
    defaultText: string;
}
/**
 * TTS文本处理器
 * 负责处理TTS相关的文本逻辑
 */
export declare class TTSTextProcessor {
    /**
     * 获取开始语音文本
     * 优先使用用户自定义文本，否则使用语音类型的默认文本
     */
    static getStartVoiceText(ttsConfig: TTSConfig): string;
    /**
     * 检查是否为开始语音文本（可缓存的文本）
     */
    static isStartVoiceText(text: string): boolean;
    /**
     * 获取显示用的默认文本（用于UI显示）
     * 用户自定义文本 > 语音类型默认文本
     */
    static getDisplayDefaultText(ttsConfig: TTSConfig): string;
    /**
     * 验证TTS配置是否完整
     */
    static isConfigValid(ttsConfig: TTSConfig): boolean;
    /**
     * 生成测试文本
     */
    static getTestText(ttsConfig: TTSConfig): string;
}
/**
 * TTS缓存管理器
 * 负责管理TTS音频缓存逻辑
 */
export declare class TTSCacheManager {
    /**
     * 生成缓存键
     */
    static generateCacheKey(voiceType: string, text: string): string;
    /**
     * 简单的文本哈希函数
     */
    private static hashText;
    /**
     * 检查是否应该缓存该文本
     */
    static shouldCache(text: string): boolean;
}
/**
 * TTS错误处理器
 * 统一的TTS错误处理逻辑
 */
export declare class TTSErrorHandler {
    /**
     * 处理TTS生成错误
     */
    static handleGenerationError(error: any): string;
    /**
     * 处理TTS播放错误
     */
    static handlePlaybackError(error: any): string;
}
/**
 * TTS配置验证器
 * 验证TTS配置的有效性
 */
export declare class TTSConfigValidator {
    /**
     * 验证AppID格式
     */
    static validateAppId(appId: string): {
        valid: boolean;
        message?: string;
    };
    /**
     * 验证Token格式
     */
    static validateToken(token: string): {
        valid: boolean;
        message?: string;
    };
    /**
     * 验证语速比例
     */
    static validateSpeedRatio(speedRatio: number): {
        valid: boolean;
        message?: string;
    };
    /**
     * 验证完整配置
     */
    static validateConfig(config: TTSConfig): {
        valid: boolean;
        errors: string[];
    };
}
//# sourceMappingURL=ttsUtils.d.ts.map