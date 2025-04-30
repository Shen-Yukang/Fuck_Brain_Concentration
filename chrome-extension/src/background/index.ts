import 'webextension-polyfill';
import {
  exampleThemeStorage,
  focusStorage,
  blockedUrlsStorage,
  notificationCacheStorage,
  aiConfigStorage,
  AIProvider,
} from '@extension/storage';

// 初始化主题
exampleThemeStorage.get().then(theme => {
  console.log('Theme loaded:', theme);
});

// 检查专注状态
let isFocusModeActive = false;
let blockedUrls: string[] = [];
let studyModeUrls: string[] = [];
let studyModeSelectors: Record<string, string[]> = {};

// 预生成通知
async function preGenerateNotification(duration: number) {
  try {
    // 获取AI配置
    const config = await aiConfigStorage.get();

    // 如果未启用AI或没有API密钥，不预生成
    if (!config.enabled || !config.apiKey) {
      console.log('AI service not enabled or no API key, skipping notification pre-generation');
      return;
    }

    // 检查是否已经有缓存的通知
    const cachedNotification = await notificationCacheStorage.getNotification();
    if (cachedNotification) {
      console.log('Already have a cached notification, skipping pre-generation');
      return;
    }

    // 检查是否已经在生成中
    const isGenerating = await notificationCacheStorage.isGenerating();
    if (isGenerating) {
      console.log('Already generating a notification, skipping');
      return;
    }

    // 设置生成状态，标记为需要生成
    await notificationCacheStorage.setGenerating(true);

    // 这里我们只是设置一个标记，表示需要生成通知
    // 实际的通知生成会在popup页面中进行，因为我们不能在这里直接使用shared模块
    console.log('Marked notification for pre-generation, duration:', duration);

    // 检查是否有popup页面打开
    const popupOpen = await checkIfPopupIsOpen();

    // 如果没有popup页面打开，使用备用消息
    if (!popupOpen) {
      console.log('No popup open, using fallback message');

      // 使用一个简单的备用消息
      const fallbackMessages = [
        '休息一下吧！你已经专注工作了一段时间。',
        '该活动一下了！站起来伸展一下身体吧。',
        '休息是为了更好的工作，现在是放松的时候了。',
        '你的大脑需要休息，去喝杯水吧！',
        '专注时间结束，给自己一个小奖励吧！',
      ];

      const randomIndex = Math.floor(Math.random() * fallbackMessages.length);
      const message = fallbackMessages[randomIndex];

      // 缓存通知（默认60分钟过期）
      await notificationCacheStorage.saveNotification(message);

      // 重置生成状态
      await notificationCacheStorage.setGenerating(false);
    }
    // 如果popup页面打开，保持生成状态为true，让popup页面处理生成

    return true;
  } catch (error) {
    console.error('Error pre-generating notification:', error);
    // 重置生成状态
    await notificationCacheStorage.setGenerating(false);
    return false;
  }
}

// 检查popup页面是否打开
async function checkIfPopupIsOpen(): Promise<boolean> {
  try {
    // 尝试向popup页面发送消息
    const response = await chrome.runtime.sendMessage({ type: 'PING_POPUP' });
    return response && response.type === 'PONG_POPUP';
  } catch {
    // 如果发送消息失败，说明popup页面未打开
    return false;
  }
}

// 加载专注状态和禁用URL
async function loadFocusState() {
  const focusConfig = await focusStorage.get();
  isFocusModeActive = focusConfig.isActive;

  const urlsConfig = await blockedUrlsStorage.get();
  blockedUrls = urlsConfig.urls || [];
  studyModeUrls = urlsConfig.studyModeUrls || [];
  studyModeSelectors = urlsConfig.studyModeSelectors || {};

  console.log('Focus mode active:', isFocusModeActive);
  console.log('Blocked URLs:', blockedUrls);
  console.log('Study Mode URLs:', studyModeUrls);
  console.log('Study Mode Selectors:', studyModeSelectors);

  // 如果专注模式已激活，设置图标状态
  updateExtensionIcon(isFocusModeActive);

  return { isFocusModeActive, focusConfig };
}

// 更新扩展图标和徽章
function updateExtensionIcon(isActive: boolean) {
  // 设置徽章而不是更换图标
  if (isActive) {
    // 设置红色徽章表示专注模式已激活
    chrome.action.setBadgeBackgroundColor({ color: '#E53935' });
    chrome.action.setBadgeText({ text: '专注' });
  } else {
    // 清除徽章
    chrome.action.setBadgeText({ text: '' });
  }
}

