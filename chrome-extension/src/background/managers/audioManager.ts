import { soundSettingsStorage, ttsConfigStorage, voiceCacheStorage } from '@extension/storage';
import { TTSTextProcessor, TTSCacheManager, TTSErrorHandler } from '@extension/shared';
import { TTSService } from '../../services/ttsService.js';
import { TIMEOUTS, MESSAGE_TYPES, ERROR_MESSAGES } from '../../constants/index.js';

export class AudioManager {
  private static instance: AudioManager;

  private constructor() {}

  static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  /**
   * 播放TTS语音通知
   */
  async playTTSNotification(text: string): Promise<void> {
    try {
      // 获取TTS配置
      const ttsConfig = await ttsConfigStorage.get();

      // 如果TTS未启用或未配置，回退到普通音频
      if (!ttsConfig.enabled || !(await ttsConfigStorage.isConfigured())) {
        console.log('TTS not enabled or not configured, falling back to normal sound');
        return await this.playNotificationSound();
      }

      // 获取声音设置
      const soundSettings = await soundSettingsStorage.get();
      if (!soundSettings.enabled) {
        console.log('Notification sound is disabled');
        return;
      }

      console.log('Generating TTS for text:', text);

      // 检查是否为开始语音（固定文本，可以缓存）
      const isStartVoice = TTSTextProcessor.isStartVoiceText(text);
      let audioData: string | null = null;

      if (isStartVoice) {
        // 尝试从缓存获取开始语音
        audioData = await voiceCacheStorage.getStartVoice(ttsConfig.voiceType);

        if (audioData) {
          console.log('Using cached start voice for voiceType:', ttsConfig.voiceType);
        } else {
          console.log('No cached start voice found, generating new one');
          // 使用配置的默认文本或回退到固定文本
          const startText = TTSTextProcessor.getStartVoiceText(ttsConfig);
          audioData = await TTSService.generateSpeech(startText);

          if (audioData) {
            // 缓存生成的语音
            await voiceCacheStorage.cacheStartVoice(ttsConfig.voiceType, audioData);
            console.log('Start voice generated and cached for voiceType:', ttsConfig.voiceType);
          }
        }
      } else {
        // 对于其他文本（如结束语音），正常生成
        audioData = await TTSService.generateSpeech(text);
      }

      if (!audioData) {
        console.log('TTS generation failed, falling back to normal sound');
        return await this.playNotificationSound();
      }

      // 使用offscreen document来播放音频
      await this.ensureOffscreenDocument();

      // 向offscreen document发送播放TTS音频的消息
      const response = await chrome.runtime.sendMessage({
        type: MESSAGE_TYPES.PLAY_TTS_SOUND,
        volume: soundSettings.volume,
        audioData: audioData,
      });

      if (response && response.success) {
        console.log('TTS notification played successfully with volume:', soundSettings.volume);
      } else {
        console.error('Failed to play TTS notification:', response?.error);
        // 如果TTS播放失败，回退到普通音频
        await this.playNotificationSound();
      }
    } catch (error) {
      console.error('Error playing TTS notification:', error);
      // 如果出错，回退到普通音频
      await this.playNotificationSound();
    }
  }

  /**
   * 播放普通通知音效
   */
  async playNotificationSound(): Promise<void> {
    try {
      // 获取声音设置
      const soundSettings = await soundSettingsStorage.get();

      // 如果声音被禁用，直接返回
      if (!soundSettings.enabled) {
        console.log('Notification sound is disabled');
        return;
      }

      // 使用offscreen document来播放音频
      await this.ensureOffscreenDocument();

      // 向offscreen document发送播放音频的消息
      const response = await chrome.runtime.sendMessage({
        type: MESSAGE_TYPES.PLAY_NOTIFICATION_SOUND,
        volume: soundSettings.volume,
        audioUrl: chrome.runtime.getURL('notification.mp3'),
      });

      if (response && response.success) {
        console.log('Notification sound played successfully with volume:', soundSettings.volume);
      } else {
        console.error('Failed to play notification sound:', response?.error);
      }
    } catch (error) {
      console.error('Error playing notification sound:', error);
    }
  }

