let remainingTime = 0; // 剩余时间（秒）
let intervalId = null; //全局倒计时对象，标记
let dynamicRuleId = 1000; // 动态规则ID起始值

// 初始化存储
chrome.storage.local.get(['blockedSites'], (data) => {
  if (!data.blockedSites) chrome.storage.local.set({ blockedSites: [] });
});

// 启动倒计时
function startCountdown(minutes) {
  remainingTime = minutes * 60;
  updateBadge();
  intervalId = setInterval(() => {
    remainingTime--;
    if (remainingTime <= 0) {
      clearInterval(intervalId);
      handleFocusEnd();
    } else {
      updateBadge();
    }
  }, 1000);
}

// 更新徽章
function updateBadge() {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  chrome.action.setBadgeText({
    text: `${minutes}:${seconds.toString().padStart(2, '0')}`
  });
}

// 专注结束处理
function handleFocusEnd() {
  /**
   * prerequisite !!!
   * need you open three layers premission 
   *  1. ``permissions`` of mainfest.json 
   *  2. ``notification`` of Chrome Setting 
   *  3. needs to authorize the current browser (chrome) to notify you
   *  */ 
  chrome.notifications.create({
    type: "basic",
    iconUrl: 'images/spring-16.png',
    title: 'Sky-Mask 专注结束',
    message: '该休息啦！',
    buttons: [
      { title: "再来一轮" }, 
      { title: "关闭" }
    ],
    requireInteraction: true // 保持通知可见直到用户操作
  });

  console.log("该休息啦！");
  chrome.action.setBadgeText({ text: '' });
 
  updateBlockRules(false); // 结束专注，休息时解除网站重定向
}


// 更新动态规则
async function updateBlockRules(block) {

  // 如果 block 为 false，则撤销屏蔽规则（删除当前所有动态规则）
  if (!block) {
    const oldRules = await chrome.declarativeNetRequest.getDynamicRules();
    if (oldRules.length > 0) {
      await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: oldRules.map(rule => rule.id)
      });
    }
    return;
  }

  const { blockedSites = [] } = await chrome.storage.local.get('blockedSites');
  
  // 删除旧规则
  const oldRules = await chrome.declarativeNetRequest.getDynamicRules();
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: oldRules.map(rule => rule.id)
  });

  // 创建新规则
  const newRules = blockedSites.map((domain, index) => ({
    id: dynamicRuleId + index,
    priority: 1,
    // action: { type: "block" },
    action: { 
      type: "redirect", // 可以更灵活反馈页面展示
      redirect: {
        url: chrome.runtime.getURL(`blocked.html?url=${encodeURIComponent(domain)}`)
      }
    },
    condition: {
      urlFilter: `||${domain.replace(/^www\./, '')}`,
      resourceTypes: ["main_frame"]
    }
  }));

  await chrome.declarativeNetRequest.updateDynamicRules({
    addRules: newRules
  });
}


// 统一消息监听器
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.action) {
     case "addSite":
      chrome.storage.local.get(['blockedSites'], (data) => {
        const blockedSites = [...new Set([...(data.blockedSites || []), request.domain])];
        chrome.storage.local.set({ blockedSites }, () => {
          updateBlockRules().then(() => sendResponse({ status: "success" }));
        });
      });
      return true; // 保持异步响应
    
    case "removeSite":
      chrome.storage.local.get(['blockedSites'], (data) => {
        const blockedSites = (data.blockedSites || []).filter(d => d !== request.domain);
        chrome.storage.local.set({ blockedSites }, () => {
          updateBlockRules().then(() => sendResponse({ status: "success" }));
        });
      });
      return true; // 保持异步响应

    case "getRemainingTime":
      sendResponse({ time: remainingTime });
      break;
    case "startFocus":
      const minutes = parseFloat(request.minutes);
      if (isNaN(minutes) || minutes <= 0) {
        sendResponse({ status: "invalid_input" });
        return;
      }
      updateBlockRules(true)
      startCountdown(minutes);
      break;
    case "pauseFocus":
      clearInterval(intervalId);
      chrome.action.setBadgeText({ text: '' });
      updateBlockRules(false)
      break;
    default:
      sendResponse({ status: "unknown_action" });
  }
  return true;
});
