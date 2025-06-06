import 'webextension-polyfill';
import { exampleThemeStorage } from '@extension/storage';
import { FocusManager } from './managers/focusManager.js';
import { AudioManager } from './managers/audioManager.js';
import { UrlBlocker } from './managers/urlBlocker.js';
import { MESSAGE_TYPES } from '../constants/index.js';

// 管理器实例
const focusManager = FocusManager.getInstance();
const audioManager = AudioManager.getInstance();
const urlBlocker = UrlBlocker.getInstance();

// 消息监听器
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === MESSAGE_TYPES.TEST_TTS) {
    // 处理TTS测试请求
    audioManager
      .testTTS(message.text)
      .then(result => sendResponse(result))
      .catch(error => {
        console.error('TTS test error:', error);
        sendResponse({ success: false, error: error.message });
      });
    return true; // 保持消息通道开放以进行异步响应
  }
  return false;
});

// 监听存储变化
chrome.storage.onChanged.addListener(async (changes, areaName) => {
  if (areaName === 'local') {
    // 监听专注时间配置变化
    if (changes['focus-time-storage-key']) {
      const newValue = changes['focus-time-storage-key'].newValue;
      const oldValue = changes['focus-time-storage-key'].oldValue;

      // 如果状态从非活跃变为活跃，启动专注模式
      if (newValue?.isActive && !oldValue?.isActive) {
        await focusManager.startFocus(newValue.duration);
      }
      // 如果状态从活跃变为非活跃，停止专注模式
      else if (!newValue?.isActive && oldValue?.isActive) {
        await focusManager.stopFocus();
      }
    }

    // 监听TTS配置变化
    if (changes['tts-config-storage-key']) {
      const newValue = changes['tts-config-storage-key'].newValue;
      const oldValue = changes['tts-config-storage-key'].oldValue;

      // 如果voiceType发生变化，清除语音缓存
      if (newValue?.voiceType && oldValue?.voiceType && newValue.voiceType !== oldValue.voiceType) {
        console.log('VoiceType changed, clearing voice cache');
        await audioManager.clearVoiceCacheOnVoiceTypeChange(oldValue.voiceType, newValue.voiceType);
      }

      // 如果defaultText发生变化，也清除开始语音缓存
      if (newValue?.defaultText !== oldValue?.defaultText) {
        console.log('DefaultText changed, clearing start voice cache');
        await audioManager.clearVoiceCacheOnVoiceTypeChange('', ''); // 这会清除所有缓存
      }
    }
  }
});

// 监听标签页更新
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    await urlBlocker.checkTabUrl(tabId, tab.url);
  }
});

// 监听标签页激活
chrome.tabs.onActivated.addListener(async activeInfo => {
  try {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    if (tab.url) {
      await urlBlocker.checkTabUrl(activeInfo.tabId, tab.url);
    }
  } catch (error) {
    console.error('Error handling tab activation:', error);
  }
});

// 初始化
async function initialize() {
  try {
    console.log('Initializing background script...');

    // 初始化主题
    const theme = await exampleThemeStorage.get();
    console.log('Theme loaded:', theme);

    // 初始化专注管理器
    await focusManager.initialize();

    // 初始化预设网站处理器
    await urlBlocker.initializePredefinedSites();

    console.log('Background script initialized successfully');
  } catch (error) {
    console.error('Error during initialization:', error);
  }
}

// 启动初始化
initialize();
