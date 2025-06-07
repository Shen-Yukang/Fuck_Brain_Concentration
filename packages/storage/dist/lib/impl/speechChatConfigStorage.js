import { createStorage, StorageEnum } from '../base/index.js';
// 默认配置
const defaultSpeechChatConfig = {
    input: {
        enabled: true,
        language: 'zh-CN',
        continuous: false,
        interimResults: true,
        maxAlternatives: 1,
        autoSend: false,
        noiseReduction: true,
        sensitivity: 0.7,
    },
    output: {
        enabled: true,
        autoPlay: false,
        playSpeed: 1.0,
        volume: 0.8,
        useTTS: true,
        interruptOnNewInput: true,
        playNotificationSound: true,
    },
    conversationMode: false,
    pushToTalk: false,
    voiceActivation: false,
    activationKeyword: '小助手',
    sessionTimeout: 30,
};
// 创建语音对话配置存储
const speechChatConfigBaseStorage = createStorage('speech-chat-config-storage-key', defaultSpeechChatConfig, {
    storageEnum: StorageEnum.Local,
    liveUpdate: true,
});
// 扩展语音对话配置存储
export const speechChatConfigStorage = {
    ...speechChatConfigBaseStorage,
    // 更新语音录入配置
    updateInputConfig: async (config) => {
        await speechChatConfigBaseStorage.set(current => ({
            ...current,
            input: { ...current.input, ...config },
        }));
    },
    // 更新语音播放配置
    updateOutputConfig: async (config) => {
        await speechChatConfigBaseStorage.set(current => ({
            ...current,
            output: { ...current.output, ...config },
        }));
    },
    // 启用/禁用语音录入
    enableSpeechInput: async (enabled) => {
        await speechChatConfigBaseStorage.set(current => ({
            ...current,
            input: { ...current.input, enabled },
        }));
    },
    // 启用/禁用语音播放
    enableSpeechOutput: async (enabled) => {
        await speechChatConfigBaseStorage.set(current => ({
            ...current,
            output: { ...current.output, enabled },
        }));
    },
    // 启用/禁用对话模式
    enableConversationMode: async (enabled) => {
        await speechChatConfigBaseStorage.set(current => ({
            ...current,
            conversationMode: enabled,
        }));
    },
    // 设置识别语言
    setLanguage: async (language) => {
        await speechChatConfigBaseStorage.set(current => ({
            ...current,
            input: { ...current.input, language },
        }));
    },
    // 设置播放速度
    setPlaySpeed: async (speed) => {
        const clampedSpeed = Math.max(0.5, Math.min(2.0, speed));
        await speechChatConfigBaseStorage.set(current => ({
            ...current,
            output: { ...current.output, playSpeed: clampedSpeed },
        }));
    },
    // 设置音量
    setVolume: async (volume) => {
        const clampedVolume = Math.max(0, Math.min(1, volume));
        await speechChatConfigBaseStorage.set(current => ({
            ...current,
            output: { ...current.output, volume: clampedVolume },
        }));
    },
    // 设置灵敏度
    setSensitivity: async (sensitivity) => {
        const clampedSensitivity = Math.max(0, Math.min(1, sensitivity));
        await speechChatConfigBaseStorage.set(current => ({
            ...current,
            input: { ...current.input, sensitivity: clampedSensitivity },
        }));
    },
};
