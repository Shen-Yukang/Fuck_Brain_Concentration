import { createStorage, StorageEnum } from '../base/index.js';
// 创建专注时间基础存储
const focusTimeBaseStorage = createStorage('focus-time-storage-key', {
    duration: 25, // 默认25分钟
    isActive: false,
}, {
    storageEnum: StorageEnum.Local,
    liveUpdate: true,
});
// 扩展专注时间存储
export const focusStorage = {
    ...focusTimeBaseStorage,
    startFocus: async (duration) => {
        const now = Date.now();
        await focusTimeBaseStorage.set({
            duration,
            isActive: true,
            startTime: now,
            endTime: now + duration * 60 * 1000,
        });
    },
    stopFocus: async () => {
        await focusTimeBaseStorage.set(current => ({
            ...current,
            isActive: false,
            startTime: undefined,
            endTime: undefined,
        }));
    },
    getRemainingTime: async () => {
        const config = await focusTimeBaseStorage.get();
        if (!config.isActive || !config.endTime) {
            return 0;
        }
        const remaining = Math.max(0, config.endTime - Date.now());
        return Math.floor(remaining / 1000); // 转换为秒
    },
};