// 监听存储变化
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local') {
    // 检查专注时间配置变化
    if (changes['focus-time-storage-key']) {
      const newValue = changes['focus-time-storage-key'].newValue;
      if (newValue) {
        isFocusModeActive = newValue.isActive;
        updateExtensionIcon(isFocusModeActive);

        // 如果状态从非活跃变为活跃，显示通知并启动定时器检查
        if (isFocusModeActive && !changes['focus-time-storage-key'].oldValue?.isActive) {
          chrome.notifications.create('focus-start', {
            type: 'basic',
            iconUrl: chrome.runtime.getURL('spring-128.png'),
            title: '专注模式已启动',
            message: `专注时间：${newValue.duration}分钟`,
          });

          // 启动定时器检查
          startTimerCheck();

          // 如果启用了AI通知，预生成通知
          aiConfigStorage.get().then(aiConfig => {
            if (aiConfig.enabled) {
              // 预生成通知
              preGenerateNotification(newValue.duration);
            }
          });
        }

        // 如果状态从活跃变为非活跃，显示通知并停止定时器检查
        if (!isFocusModeActive && changes['focus-time-storage-key'].oldValue?.isActive) {
          // 通知已经在checkFocusTimer中处理，这里不再重复

          // 停止定时器检查
          stopTimerCheck();

          // 清除缓存的通知
          notificationCacheStorage.clearNotification();
        }
      }
    }

    // 检查禁用URL列表变化
    if (changes['blocked-urls-storage-key']) {
      const newValue = changes['blocked-urls-storage-key'].newValue;
      if (newValue) {
        blockedUrls = newValue.urls || [];
        studyModeUrls = newValue.studyModeUrls || [];
        studyModeSelectors = newValue.studyModeSelectors || {};
      }
    }

    // 检查AI配置变化
    if (changes['ai-config-storage-key']) {
      const newValue = changes['ai-config-storage-key'].newValue;
      if (newValue) {
        // 配置发生变化，但我们不需要特殊处理
        console.log('AI configuration changed');
      }
    }
  }
});

// 监听标签页更新
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // 只在页面完成加载且URL变化时检查
  if (changeInfo.status === 'complete' && tab.url) {
    checkTabUrl(tabId, tab.url);
  }
});

// 监听标签页激活
chrome.tabs.onActivated.addListener(activeInfo => {
  chrome.tabs.get(activeInfo.tabId, tab => {
    if (tab.url) {
      checkTabUrl(tab.id!, tab.url);
    }
  });
});

// 检查标签页URL是否在禁用列表中
async function checkTabUrl(tabId: number, url: string) {
  // 如果专注模式未激活，不进行检查
  if (!isFocusModeActive) return;

  // 检查URL是否在禁用列表中
  const isBlocked = isUrlBlocked(url);
  const isStudyMode = isUrlInStudyMode(url);

  if (isBlocked) {
    // 重定向到阻止页面或显示警告
    await chrome.scripting.executeScript({
      target: { tabId },
      func: showBlockedWarning,
    });
  } else if (isStudyMode) {
    // 应用学习模式，禁用特定元素
    const selectors = getStudyModeSelectors(url);
    if (selectors && selectors.length > 0) {
      await chrome.scripting.executeScript({
        target: { tabId },
        func: applyStudyMode,
        args: [selectors],
      });
    }
  }
}

// 检查URL是否被禁用
function isUrlBlocked(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return blockedUrls.some(blockedUrl => {
      try {
        const blockedUrlObj = new URL(blockedUrl);
        // 检查主域名是否匹配
        return urlObj.hostname.includes(blockedUrlObj.hostname);
      } catch {
        // 如果无法解析被阻止的URL，则检查简单的包含关系
        return url.includes(blockedUrl);
      }
    });
  } catch {
    return false;
  }
}

// 检查URL是否在学习模式中
function isUrlInStudyMode(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return studyModeUrls.some(studyModeUrl => {
      try {
        const studyModeUrlObj = new URL(studyModeUrl);
        // 检查主域名是否匹配
        return urlObj.hostname.includes(studyModeUrlObj.hostname);
      } catch {
        // 如果无法解析学习模式URL，则检查简单的包含关系
        return url.includes(studyModeUrl);
      }
    });
  } catch {
    return false;
  }
}

