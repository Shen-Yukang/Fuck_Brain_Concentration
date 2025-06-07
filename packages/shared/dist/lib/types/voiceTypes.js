/**
 * 语音交互相关类型定义
 */
// 语音错误类型枚举
export var VoiceErrorType;
(function (VoiceErrorType) {
    // 权限相关错误
    VoiceErrorType["PERMISSION_DENIED"] = "PERMISSION_DENIED";
    VoiceErrorType["MICROPHONE_ACCESS_DENIED"] = "MICROPHONE_ACCESS_DENIED";
    // 网络相关错误
    VoiceErrorType["NETWORK_ERROR"] = "NETWORK_ERROR";
    VoiceErrorType["API_TIMEOUT"] = "API_TIMEOUT";
    // TTS相关错误
    VoiceErrorType["TTS_GENERATION_FAILED"] = "TTS_GENERATION_FAILED";
    VoiceErrorType["TTS_PLAYBACK_FAILED"] = "TTS_PLAYBACK_FAILED";
    VoiceErrorType["TTS_CONFIG_INVALID"] = "TTS_CONFIG_INVALID";
    // 语音识别相关错误
    VoiceErrorType["SPEECH_RECOGNITION_FAILED"] = "SPEECH_RECOGNITION_FAILED";
    VoiceErrorType["SPEECH_RECOGNITION_NOT_SUPPORTED"] = "SPEECH_RECOGNITION_NOT_SUPPORTED";
    VoiceErrorType["NO_SPEECH_DETECTED"] = "NO_SPEECH_DETECTED";
    // 状态管理错误
    VoiceErrorType["INVALID_STATE_TRANSITION"] = "INVALID_STATE_TRANSITION";
    VoiceErrorType["CONCURRENT_OPERATION"] = "CONCURRENT_OPERATION";
    // 配置错误
    VoiceErrorType["INVALID_CONFIGURATION"] = "INVALID_CONFIGURATION";
    VoiceErrorType["MISSING_CONFIGURATION"] = "MISSING_CONFIGURATION";
    // 通用错误
    VoiceErrorType["UNKNOWN_ERROR"] = "UNKNOWN_ERROR";
    VoiceErrorType["OPERATION_CANCELLED"] = "OPERATION_CANCELLED";
})(VoiceErrorType || (VoiceErrorType = {}));
// 语音状态枚举
export var VoiceState;
(function (VoiceState) {
    VoiceState["IDLE"] = "IDLE";
    VoiceState["LISTENING"] = "LISTENING";
    VoiceState["PROCESSING"] = "PROCESSING";
    VoiceState["SPEAKING"] = "SPEAKING";
    VoiceState["ERROR"] = "ERROR";
})(VoiceState || (VoiceState = {}));
// 语音错误类
export class VoiceError extends Error {
    type;
    originalError;
    context;
    constructor(type, message, originalError, context) {
        super(message);
        this.type = type;
        this.originalError = originalError;
        this.context = context;
        this.name = 'VoiceError';
    }
    // 创建用户友好的错误消息
    getUserFriendlyMessage() {
        switch (this.type) {
            case VoiceErrorType.PERMISSION_DENIED:
            case VoiceErrorType.MICROPHONE_ACCESS_DENIED:
                return '需要麦克风权限才能使用语音功能，请在浏览器设置中允许访问麦克风';
            case VoiceErrorType.NETWORK_ERROR:
                return '网络连接失败，请检查网络连接后重试';
            case VoiceErrorType.TTS_GENERATION_FAILED:
                return '语音合成失败，请检查TTS配置或稍后重试';
            case VoiceErrorType.TTS_CONFIG_INVALID:
                return 'TTS配置无效，请检查AppID和Token设置';
            case VoiceErrorType.SPEECH_RECOGNITION_NOT_SUPPORTED:
                return '您的浏览器不支持语音识别功能';
            case VoiceErrorType.NO_SPEECH_DETECTED:
                return '没有检测到语音，请重试';
            default:
                return this.message || '语音功能出现未知错误';
        }
    }
    // 判断是否为可重试的错误
    isRetryable() {
        const retryableTypes = [
            VoiceErrorType.NETWORK_ERROR,
            VoiceErrorType.API_TIMEOUT,
            VoiceErrorType.TTS_GENERATION_FAILED,
            VoiceErrorType.NO_SPEECH_DETECTED,
        ];
        return retryableTypes.includes(this.type);
    }
}
// 状态转换规则
export const STATE_TRANSITIONS = {
    [VoiceState.IDLE]: [VoiceState.LISTENING, VoiceState.SPEAKING],
    [VoiceState.LISTENING]: [VoiceState.PROCESSING, VoiceState.ERROR, VoiceState.IDLE],
    [VoiceState.PROCESSING]: [VoiceState.SPEAKING, VoiceState.ERROR, VoiceState.IDLE],
    [VoiceState.SPEAKING]: [VoiceState.LISTENING, VoiceState.ERROR, VoiceState.IDLE],
    [VoiceState.ERROR]: [VoiceState.IDLE],
};
