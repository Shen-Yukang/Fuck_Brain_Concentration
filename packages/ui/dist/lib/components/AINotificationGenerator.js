import { useEffect } from 'react';
import { aiConfigStorage, notificationCacheStorage, focusStorage, AIProvider } from '@extension/storage';
import { useStorage } from '@extension/shared';
// 默认API端点
const API_ENDPOINTS = {
    [AIProvider.DEEPSEEK]: 'https://api.deepseek.com/v1/chat/completions',
    [AIProvider.OPENAI]: 'https://api.openai.com/v1/chat/completions',
};
// 获取默认端点
function getDefaultEndpoint(provider) {
    return API_ENDPOINTS[provider] || API_ENDPOINTS[AIProvider.DEEPSEEK];
}
/**
 * AI通知生成器组件
 *
 * 这个组件不渲染任何UI，只在后台处理AI通知的生成
 * 当检测到需要生成通知时，会调用AI服务生成通知并缓存
 */
export const AINotificationGenerator = () => {
    const aiConfig = useStorage(aiConfigStorage);
    // 检查并生成通知
    useEffect(() => {
        // 如果AI功能未启用或没有API密钥，不执行任何操作
        if (!aiConfig.enabled || !aiConfig.apiKey) {
            return;
        }
        // 定义一个异步函数来检查和生成通知
        const checkAndGenerateNotification = async () => {
            try {
                // 检查是否有生成标记
                const isGenerating = await notificationCacheStorage.isGenerating();
                // 如果没有生成标记，不执行任何操作
                if (!isGenerating) {
                    return;
                }
                console.log('Detected notification generation request, generating notification...');
                // 获取当前专注时长
                const focusConfig = await focusStorage.get();
                const duration = focusConfig.duration;
                // 准备提示词
                const systemPrompt = aiConfig.systemPrompt ||
                    `你是一个友好、积极的助手，负责在用户专注工作一段时间后提醒他们休息。
          你的消息应该：
          1. 简短（不超过50个字）
          2. 友好且鼓励性的
          3. 有时可以幽默或有趣
          4. 提醒用户休息的重要性
          5. 偶尔可以建议简单的伸展运动或放松技巧
          6. 语气自然，像朋友一样交流
          7. 不要重复相同的内容
          8. 不要使用过于正式或机械的语言`;
                const promptTemplate = aiConfig.promptTemplate ||
                    `生成一条简短的休息提醒消息。用户已经专注工作了{duration}分钟，现在是休息的时候了。`;
                const prompt = promptTemplate.replace('{duration}', duration.toString());
                // 准备请求选项
                const options = {
                    model: aiConfig.model,
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: prompt },
                    ],
                    temperature: 0.8,
                    max_tokens: 100,
                };
                // 发送请求到AI服务
                let notification;
                try {
                    const response = await fetch(aiConfig.apiEndpoint || getDefaultEndpoint(aiConfig.provider), {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${aiConfig.apiKey}`,
                        },
                        body: JSON.stringify(options),
                    });
                    if (!response.ok) {
                        throw new Error(`AI API error: ${response.status} ${response.statusText}`);
                    }
                    const data = await response.json();
                    const text = data.choices[0].message.content;
                    // 格式化通知
                    notification = text
                        .trim()
                        .replace(/^["']|["']$/g, '')
                        .replace(/\n+/g, ' ')
                        .trim();
                    // 如果消息太长，截断它
                    if (notification.length > 100) {
                        notification = notification.substring(0, 97) + '...';
                    }
                    // 保存通知
                    await notificationCacheStorage.saveNotification(notification);
                    // 重置生成状态
                    await notificationCacheStorage.setGenerating(false);
                    console.log('AI notification generated successfully:', notification);
                }
                catch (error) {
                    console.error('Error calling AI API:', error);
                    throw error; // 重新抛出错误，让外层catch处理
                }
            }
            catch (error) {
                console.error('Error generating AI notification:', error);
                // 出错时重置生成状态
                await notificationCacheStorage.setGenerating(false);
                // 使用备用消息
                const fallbackMessages = [
                    '休息一下吧！你已经专注工作了一段时间。',
                    '该活动一下了！站起来伸展一下身体吧。',
                    '休息是为了更好的工作，现在是放松的时候了。',
                    '你的大脑需要休息，去喝杯水吧！',
                    '专注时间结束，给自己一个小奖励吧！',
                ];
                const randomIndex = Math.floor(Math.random() * fallbackMessages.length);
                const message = fallbackMessages[randomIndex];
                // 保存备用消息
                await notificationCacheStorage.saveNotification(message);
            }
        };
        // 立即检查一次
        checkAndGenerateNotification();
        // 设置定时器，每5秒检查一次
        const intervalId = setInterval(checkAndGenerateNotification, 5000);
        // 清理函数
        return () => {
            clearInterval(intervalId);
        };
    }, [aiConfig]);
    // 这个组件不渲染任何内容
    return null;
};
