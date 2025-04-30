import { AIService, AIRequestOptions } from './aiService.js';
import { AIProvider } from '@extension/storage';
import { notificationCacheStorage } from '@extension/storage';

// 默认的系统提示词
const DEFAULT_SYSTEM_PROMPT = `你是一个友好、积极的助手，负责在用户专注工作一段时间后提醒他们休息。
你的消息应该：
1. 简短（不超过50个字）
2. 友好且鼓励性的
3. 有时可以幽默或有趣
4. 提醒用户休息的重要性
5. 偶尔可以建议简单的伸展运动或放松技巧
6. 语气自然，像朋友一样交流
7. 不要重复相同的内容
8. 不要使用过于正式或机械的语言`;

// 默认的用户提示词模板
const DEFAULT_PROMPT_TEMPLATE = `生成一条简短的休息提醒消息。用户已经专注工作了{duration}分钟，现在是休息的时候了。`;

// 备用消息，当AI生成失败时使用
const FALLBACK_MESSAGES = [
  '休息一下吧！你已经专注工作了一段时间。',
  '该活动一下了！站起来伸展一下身体吧。',
  '休息是为了更好的工作，现在是放松的时候了。',
  '你的大脑需要休息，去喝杯水吧！',
  '专注时间结束，给自己一个小奖励吧！',
  '太棒了！你完成了一个专注周期，现在享受一下休息时光。',
  '记得休息是工作的一部分，现在放松一下吧。',
  '眨眨眼睛，活动一下，让身体放松一下吧！',
  '专注时间已结束，深呼吸，放松一下。',
  '恭喜完成专注时间！现在是休息和恢复的时候了。',
];

/**
 * 通知生成器类 - 负责生成和管理通知消息
 */
export class NotificationGenerator {
  private aiService: AIService;
  private systemPrompt: string;
  private promptTemplate: string;

  /**
   * 构造函数
   * @param aiService AI服务实例
   * @param systemPrompt 系统提示词
   * @param promptTemplate 用户提示词模板
   */
  constructor(
    aiService: AIService,
    systemPrompt: string = DEFAULT_SYSTEM_PROMPT,
    promptTemplate: string = DEFAULT_PROMPT_TEMPLATE,
  ) {
    this.aiService = aiService;
    this.systemPrompt = systemPrompt;
    this.promptTemplate = promptTemplate;
  }

  /**
   * 生成通知消息
   * @param duration 专注时长（分钟）
   * @returns 生成的通知消息
   */
  async generateNotification(duration: number): Promise<string> {
    try {
      // 检查是否已经在生成中
      const isGenerating = await notificationCacheStorage.isGenerating();
      if (isGenerating) {
        console.log('Already generating a notification, skipping');
        return this.getRandomFallbackMessage();
      }

      // 设置生成状态
      await notificationCacheStorage.setGenerating(true);

      // 准备提示词
      const prompt = this.promptTemplate.replace('{duration}', duration.toString());

      // 准备请求选项
      const options: AIRequestOptions = {
        prompt,
        systemPrompt: this.systemPrompt,
        temperature: 0.8, // 增加一些随机性
        maxTokens: 100,
        timeout: 5000, // 5秒超时
      };

      // 调用AI服务生成文本
      const response = await this.aiService.generateText(options);

      // 清理和格式化响应文本
      const notification = this.formatNotification(response.text);

      // 重置生成状态
      await notificationCacheStorage.setGenerating(false);

      return notification;
    } catch (error) {
      console.error('Error generating notification:', error);

      // 重置生成状态
      await notificationCacheStorage.setGenerating(false);

      // 返回备用消息
      return this.getRandomFallbackMessage();
    }
  }

  /**
   * 格式化通知消息
   * @param text 原始文本
   * @returns 格式化后的文本
   */
  private formatNotification(text: string): string {
    // 移除多余的引号、空格和换行符
    let formatted = text
      .trim()
      .replace(/^["']|["']$/g, '')
      .replace(/\n+/g, ' ')
      .trim();

    // 如果消息太长，截断它
    if (formatted.length > 100) {
      formatted = formatted.substring(0, 97) + '...';
    }

    return formatted;
  }

  /**
   * 获取随机备用消息
   * @returns 随机备用消息
   */
  private getRandomFallbackMessage(): string {
    const index = Math.floor(Math.random() * FALLBACK_MESSAGES.length);
    return FALLBACK_MESSAGES[index];
  }

  /**
   * 预生成通知并缓存
   * @param duration 专注时长（分钟）
   * @returns 是否成功预生成
   */
  async preGenerateNotification(duration: number): Promise<boolean> {
    try {
      // 生成通知
      const notification = await this.generateNotification(duration);

      // 缓存通知（默认60分钟过期）
      await notificationCacheStorage.saveNotification(notification);

      return true;
    } catch (error) {
      console.error('Error pre-generating notification:', error);
      return false;
    }
  }

  /**
   * 获取缓存的通知，如果没有则生成新的
   * @param duration 专注时长（分钟）
   * @returns 通知消息
   */
  async getNotification(duration: number): Promise<string> {
    try {
      // 尝试获取缓存的通知
      const cachedNotification = await notificationCacheStorage.getNotification();

      // 如果有缓存的通知，使用它并清除缓存
      if (cachedNotification) {
        await notificationCacheStorage.clearNotification();
        return cachedNotification;
      }

      // 否则生成新的通知
      return await this.generateNotification(duration);
    } catch (error) {
      console.error('Error getting notification:', error);
      return this.getRandomFallbackMessage();
    }
  }

  /**
   * 更新系统提示词
   * @param systemPrompt 新的系统提示词
   */
  updateSystemPrompt(systemPrompt: string): void {
    this.systemPrompt = systemPrompt;
  }

  /**
   * 更新用户提示词模板
   * @param promptTemplate 新的用户提示词模板
   */
  updatePromptTemplate(promptTemplate: string): void {
    this.promptTemplate = promptTemplate;
  }
}

/**
 * 创建通知生成器实例
 * @param aiService AI服务实例
 * @param systemPrompt 系统提示词
 * @param promptTemplate 用户提示词模板
 * @returns 通知生成器实例
 */
export function createNotificationGenerator(
  aiService: AIService,
  systemPrompt?: string,
  promptTemplate?: string,
): NotificationGenerator {
  return new NotificationGenerator(aiService, systemPrompt, promptTemplate);
}
