import { createStorage, StorageEnum } from '../base/index.js';
// Define AIProvider enum here to avoid circular dependency
export var AIProvider;
(function (AIProvider) {
    AIProvider["DEEPSEEK"] = "deepseek";
    AIProvider["OPENAI"] = "openai";
})(AIProvider || (AIProvider = {}));
// 创建AI配置存储
const aiConfigBaseStorage = createStorage('ai-config-storage-key', {
    enabled: false,
    provider: AIProvider.DEEPSEEK,
    model: 'deepseek-chat',
    apiKey: '',
    preGenerateMinutes: 5, // 默认提前5分钟生成
}, {
    storageEnum: StorageEnum.Local,
    liveUpdate: true,
});
// 扩展AI配置存储
export const aiConfigStorage = {
    ...aiConfigBaseStorage,
    // 启用/禁用AI生成
    enableAI: async (enabled) => {
        await aiConfigBaseStorage.set(current => ({
            ...current,
            enabled,
        }));
    },
    // 更新API密钥
    updateAPIKey: async (apiKey) => {
        await aiConfigBaseStorage.set(current => ({
            ...current,
            apiKey,
        }));
    },
    // 更新AI提供商
    updateProvider: async (provider, model, endpoint) => {
        await aiConfigBaseStorage.set(current => ({
            ...current,
            provider,
            ...(model ? { model } : {}),
            ...(endpoint ? { apiEndpoint: endpoint } : { apiEndpoint: undefined }),
        }));
    },
    // 更新提示词
    updatePrompts: async (systemPrompt, promptTemplate) => {
        await aiConfigBaseStorage.set(current => ({
            ...current,
            ...(systemPrompt !== undefined ? { systemPrompt } : {}),
            ...(promptTemplate !== undefined ? { promptTemplate } : {}),
        }));
    },
    // 更新预生成时间
    updatePreGenerateTime: async (minutes) => {
        await aiConfigBaseStorage.set(current => ({
            ...current,
            preGenerateMinutes: Math.max(1, Math.min(30, minutes)), // 限制在1-30分钟之间
        }));
    },
};
