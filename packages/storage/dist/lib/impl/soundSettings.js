import { createStorage, StorageEnum } from '../base/index.js';
// 创建声音设置存储
const soundSettingsBaseStorage = createStorage('sound-settings-storage-key', {
    enabled: true, // 默认启用声音
    volume: 0.5, // 默认音量50%
}, {
    storageEnum: StorageEnum.Local,
    liveUpdate: true,
});
// 扩展声音设置存储
export const soundSettingsStorage = {
    ...soundSettingsBaseStorage,
    // 启用/禁用声音
    enableSound: async (enabled) => {
        await soundSettingsBaseStorage.set(current => ({
            ...current,
            enabled,
        }));
    },
    // 设置音量
    setVolume: async (volume) => {
        // 确保音量在0-1之间
        const clampedVolume = Math.max(0, Math.min(1, volume));
        await soundSettingsBaseStorage.set(current => ({
            ...current,
            volume: clampedVolume,
        }));
    },
};
