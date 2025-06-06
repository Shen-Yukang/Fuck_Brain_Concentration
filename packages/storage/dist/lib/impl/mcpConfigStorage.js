import { createStorage, StorageEnum } from '../base/index.js';
// MCP Task Types
export var MCPTaskType;
(function (MCPTaskType) {
    MCPTaskType["RESEARCH"] = "research";
    MCPTaskType["WEB_SEARCH"] = "web_search";
    MCPTaskType["DATA_COLLECTION"] = "data_collection";
    MCPTaskType["CONTENT_ANALYSIS"] = "content_analysis";
})(MCPTaskType || (MCPTaskType = {}));
// Research Strategy Types
export var ResearchStrategy;
(function (ResearchStrategy) {
    ResearchStrategy["ACADEMIC"] = "academic";
    ResearchStrategy["GENERAL"] = "general";
    ResearchStrategy["TECHNICAL"] = "technical";
    ResearchStrategy["NEWS"] = "news";
})(ResearchStrategy || (ResearchStrategy = {}));
// Default search sites configuration
const defaultSearchSites = [
    {
        name: 'ArXiv',
        url: 'https://arxiv.org/search/',
        enabled: true,
        selectors: {
            searchInput: 'input[name="query"]',
            searchButton: 'button[type="submit"]',
            resultItems: '.arxiv-result',
            resultTitle: '.list-title a',
            resultLink: '.list-title a',
            resultDescription: '.list-summary',
        },
        searchParams: {
            searchtype: 'all',
            order: '-announced_date_first',
        },
    },
    {
        name: 'GitHub',
        url: 'https://github.com/search',
        enabled: true,
        selectors: {
            searchInput: 'input[name="q"]',
            searchButton: 'button[type="submit"]',
            resultItems: '.search-result-item',
            resultTitle: '.search-result-item h3 a',
            resultLink: '.search-result-item h3 a',
            resultDescription: '.search-result-item p',
        },
        searchParams: {
            type: 'repositories',
            sort: 'stars',
            order: 'desc',
        },
    },
    {
        name: 'Google Scholar',
        url: 'https://scholar.google.com/scholar',
        enabled: false, // Disabled by default due to potential blocking
        selectors: {
            searchInput: 'input[name="q"]',
            searchButton: 'button[type="submit"]',
            resultItems: '.gs_r',
            resultTitle: '.gs_rt a',
            resultLink: '.gs_rt a',
            resultDescription: '.gs_rs',
        },
    },
];
// Default task configurations
const defaultTasks = [
    {
        id: 'research_papers',
        type: MCPTaskType.RESEARCH,
        name: '学术论文研究',
        description: '搜索相关学术论文和研究资料',
        enabled: true,
        maxResults: 20,
        timeout: 30,
        retryAttempts: 2,
        sites: defaultSearchSites.filter(site => ['ArXiv', 'Google Scholar'].includes(site.name)),
    },
    {
        id: 'code_search',
        type: MCPTaskType.WEB_SEARCH,
        name: '代码搜索',
        description: '搜索相关代码库和技术资源',
        enabled: true,
        maxResults: 15,
        timeout: 25,
        retryAttempts: 2,
        sites: defaultSearchSites.filter(site => site.name === 'GitHub'),
    },
    {
        id: 'general_research',
        type: MCPTaskType.RESEARCH,
        name: '综合研究',
        description: '综合搜索多个来源的信息',
        enabled: true,
        maxResults: 30,
        timeout: 45,
        retryAttempts: 3,
        sites: defaultSearchSites,
    },
];
// Default MCP configuration
const defaultMCPConfig = {
    enabled: false,
    defaultStrategy: ResearchStrategy.GENERAL,
    maxConcurrentTasks: 2,
    taskTimeout: 60,
    autoExecute: false,
    saveResults: true,
    tasks: defaultTasks,
    customSites: [],
};
// Default task history
const defaultTaskHistory = {
    executions: [],
    maxExecutions: 100,
    totalExecutions: 0,
};
// Create MCP configuration storage
const mcpConfigBaseStorage = createStorage('mcp-config-storage-key', defaultMCPConfig, {
    storageEnum: StorageEnum.Local,
    liveUpdate: true,
});
// Create task history storage
const mcpTaskHistoryBaseStorage = createStorage('mcp-task-history-storage-key', defaultTaskHistory, {
    storageEnum: StorageEnum.Local,
    liveUpdate: false,
});
// Export MCP configuration storage
export const mcpConfigStorage = {
    ...mcpConfigBaseStorage,
    enableMCP: async (enabled) => {
        await mcpConfigBaseStorage.set(current => ({
            ...current,
            enabled,
        }));
    },
    updateStrategy: async (strategy) => {
        await mcpConfigBaseStorage.set(current => ({
            ...current,
            defaultStrategy: strategy,
        }));
    },
    updateTask: async (taskId, updates) => {
        await mcpConfigBaseStorage.set(current => ({
            ...current,
            tasks: current.tasks.map(task => task.id === taskId ? { ...task, ...updates } : task),
        }));
    },
    addCustomSite: async (site) => {
        await mcpConfigBaseStorage.set(current => ({
            ...current,
            customSites: [...current.customSites, site],
        }));
    },
    removeCustomSite: async (siteName) => {
        await mcpConfigBaseStorage.set(current => ({
            ...current,
            customSites: current.customSites.filter(site => site.name !== siteName),
        }));
    },
    resetToDefaults: async () => {
        await mcpConfigBaseStorage.set(defaultMCPConfig);
    },
};
// Export task history storage
export const mcpTaskHistoryStorage = {
    ...mcpTaskHistoryBaseStorage,
    addExecution: async (result) => {
        await mcpTaskHistoryBaseStorage.set(current => {
            const updatedExecutions = [result, ...current.executions];
            // Keep only the most recent executions
            if (updatedExecutions.length > current.maxExecutions) {
                updatedExecutions.splice(current.maxExecutions);
            }
            return {
                ...current,
                executions: updatedExecutions,
                totalExecutions: current.totalExecutions + 1,
            };
        });
    },
    getRecentExecutions: async (limit = 10) => {
        const history = await mcpTaskHistoryBaseStorage.get();
        return history.executions.slice(0, limit);
    },
    clearHistory: async () => {
        await mcpTaskHistoryBaseStorage.set(current => ({
            ...current,
            executions: [],
        }));
    },
    getExecutionsByTask: async (taskId, limit = 10) => {
        const history = await mcpTaskHistoryBaseStorage.get();
        return history.executions
            .filter(execution => execution.taskId === taskId)
            .slice(0, limit);
    },
};
