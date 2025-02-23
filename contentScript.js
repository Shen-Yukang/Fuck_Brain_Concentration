// // ContentScript.js
// console.log('[内容脚本] 已注入', new Date().toISOString());

// (() => {
//   if (window.hasRun) return;
//   window.hasRun = true;
//   // 样式配置
//   const STYLE_ID = 'focus-notification-styles-v3';
//   let currentNotification = null;
//   let autoCloseTimer = null;

//   // 初始化样式（防重复）
//   function initStyles() {
//     if (document.getElementById(STYLE_ID)) return;
    
//     try {
//       const style = document.createElement('style');
//       style.id = STYLE_ID;
//       style.textContent = `
//         .yukang-custom-notification {
//           position: fixed;
//           top: 20px;
//           left: 50%;
//           transform: translateX(-50%);
//           z-index: 2147483647;
//           width: 320px;
//           background: #fff;
//           border: 1px solid #ddd;
//           border-radius: 8px;
//           font-family: Arial, sans-serif;
//           box-shadow: 0 4px 6px rgba(0,0,0,0.1);
//           overflow: hidden;
//           animation: yukangSlideIn 0.3s ease-out;
//         }

//         .yukang-custom-notification.slide-out {
//           animation: yukangSlideOut 0.3s ease-out;
//         }

//         @keyframes yukangSlideIn {
//           from { transform: translate(-50%, -20px); opacity: 0; }
//           to { transform: translate(-50%, 0); opacity: 1; }
//         }

//         @keyframes yukangSlideOut {
//           from { transform: translate(-50%, 0); opacity: 1; }
//           to { transform: translate(-50%, -20px); opacity: 0; }
//         }

//         /* 头部区域 */
//         .notification-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           background: #f7f7f7;
//           padding: 12px 16px;
//         }

//         .notification-title {
//           margin: 0;
//           font-size: 18px;
//           color: #333;
//         }

//         /* 关闭按钮 */
//         .notification-close {
//           background: none;
//           border: none;
//           font-size: 20px;
//           cursor: pointer;
//           color: #888;
//           line-height: 1;
//         }

//         /* 内容区域 */
//         .notification-content {
//           padding: 16px;
//           font-size: 14px;
//           color: #555;
//         }

//         /* 操作按钮区域 */
//         .notification-actions {
//           display: flex;
//           justify-content: flex-end;
//           gap: 10px;
//           padding: 12px 16px;
//           background: #fafafa;
//         }

//         .notification-actions button {
//           border: none;
//           background: #007BFF;
//           color: #fff;
//           padding: 8px 12px;
//           border-radius: 4px;
//           cursor: pointer;
//           transition: background 0.3s;
//         }

//         .notification-actions button:hover {
//           background: #0056b3;
//         }`;
//       document.head.appendChild(style);
//     } catch (error) {
//       console.error('样式初始化失败:', error);
//     }
//   }

//   // 初始化
//   initStyles();

//   // 就绪状态通知
//   const notifyReady = () => chrome.runtime.sendMessage('CONTENT_SCRIPT_READY');
//   document.readyState === 'complete' ? notifyReady() : window.addEventListener('load', notifyReady);

//   // 消息监听器（关键修复）
//   const messageHandler = (message, sender, sendResponse) => {
//     if (message.action === 'syncState') {
//       if (message.isFocusActive) {
//         showCustomNotification({
//           title: `专注中 (剩余 ${Math.ceil(message.remainingTime/60)} 分钟)`,
//           message: '保持专注哦~'
//         });
//       } else {
//         hideNotification();
//       }
//     }

//     if (message.action === 'notification') {
//       // 检查是否重复消息
//       if (currentNotification?.dataset?.notificationId === message.data.id) {
//         sendResponse({ status: "ignored", reason: "duplicate" });
//         return true;
//       }

//       console.log("处理通知请求", message);
//       sendResponse({ status: "received" });
//       showCustomNotification(message.data);
//       return true;
//     }
//   };

//   // 单次注册监听器
//   if (!window.__yukang_notification_initialized) {
//     chrome.runtime.onMessage.addListener(messageHandler);
//     window.__yukang_notification_initialized = true;
//   }


//   function showCustomNotification(data) {
//     let autoCloseTimer;

//     // 当鼠标悬停时暂停自动关闭
//     notification.addEventListener('mouseenter', () => {
//       clearTimeout(autoCloseTimer);
//     });

//     notification.addEventListener('mouseleave', () => {
//       autoCloseTimer = setTimeout(hideNotification, 5000);
//     });

