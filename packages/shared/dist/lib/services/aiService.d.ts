import { AIProvider } from '@extension/storage';
/**
 * AI Service - 提供与AI模型交互的通用接口
 *
 * 这个模块设计为可扩展的，支持多种AI提供商和多种交互类型
 */
export interface AIModelConfig {
    provider: AIProvider;
    model: string;
    apiKey?: string;
    apiEndpoint?: string;
    temperature?: number;
    maxTokens?: number;
}
export interface AIRequestOptions {
    prompt: string;
    systemPrompt?: string;
    temperature?: number;
    maxTokens?: number;
    timeout?: number;
}
export interface AIResponse {
    text: string;
    usage?: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
    };
    model?: string;
    provider?: AIProvider;
}
/**
 * AI服务类 - 处理与AI模型的交互
 */
export declare class AIService {
    private config;
    constructor(config?: Partial<AIModelConfig>);
    /**
     * 生成文本
     * @param options 请求选项
     * @returns AI响应
     */
    generateText(options: AIRequestOptions): Promise<AIResponse>;
    /**
     * 准备请求体
     * @param options 请求选项
     * @returns 请求体对象
     */
    private prepareRequestBody;
    /**
     * 解析响应
     * @param data 响应数据
     * @returns 格式化的AI响应
     */
    private parseResponse;
    /**
     * 更新配置
     * @param config 新配置
     */
    updateConfig(config: Partial<AIModelConfig>): void;
}
/**
 * 创建AI服务实例
 * @param config 配置
 * @returns AI服务实例
 */
export declare function createAIService(config?: Partial<AIModelConfig>): AIService;
//# sourceMappingURL=aiService.d.ts.map