/**
 * 网站特定处理模块
 *
 * 这个模块提供了一种灵活的方式来为不同网站定义特定的处理逻辑，
 * 而不是在主代码中硬编码这些逻辑。
 */

/**
 * 创建通用的网站处理器函数
 * @param message 专注提醒消息
 * @param backgroundColor 提醒卡片背景色
 * @returns 处理器函数
 */
function createCommonHandler(message: string, backgroundColor: string) {
  return function (selectors: string[]) {
    console.log('Applying site-specific study mode with selectors:', selectors);

    // 创建专注提醒小卡片
    function createFocusReminder(msg: string, bgColor: string) {
      const focusReminder = document.createElement('div');
      focusReminder.style.position = 'fixed';
      focusReminder.style.top = '70px';
      focusReminder.style.right = '10px';
      focusReminder.style.backgroundColor = bgColor;
      focusReminder.style.color = 'white';
      focusReminder.style.padding = '12px 16px';
      focusReminder.style.borderRadius = '8px';
      focusReminder.style.zIndex = '9999999';
      focusReminder.style.fontSize = '14px';
      focusReminder.style.fontFamily = 'Arial, sans-serif';
      focusReminder.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
      focusReminder.style.width = '200px';
      focusReminder.style.textAlign = 'center';

      const title = document.createElement('div');
      title.textContent = '专注提醒';
      title.style.fontWeight = 'bold';
      title.style.fontSize = '16px';
      title.style.marginBottom = '8px';
      focusReminder.appendChild(title);

      const content = document.createElement('div');
      content.textContent = msg;
      focusReminder.appendChild(content);

      document.body.appendChild(focusReminder);

      setTimeout(() => {
        focusReminder.style.transition = 'opacity 1s';
        focusReminder.style.opacity = '0';
        setTimeout(() => {
          if (document.body.contains(focusReminder)) {
            document.body.removeChild(focusReminder);
          }
        }, 1000);
      }, 30000);
    }

    // 处理选择器并监听DOM变化
    function applySelectors(sels: string[]) {
      sels.forEach(selector => {
        try {
          const elements = document.querySelectorAll(selector);
          elements.forEach(element => {
            if (element instanceof HTMLElement) {
              element.style.display = 'none';
              element.dataset.studyModeDisabled = 'true';
            }
          });
          console.log(`Disabled ${elements.length} elements with selector: ${selector}`);
        } catch (error) {
          console.error(`Error disabling elements with selector ${selector}:`, error);
        }
      });

      const observer = new MutationObserver(mutations => {
        let shouldReapply = false;
        mutations.forEach(mutation => {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            shouldReapply = true;
          }
        });

        if (shouldReapply) {
          sels.forEach(selector => {
            try {
              const elements = document.querySelectorAll(selector);
              elements.forEach(element => {
                if (element instanceof HTMLElement && !element.dataset.studyModeDisabled) {
                  element.style.display = 'none';
                  element.dataset.studyModeDisabled = 'true';
                }
              });
            } catch (error) {
              console.error(`Error in mutation observer for selector ${selector}:`, error);
            }
          });
        }
      });

      observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).__studyModeObserver = observer;
    }

    // 执行处理
    createFocusReminder(message, backgroundColor);
    applySelectors(selectors);
  };
}

/**
 * 网站处理器接口
 * 每个网站处理器都应该实现这个接口
 */
export interface SiteHandler {
  /**
   * 网站的域名或URL模式
   * 用于匹配当前访问的网站
   */
  domain: string;

  /**
   * 获取该网站在学习模式下需要禁用的元素选择器
   * @returns 选择器数组
   */
  getSelectors(): string[];

  /**
   * 自定义处理函数，在学习模式下执行
   * 可以用于实现更复杂的逻辑，如替换元素、添加提示等
   * @param tabId 当前标签页ID
   * @returns 要注入到页面的函数
   */
  getCustomHandler?(tabId: number): (selectors: string[]) => void;
}

/**
 * Bilibili网站处理器
 * 禁用搜索框
 */
export const bilibiliHandler: SiteHandler = {
  domain: 'bilibili.com',
  getSelectors() {
    return ['#nav-searchform', '.center-search__bar'];
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getCustomHandler(_tabId: number) {
    // 使用通用处理器函数
    return createCommonHandler('已为您屏蔽搜索功能，专注于观看学习内容', 'rgba(255, 105, 180, 0.8)');
  },
};

/**
 * 百度网站处理器
 * 隐藏热搜和顶部导航
 */
export const baiduHandler: SiteHandler = {
  domain: 'baidu.com',
  getSelectors() {
    return ['#s-hotsearch-wrapper', '#con-ceiling-wrapper'];
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getCustomHandler(_tabId: number) {
    // 使用通用处理器函数
    return createCommonHandler('已为您屏蔽热搜和顶部导航，专注于当前任务', 'rgba(0, 128, 0, 0.8)');
  },
};

/**
 * 知乎网站处理器
 * 屏蔽热门话题推荐区域
 */
export const zhihuHandler: SiteHandler = {
  domain: 'zhihu.com',
  getSelectors() {
    return ['.Topstory'];
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getCustomHandler(_tabId: number) {
    // 使用通用处理器函数
    return createCommonHandler('已为您屏蔽热门话题推荐，专注于学习和阅读', 'rgba(0, 123, 255, 0.8)');
  },
};

/**
 * 所有网站处理器的集合
 */
export const siteHandlers: SiteHandler[] = [
  bilibiliHandler,
  baiduHandler,
  zhihuHandler,
  // 在这里添加更多网站处理器
];

/**
 * 根据URL获取匹配的网站处理器
 * @param url 当前页面URL
 * @returns 匹配的处理器，如果没有匹配则返回undefined
 */
export function getSiteHandler(url: string): SiteHandler | undefined {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;

    console.log('getSiteHandler: Checking URL:', url);
    console.log('getSiteHandler: Hostname:', hostname);
    console.log(
      'getSiteHandler: Available handlers:',
      siteHandlers.map(h => h.domain),
    );

    const handler = siteHandlers.find(handler => {
      // 精确匹配
      if (hostname === handler.domain) {
        return true;
      }

      // 子域名匹配 (www.baidu.com 匹配 baidu.com)
      if (hostname.endsWith('.' + handler.domain)) {
        return true;
      }

      // 移除 www 前缀后匹配
      const hostnameWithoutWww = hostname.startsWith('www.') ? hostname.substring(4) : hostname;
      if (hostnameWithoutWww === handler.domain) {
        return true;
      }

      return false;
    });

    console.log('getSiteHandler: Found handler:', handler?.domain || 'none');
    return handler;
  } catch (error) {
    console.error('getSiteHandler: Error:', error);
    return undefined;
  }
}