// 获取URL对应的学习模式选择器
function getStudyModeSelectors(url: string): string[] {
  try {
    const urlObj = new URL(url);

    // 首先尝试精确匹配
    for (const studyModeUrl in studyModeSelectors) {
      if (url === studyModeUrl) {
        return studyModeSelectors[studyModeUrl];
      }
    }

    // 然后尝试域名匹配
    for (const studyModeUrl in studyModeSelectors) {
      try {
        const studyModeUrlObj = new URL(studyModeUrl);
        if (urlObj.hostname.includes(studyModeUrlObj.hostname)) {
          return studyModeSelectors[studyModeUrl];
        }
      } catch {
        // 如果无法解析URL，则检查简单的包含关系
        if (url.includes(studyModeUrl)) {
          return studyModeSelectors[studyModeUrl];
        }
      }
    }

    // 如果没有找到匹配的选择器，返回默认选择器
    // 对于bilibili网站，默认禁用搜索框
    if (urlObj.hostname.includes('bilibili.com')) {
      return ['#nav-searchform', '.center-search__bar'];
    }

    return [];
  } catch {
    return [];
  }
}

// 在页面上显示警告
function showBlockedWarning() {
  // 创建覆盖层
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
  overlay.style.zIndex = '9999999';
  overlay.style.display = 'flex';
  overlay.style.flexDirection = 'column';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.color = 'white';
  overlay.style.fontFamily = 'Arial, sans-serif';
  overlay.style.fontSize = '16px'; // Base font size
  overlay.style.padding = '20px';
  overlay.style.boxSizing = 'border-box';

  // 创建警告文本
  const warningText = document.createElement('h1');
  warningText.textContent = '专注模式已启动';
  warningText.style.marginBottom = '20px';
  warningText.style.fontSize = '24px';
  warningText.style.fontWeight = 'bold';

  const messageText = document.createElement('p');
  messageText.textContent = '当前网站在专注模式下被禁用';
  messageText.style.marginBottom = '30px';
  messageText.style.fontSize = '18px';

  // 创建返回按钮
  const backButton = document.createElement('button');
  backButton.textContent = '返回上一页';
  backButton.style.padding = '10px 20px';
  backButton.style.backgroundColor = '#4A90E2';
  backButton.style.border = 'none';
  backButton.style.borderRadius = '4px';
  backButton.style.color = 'white';
  backButton.style.cursor = 'pointer';
  backButton.style.fontSize = '16px';
  backButton.onclick = () => {
    history.back();
    document.body.removeChild(overlay);
  };

  // 添加元素到覆盖层
  overlay.appendChild(warningText);
  overlay.appendChild(messageText);
  overlay.appendChild(backButton);

  // 添加覆盖层到页面
  document.body.appendChild(overlay);
}

// 应用学习模式，禁用特定元素
function applyStudyMode(selectors: string[]) {
  console.log('Applying study mode with selectors:', selectors);

  // 创建一个小提示，显示学习模式已启用
  const studyModeIndicator = document.createElement('div');
  studyModeIndicator.style.position = 'fixed';
  studyModeIndicator.style.top = '10px';
  studyModeIndicator.style.right = '10px';
  studyModeIndicator.style.backgroundColor = 'rgba(0, 128, 0, 0.8)';
  studyModeIndicator.style.color = 'white';
  studyModeIndicator.style.padding = '8px 12px';
  studyModeIndicator.style.borderRadius = '4px';
  studyModeIndicator.style.zIndex = '9999998';
  studyModeIndicator.style.fontSize = '14px';
  studyModeIndicator.style.fontFamily = 'Arial, sans-serif';
  studyModeIndicator.textContent = '学习模式已启用';

  // 添加到页面
  document.body.appendChild(studyModeIndicator);

  // 5秒后隐藏提示
  setTimeout(() => {
    studyModeIndicator.style.opacity = '0';
    studyModeIndicator.style.transition = 'opacity 0.5s';
    setTimeout(() => {
      if (document.body.contains(studyModeIndicator)) {
        document.body.removeChild(studyModeIndicator);
      }
    }, 500);
  }, 5000);

  // 禁用指定的元素
  selectors.forEach(selector => {
    try {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        if (element instanceof HTMLElement) {
          // 保存原始样式
          const originalPointerEvents = element.style.pointerEvents;
          const originalOpacity = element.style.opacity;
          const originalCursor = element.style.cursor;

          // 应用禁用样式
          element.style.pointerEvents = 'none';
          element.style.opacity = '0.5';
          element.style.cursor = 'not-allowed';

          // 确保字体样式一致
          if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'BUTTON') {
            element.style.fontSize = element.style.fontSize || 'inherit';
          }

          // 添加一个标记，表示这个元素已被禁用
          element.dataset.studyModeDisabled = 'true';

          // 保存原始样式，以便以后可以恢复
          element.dataset.originalPointerEvents = originalPointerEvents;
          element.dataset.originalOpacity = originalOpacity;
          element.dataset.originalCursor = originalCursor;
        }
      });
      console.log(`Disabled ${elements.length} elements with selector: ${selector}`);
    } catch (error) {
      console.error(`Error disabling elements with selector ${selector}:`, error);
    }
  });

  // 监听DOM变化，对新添加的元素也应用禁用
  const observer = new MutationObserver(mutations => {
    let shouldReapply = false;

    mutations.forEach(mutation => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        shouldReapply = true;
      }
    });

    if (shouldReapply) {
      selectors.forEach(selector => {
        try {
          const elements = document.querySelectorAll(selector);
          elements.forEach(element => {
            if (element instanceof HTMLElement && !element.dataset.studyModeDisabled) {
              // 应用禁用样式
              element.style.pointerEvents = 'none';
              element.style.opacity = '0.5';
              element.style.cursor = 'not-allowed';
              // 确保字体样式一致
              if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'BUTTON') {
                element.style.fontSize = element.style.fontSize || 'inherit';
              }
              element.dataset.studyModeDisabled = 'true';
            }
          });
        } catch (error) {
          console.error(`Error in mutation observer for selector ${selector}:`, error);
        }
      });
    }
  });

  // 开始观察整个文档
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  // 将观察器保存到window对象，以便以后可以断开连接
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).__studyModeObserver = observer;
}

