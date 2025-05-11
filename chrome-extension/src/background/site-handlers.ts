/**
 * 网站特定处理模块
 *
 * 这个模块提供了一种灵活的方式来为不同网站定义特定的处理逻辑，
 * 而不是在主代码中硬编码这些逻辑。
 */

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
  getCustomHandler(tabId: number) {
    // 返回一个函数，该函数将在页面上下文中执行
    return function customBaiduHandler(selectors: string[]) {
      console.log('Applying Baidu specific study mode with selectors:', selectors);

      // 创建专注提醒小卡片
      const focusReminder = document.createElement('div');
      focusReminder.style.position = 'fixed';
      focusReminder.style.top = '70px';
      focusReminder.style.right = '10px';
      focusReminder.style.backgroundColor = 'rgba(0, 128, 0, 0.8)';
      focusReminder.style.color = 'white';
      focusReminder.style.padding = '12px 16px';
      focusReminder.style.borderRadius = '8px';
      focusReminder.style.zIndex = '9999999';
      focusReminder.style.fontSize = '14px';
      focusReminder.style.fontFamily = 'Arial, sans-serif';
      focusReminder.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
      focusReminder.style.width = '200px';
      focusReminder.style.textAlign = 'center';

      // 添加标题
      const title = document.createElement('div');
      title.textContent = '专注提醒';
      title.style.fontWeight = 'bold';
      title.style.fontSize = '16px';
      title.style.marginBottom = '8px';
      focusReminder.appendChild(title);

      // 添加内容
      const content = document.createElement('div');
      content.textContent = '已为您屏蔽热搜和顶部导航，专注于当前任务';
      focusReminder.appendChild(content);

      // 添加到页面
      document.body.appendChild(focusReminder);

      // 30秒后淡出
      setTimeout(() => {
        focusReminder.style.transition = 'opacity 1s';
        focusReminder.style.opacity = '0';
        setTimeout(() => {
          if (document.body.contains(focusReminder)) {
            document.body.removeChild(focusReminder);
          }
        }, 1000);
      }, 30000);

      // 处理选择器
      selectors.forEach(selector => {
        try {
          const elements = document.querySelectorAll(selector);
          elements.forEach(element => {
            if (element instanceof HTMLElement) {
              // 完全隐藏元素
              element.style.display = 'none';

              // 标记为已处理
              element.dataset.studyModeDisabled = 'true';
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
                  // 完全隐藏元素
                  element.style.display = 'none';

                  // 标记为已处理
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
    };
  },
};

/**
 * 所有网站处理器的集合
 */
export const siteHandlers: SiteHandler[] = [
  bilibiliHandler,
  baiduHandler,
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
    return siteHandlers.find(handler => urlObj.hostname.includes(handler.domain));
  } catch {
    return undefined;
  }
}