  /**
   * 测试TTS功能
   * 修复Bug: 确保使用当前配置的语音类型进行测试
   */
  async testTTS(text: string, testConfig?: any): Promise<{ success: boolean; error?: string }> {
    try {
      // 获取当前TTS配置
      let ttsConfig = await ttsConfigStorage.get();

      // 如果提供了测试配置，临时使用测试配置
      if (testConfig) {
        ttsConfig = { ...ttsConfig, ...testConfig };
        console.log('Using test config:', testConfig);
      }

      if (!ttsConfig.enabled || !ttsConfig.appid || !ttsConfig.token) {
        return { success: false, error: ERROR_MESSAGES.TTS_NOT_CONFIGURED };
      }

      console.log('Testing TTS with config:', {
        voiceType: ttsConfig.voiceType,
        text: text,
        speedRatio: ttsConfig.speedRatio,
        appid: ttsConfig.appid ? '***' : 'missing',
        token: ttsConfig.token ? '***' : 'missing',
      });

      // 如果使用测试配置，临时保存配置以确保TTSService使用正确的设置
      if (testConfig) {
        await ttsConfigStorage.set(ttsConfig);
      }

      // 生成语音 - 这里会使用当前配置的语音类型
      const audioData = await TTSService.generateSpeech(text);

      // 如果使用了测试配置，恢复原始配置
      if (testConfig) {
        const originalConfig = await ttsConfigStorage.get();
        await ttsConfigStorage.set({ ...originalConfig, ...testConfig });
      }

      if (!audioData) {
        return { success: false, error: ERROR_MESSAGES.TTS_GENERATION_FAILED };
      }

      // 获取声音设置
      const soundSettings = await soundSettingsStorage.get();
      if (!soundSettings.enabled) {
        return { success: false, error: ERROR_MESSAGES.SOUND_DISABLED };
      }

      // 确保offscreen document存在
      await this.ensureOffscreenDocument();

      // 等待一小段时间确保offscreen document完全加载
      await new Promise(resolve => setTimeout(resolve, TIMEOUTS.OFFSCREEN_LOAD_DELAY));

      try {
        // 使用Promise包装消息发送，设置超时
        const response = await new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error(ERROR_MESSAGES.MESSAGE_TIMEOUT));
          }, TIMEOUTS.MESSAGE_TIMEOUT);

          chrome.runtime.sendMessage(
            {
              type: MESSAGE_TYPES.PLAY_TTS_SOUND,
              volume: soundSettings.volume,
              audioData: audioData,
            },
            response => {
              clearTimeout(timeout);
              if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError.message));
              } else {
                resolve(response);
              }
            },
          );
        });

        const typedResponse = response as { success: boolean; error?: string };
        if (typedResponse && typedResponse.success) {
          return { success: true };
        } else {
          return { success: false, error: typedResponse?.error || '播放失败' };
        }
      } catch (messageError) {
        console.error('Message sending error:', messageError);
        return { success: false, error: '无法与音频播放器通信: ' + (messageError as Error).message };
      }
    } catch (error) {
      console.error('TTS test error:', error);
      return { success: false, error: (error as Error).message };
    }
  }

  /**
   * 清除语音缓存（当voiceType改变时调用）
   */
  async clearVoiceCacheOnVoiceTypeChange(oldVoiceType: string, newVoiceType: string): Promise<void> {
    if (oldVoiceType !== newVoiceType) {
      console.log('VoiceType changed from', oldVoiceType, 'to', newVoiceType, ', clearing voice cache');
      await voiceCacheStorage.clearAllVoiceCache();
    }
  }

  /**
   * 确保offscreen document存在
   */
  private async ensureOffscreenDocument(): Promise<void> {
    try {
      // 检查是否已经有offscreen document
      try {
        const existingContexts = await chrome.runtime.getContexts({
          contextTypes: [chrome.runtime.ContextType.OFFSCREEN_DOCUMENT],
          documentUrls: [chrome.runtime.getURL('offscreen.html')],
        });

        if (existingContexts.length > 0) {
          return; // 已经存在
        }
      } catch (_contextError) {
        // 如果getContexts不可用，继续创建offscreen document
        console.log('getContexts not available, proceeding to create offscreen document');
      }

      // 创建offscreen document
      await chrome.offscreen.createDocument({
        url: chrome.runtime.getURL('offscreen.html'),
        reasons: [chrome.offscreen.Reason.AUDIO_PLAYBACK],
        justification: 'Playing notification sounds for focus timer',
      });

      console.log('Offscreen document created for audio playback');
    } catch (error) {
      console.error('Error creating offscreen document:', error);
    }
  }
}
