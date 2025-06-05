import { createStorage, StorageEnum } from '../base/index.js';
// 创建语音缓存存储
const voiceCacheBaseStorage = createStorage('voice-cache-storage-key', {}, {
    storageEnum: StorageEnum.Local,
    liveUpdate: true,
});
// 扩展语音缓存存储
export const voiceCacheStorage = {
    ...voiceCacheBaseStorage,
    // 缓存开始语音
    cacheStartVoice: async (voiceType, audioData) => {
        await voiceCacheBaseStorage.set(current => ({
            ...current,
            startVoiceCache: {
                voiceType,
                audioData,
                cachedAt: Date.now(),
            },
        }));
        console.log('Start voice cached for voiceType:', voiceType);
    },
    // 获取开始语音缓存
    getStartVoice: async (voiceType) => {
        const cache = await voiceCacheBaseStorage.get();
        if (!cache.startVoiceCache) {
            return null;
        }
        // 检查voiceType是否匹配
        if (cache.startVoiceCache.voiceType !== voiceType) {
            console.log('Start voice cache voiceType mismatch, clearing cache');
            await voiceCacheStorage.clearStartVoice();
            return null;
        }
        // 检查缓存是否过期（7天）
        const cacheAge = Date.now() - cache.startVoiceCache.cachedAt;
        const sevenDays = 7 * 24 * 60 * 60 * 1000;
        if (cacheAge > sevenDays) {
            console.log('Start voice cache expired, clearing cache');
            await voiceCacheStorage.clearStartVoice();
            return null;
        }
        console.log('Using cached start voice for voiceType:', voiceType);
        return cache.startVoiceCache.audioData;
    },
    // 清除开始语音缓存
    clearStartVoice: async () => {
        await voiceCacheBaseStorage.set(current => ({
            ...current,
            startVoiceCache: undefined,
        }));
        console.log('Start voice cache cleared');
    },
    // 缓存结束语音
    cacheEndVoice: async (voiceType, audioData) => {
        await voiceCacheBaseStorage.set(current => ({
            ...current,
            endVoiceCache: {
                voiceType,
                audioData,
                cachedAt: Date.now(),
            },
        }));
        console.log('End voice cached for voiceType:', voiceType);
    },
    // 获取结束语音缓存
    getEndVoice: async (voiceType) => {
        const cache = await voiceCacheBaseStorage.get();
        if (!cache.endVoiceCache) {
            return null;
        }
        // 检查voiceType是否匹配
        if (cache.endVoiceCache.voiceType !== voiceType) {
            console.log('End voice cache voiceType mismatch, clearing cache');
            await voiceCacheStorage.clearEndVoice();
            return null;
        }
        // 检查缓存是否过期（7天）
        const cacheAge = Date.now() - cache.endVoiceCache.cachedAt;
        const sevenDays = 7 * 24 * 60 * 60 * 1000;
        if (cacheAge > sevenDays) {
            console.log('End voice cache expired, clearing cache');
            await voiceCacheStorage.clearEndVoice();
            return null;
        }
        console.log('Using cached end voice for voiceType:', voiceType);
        return cache.endVoiceCache.audioData;
    },
    // 清除结束语音缓存
    clearEndVoice: async () => {
        await voiceCacheBaseStorage.set(current => ({
            ...current,
            endVoiceCache: undefined,
        }));
        console.log('End voice cache cleared');
    },
    // 清除所有语音缓存
    clearAllVoiceCache: async () => {
        await voiceCacheBaseStorage.set({});
        console.log('All voice cache cleared');
    },
    // 检查开始语音缓存是否有效
    isStartVoiceCacheValid: async (voiceType) => {
        const audioData = await voiceCacheStorage.getStartVoice(voiceType);
        return audioData !== null;
    },
    // 检查结束语音缓存是否有效
    isEndVoiceCacheValid: async (voiceType) => {
        const audioData = await voiceCacheStorage.getEndVoice(voiceType);
        return audioData !== null;
    },
};
