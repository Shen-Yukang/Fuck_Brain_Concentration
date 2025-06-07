/**
 * 通知生成器服务
 *
 * 注意：此服务已被弃用。AI通知生成逻辑已统一移至 Background Script 的 NotificationManager 中。
 * 保留此文件是为了向后兼容和类型定义，但主要功能已不再使用。
 */
export declare const FALLBACK_MESSAGES: string[];
/**
 * 获取随机备用消息
 * @returns 随机备用消息
 */
export declare function getRandomFallbackMessage(): string;
/**
 * 通知生成器类 - 已弃用，保留用于向后兼容
 * @deprecated 请使用 Background Script 中的 NotificationManager
 */
export declare class NotificationGenerator {
    /**
     * @deprecated 此类已弃用，功能已移至 Background Script
     */
    constructor();
    /**
     * @deprecated 此方法已弃用
     */
    generateNotification(duration: number): Promise<string>;
    /**
     * @deprecated 此方法已弃用
     */
    getNotification(duration: number): Promise<string>;
}
/**
 * @deprecated 此函数已弃用
 */
export declare function createNotificationGenerator(): NotificationGenerator;
//# sourceMappingURL=notificationGenerator.d.ts.map