// 定期检查专注时间是否结束
async function checkFocusTimer() {
  // 只在专注模式激活时检查
  if (!isFocusModeActive) return;

  try {
    // 获取剩余时间
    const remainingTime = await focusStorage.getRemainingTime();

    // 获取AI配置
    const aiConfig = await aiConfigStorage.get();

    // 如果时间到了，自动停止专注
    if (remainingTime <= 0 && isFocusModeActive) {
      console.log('Focus timer ended, stopping focus mode automatically');

      // 不需要获取专注配置

      // 如果启用了AI通知，尝试获取预生成的通知
      let notificationMessage = '休息一下吧！';

      if (aiConfig.enabled) {
        try {
          // 尝试从缓存中获取通知
          const cachedNotification = await notificationCacheStorage.getNotification();
          if (cachedNotification) {
            notificationMessage = cachedNotification;
            // 清除缓存
            await notificationCacheStorage.clearNotification();
          }
        } catch (error) {
          console.error('Error getting cached notification:', error);
        }
      }

      // 停止专注模式
      await focusStorage.stopFocus();

      // 显示自定义通知
      chrome.notifications.create('focus-end', {
        type: 'basic',
        iconUrl: chrome.runtime.getURL('spring-128.png'),
        title: '专注模式已结束',
        message: notificationMessage,
      });
    }
    // 如果启用了AI通知，并且剩余时间接近预生成时间，预生成通知
    else if (aiConfig.enabled && remainingTime > 0 && remainingTime <= aiConfig.preGenerateMinutes * 60) {
      // 检查是否已经有缓存的通知
      const cachedNotification = await notificationCacheStorage.getNotification();

      // 如果没有缓存的通知，预生成一个
      if (!cachedNotification) {
        const focusConfig = await focusStorage.get();
        await preGenerateNotification(focusConfig.duration);
      }
    }
  } catch (error) {
    console.error('Error checking focus timer:', error);
  }
}

// 设置定时器，每秒检查一次专注时间
let timerCheckInterval: number | null = null;

function startTimerCheck() {
  if (timerCheckInterval) return; // 避免重复设置

  // 设置每秒检查一次
  timerCheckInterval = setInterval(checkFocusTimer, 1000) as unknown as number;
  console.log('Started focus timer check interval');
}

function stopTimerCheck() {
  if (timerCheckInterval) {
    clearInterval(timerCheckInterval);
    timerCheckInterval = null;
    console.log('Stopped focus timer check interval');
  }
}

// 初始化
async function initialize() {
  // 加载专注状态
  await loadFocusState();

  // 检查AI配置
  const aiConfig = await aiConfigStorage.get();
  console.log('AI notifications enabled:', aiConfig.enabled);

  // 如果专注模式已激活，启动定时器检查
  if (isFocusModeActive) {
    startTimerCheck();

    // 获取AI配置
    const aiConfig = await aiConfigStorage.get();

    // 如果启用了AI通知，获取专注配置并预生成通知
    if (aiConfig.enabled) {
      const focusConfig = await focusStorage.get();
      await preGenerateNotification(focusConfig.duration);
    }
  }

  console.log('Focus mode background script loaded with AI integration');
}

// 启动初始化
initialize().catch(error => {
  console.error('Error during initialization:', error);
});
