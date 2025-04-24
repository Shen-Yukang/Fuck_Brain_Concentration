import 'webextension-polyfill';
import { exampleThemeStorage, focusStorage, blockedUrlsStorage } from '@extension/storage';

// 初始化主题
exampleThemeStorage.get().then(theme => {
  console.log('Theme loaded:', theme);
});

// 检查专注状态
let isFocusModeActive = false;
let blockedUrls: string[] = [];

// 加载专注状态和禁用URL
async function loadFocusState() {
  const focusConfig = await focusStorage.get();
  isFocusModeActive = focusConfig.isActive;

  const urlsConfig = await blockedUrlsStorage.get();
  blockedUrls = urlsConfig.urls;

  console.log('Focus mode active:', isFocusModeActive);
  console.log('Blocked URLs:', blockedUrls);

  // 如果专注模式已激活，设置图标状态
  updateExtensionIcon(isFocusModeActive);
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

        // 如果状态从非活跃变为活跃，显示通知
        if (isFocusModeActive && !changes['focus-time-storage-key'].oldValue?.isActive) {
          chrome.notifications.create('focus-start', {
            type: 'basic',
            iconUrl: chrome.runtime.getURL('spring-128.png'),
            title: '专注模式已启动',
            message: `专注时间：${newValue.duration}分钟`,
          });
        }

        // 如果状态从活跃变为非活跃，显示通知
        if (!isFocusModeActive && changes['focus-time-storage-key'].oldValue?.isActive) {
          chrome.notifications.create('focus-end', {
            type: 'basic',
            iconUrl: chrome.runtime.getURL('spring-128.png'),
            title: '专注模式已结束',
            message: '休息一下吧！',
          });
        }
      }
    }

    // 检查禁用URL列表变化
    if (changes['blocked-urls-storage-key']) {
      const newValue = changes['blocked-urls-storage-key'].newValue;
      if (newValue) {
        blockedUrls = newValue.urls;
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

  if (isBlocked) {
    // 重定向到阻止页面或显示警告
    await chrome.scripting.executeScript({
      target: { tabId },
      func: showBlockedWarning,
    });
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
  overlay.style.padding = '20px';
  overlay.style.boxSizing = 'border-box';

  // 创建警告文本
  const warningText = document.createElement('h1');
  warningText.textContent = '专注模式已启动';
  warningText.style.marginBottom = '20px';

  const messageText = document.createElement('p');
  messageText.textContent = '当前网站在专注模式下被禁用';
  messageText.style.marginBottom = '30px';

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

// 初始化
loadFocusState();

console.log('Focus mode background script loaded');