//     // 清理现有通知
//     hideNotification();

//     const notificationId = `notification-${Date.now()}`;

//     // 创建通知元素
//     const notification = document.createElement('div');
//     notification.className = 'yukang-custom-notification';
//     notification.dataset.notificationId = notificationId; // 唯一标识
//     notification.innerHTML = `
//       <div class="notification-header" data-id="${notificationId}>
//         <h3 class="notification-title">${escapeHtml(data.title)}</h3>
//         <button class="notification-close" title="关闭">&times;</button>
//       </div>
//       <div class="notification-content">
//         <p>${escapeHtml(data.message)}</p>
//       </div>
//       <div class="notification-actions">
//         <button class="action-retry">再来一轮</button>
//         <button class="action-stop">结束专注</button>
//       </div>
//     `;

//     // 事件绑定（优化解绑逻辑）
//     const onClick = (type) => {
//       if (notification.dataset.notificationId !== notificationId) return;
//       chrome.runtime.sendMessage({ action: type === 'retry' ? 'startFocus' : 'pauseFocus' });
//       hideNotification();
//     };

      
//     // 事件绑定
//     notification.querySelector('.action-retry').addEventListener('click', () => onClick('retry'));
//     notification.querySelector('.action-stop').addEventListener('click', () => onClick('stop'));
//     notification.querySelector('.notification-close').addEventListener('click', hideNotification);

//     document.body.appendChild(notification);
//     currentNotification = notification;

//     // 设置自动关闭
//     autoCloseTimer = setTimeout(hideNotification, 5000);
//   }

//   // 清楚通知
//   function hideNotification() {
//     if (currentNotification) {
//       // clearTimeout(autoCloseTimer);
//       // currentNotification.removeEventListener('animationend', hideNotification);
//       // currentNotification.remove();
//       // currentNotification = null;
//       currentNotification.classList.add('slide-out');
//       currentNotification.addEventListener('animationend', () => {
//         currentNotification.remove();
//         currentNotification = null;
//       }, { once: true });
//     }
//   }

//   // HTML转义防止XSS
//   function escapeHtml(unsafe) {
//     return unsafe?.replace(/[&<"'>]/g, m => 
//       ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]
//     ) || '';
//   }
// })();


// contentScript.js
(() => {
  const STYLE_ID = 'focus-notification-styles-v3';
  let currentNotification = null;
  let autoCloseTimer = null;
  let isInitialized = false;

  // 样式管理
  function initStyles() {
    if (document.getElementById(STYLE_ID)) return;
    
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .yukang-notification {
        /* 保持原有样式 */
        animation: yukangSlideIn 0.3s ease-out;
      }
      /* 其他样式规则... */`;
    document.head.appendChild(style);
  }

  // 通知控制
  function showNotification(data) {
    cleanupNotification();
    
    const notification = document.createElement('div');
    notification.className = 'yukang-notification';
    notification.dataset.notificationId = data.id;
    notification.innerHTML = `
      <div class="header">
        <h3>${escapeHtml(data.title)}</h3>
        <button class="close-btn">×</button>
      </div>
      <div class="content">${escapeHtml(data.message)}</div>
      <div class="actions">
        <button class="retry">🔄 再来一轮</button>
        <button class="stop">⏹️ 结束专注</button>
      </div>`;

    // 事件绑定
    notification.querySelector('.close-btn').addEventListener('click', cleanupNotification);
    notification.querySelector('.retry').addEventListener('click', () => {
      chrome.runtime.sendMessage({ action: 'startFocus' });
      cleanupNotification();
    });
    notification.querySelector('.stop').addEventListener('click', () => {
      chrome.runtime.sendMessage({ action: 'pauseFocus' });
      cleanupNotification();
    });

    document.body.appendChild(notification);
    currentNotification = notification;
    autoCloseTimer = setTimeout(cleanupNotification, 30000);
  }

  function cleanupNotification() {
    if (currentNotification) {
      clearTimeout(autoCloseTimer);
      currentNotification.remove();
      currentNotification = null;
    }
  }

  // 安全处理
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // 初始化
  if (!isInitialized) {
    initStyles();
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'showNotification') {
        if (currentNotification?.dataset?.notificationId === message.data.id) {
          sendResponse({ status: 'duplicate' });
          return true;
        }
        showNotification(message.data);
        sendResponse({ status: 'success' });
      }
      return true;
    });
    isInitialized = true;
  }
})();
