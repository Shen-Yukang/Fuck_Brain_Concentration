import { createStorage, StorageEnum } from '../base/index.js';
// 创建TTS配置存储
const ttsConfigBaseStorage = createStorage('tts-config-storage-key', {
    enabled: false,
    appid: '',
    token: '',
    cluster: 'volcano_tts',
    voiceType: 'zh_male_M392_conversation_wvae_bigtts',
    encoding: 'mp3',
    speedRatio: 1.0,
    uid: 'chrome_extension_user',
    defaultText: '', // 默认为空，将根据语音类型自动设置
}, {
    storageEnum: StorageEnum.Local,
    liveUpdate: true,
});
// 扩展TTS配置存储
export const ttsConfigStorage = {
    ...ttsConfigBaseStorage,
    // 更新配置
    updateConfig: async (config) => {
        await ttsConfigBaseStorage.set(current => ({
            ...current,
            ...config,
        }));
    },
    // 检查是否已配置
    isConfigured: async () => {
        const config = await ttsConfigBaseStorage.get();
        return config.enabled && config.appid.length > 0 && config.token.length > 0;
    },
};
