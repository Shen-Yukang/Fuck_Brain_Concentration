/**
 * background.js
 * @author shenyukang
 * @contributor [shenyukang、]
 * @description 插件常驻 main worker脚本
 * 
 */


let remainingTime = 0; // 剩余时间（秒）
let intervalId = null; // 全局timer object，做为索引标记对象，处理和重置操作
let isAsyncProcessing = false; // 初始化专注周期结束后的异步操作进程为 false，专门给 handleFocusEnd函数设计！
const dynamicMessageList =[
  "专注冲刺一小时，起身拉伸护腰椎",
  "还不去休息会儿？别太累了，记得劳逸结合",
  "记得很多成果建立在伟人的肩膀上，继续学习！", 
  "多起来走动喝喝茶，不要和自己的腰过意不去",
  "久坐易伤腰，定时活动效率高。",
  "专注间隙走两步，腰背轻松干劲足。",
  "全神贯注后，记得挺胸深呼吸!",
  "乖宝，记得按时休息哦❤️",
  "俗话说得好，上善若水, 所以快起来走动一下",
  "前面没有路？我偏要踏出一条路！",
  "什么这个那个，全是[空]，所以不要太过计较"
]; // 静态的通知鼓励话术，后面可以用情感类的DeepSearch工具接入，让话术更有“温度”和“时域”。

let lastDuration = 0; // 当前本地存储上次的专注时间，方便重新开始


// 初始化存储，清空“blockedSites”旧缓存，一般在重新加载此插件（需要更新时）会清空之前的数据
chrome.storage.local.get(['blockedSites','dynamicRuleId'], (data) => {
  console.log("dynamicRuleId",data)
  if (!data.blockedSites) chrome.storage.local.set({ blockedSites: [] });
  if (!data.dynamicRuleId) chrome.storage.local.set({ dynamicRuleId: 1000 });
});


/** ② “专注”倒计时 核心处理逻辑—————————————————————————————————————————————————————— */
// 启动倒计时
function startCountdown(minutes) {
  if (intervalId) {  // 防止重复启动
    clearInterval(intervalId);
    intervalId = null;
  }
  lastDuration = minutes // 存储更新上次专注时长
  // chrome.storage.local.set({ lastDuration: minutes }, () => {
  //   console.log('保存专注时长:', minutes); // 全局存储 lastDuration，未来有用~
  // });
  chrome.storage.local.set({isFocusActive: true})// 全局存储标注是否开启了专注模式，用于 popup 页面控制按钮输入操作
  remainingTime = minutes * 60; // min -> second

  updateBadge();
  intervalId = setInterval(() => {
    remainingTime--;
    if (remainingTime <= 0) {
      handleFocusEnd();
    } else {
      updateBadge();
    }
  }, 1000);
}

// 更新徽章
function updateBadge() {
  const totalSeconds = remainingTime;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // 智能显示策略（确保最多4字符）
  let displayText;
  if (hours >= 1) {
    // 处理小时级显示
    const totalMinutes = Math.floor(totalSeconds / 60);
    if (totalMinutes >= 120) { // 2小时以上显示 "3h"
      displayText = `${hours}h`;
    } else { // 1-2小时显示 "90m"（用分钟更直观）
      displayText = `${totalMinutes}m`;
    }
  } else if (minutes >= 10) {
    // 显示分钟级 "25m"
    displayText = `${minutes}m`;
  } else if (minutes >= 1) {
    // 显示分钟:秒 "9:59"
    displayText = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  } else {
    // 最后1分钟显示秒数 "59s"
    displayText = `${seconds}s`;
  }

  // 动态颜色（绿→黄→红渐变）
  const hue = Math.min(remainingTime * 0.5, 120); // 时间越少越红
  chrome.action.setBadgeBackgroundColor({ color: `hsl(${hue}, 100%, 40%)` });
  
  chrome.action.setBadgeText({ text: displayText });

}


// 处理“专注”结束时的 一些异步动作（notification 、 重置存储一些状态...）
function handleFocusEnd() {
  if (isAsyncProcessing) return; // 如果在进程中，防止重复操作
  isAsyncProcessing = true;
  
  resetData(); // 重置数据，计时器

  try {
    // TODO  系统通知 + 自定义js通知 可以灵活选择 —— 设置里面增加选择通知类型！
    /**
     * prerequisite !!!
     * need you open three layers premission 
     *  1. ``permissions`` of mainfest.json 
     *  2. ``notification`` of Chrome Setting 
     *  3. needs to authorize the current browser (chrome) to notify you
     *  */ 
   chrome.notifications.create("focusEndNotification",{
      type: "basic",
      iconUrl: 'images/spring-128.png',
      title: '休息一下😌☕️',
      message: `你专注了${lastDuration}min。👍你真棒(•̤̀ᵕ•̤́๑)و✧ \n${dynamicMessageList[Math.floor(Math.random() * (dynamicMessageList.length))]}`, // TODO 建议搞成随机动态，最好每次不重样，或者每天不重样、或者半天不重样
      buttons: [
        { title: "再来一轮" }, 
        { title: "关闭" }
      ],
      requireInteraction: true // 保持通知可见直到用户操作
    });
    updateBlockRules(false); // 结束专注，休息时解除网站重定向
  } catch (error) {
    console.error("最终发送失败:", error);
  }  finally {
    isAsyncProcessing = false; // 完整的“专注”周期结束
  }
}

// 全局通用重置函数
async function resetData() {
  chrome.storage.local.set({isFocusActive: false})// 全局存储标注是否开启了专注模式，用于 popup 页面控制按钮输入操作
  clearInterval(intervalId);
  intervalId = null
  remainingTime = 0;
  await chrome.action.setBadgeText({ text: '' });
}
/** “专注”倒计时 核心处理逻辑—————————————————————————————————————————————————————— */


/** ③ “禁用网页” 规则设置更新逻辑—————————————————————————————————————————————————————— */
// 更新专注禁用规则
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

  const { blockedSites = [] } = await chrome.storage.local.get('blockedSites'); // 获取之前系统缓存的blockSites  
  const { dynamicRuleId } = await chrome.storage.local.get('dynamicRuleId'); // 获取之前系统缓存的blockSites

  // 删除旧规则
  const oldRules = await chrome.declarativeNetRequest.getDynamicRules();
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: oldRules.map(rule => rule.id)
  });

  // 创建新规则
  const newRules = blockedSites.map((domain, index) => ({
    id: dynamicRuleId + index,
    priority: 1,
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
/** “禁用网页” 规则设置更新逻辑—————————————————————————————————————————————————————— */


// 全局统一的消息监听器
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.action) {
     case "addSite": // ----- 添加禁用网页 -----
      chrome.storage.local.get(['blockedSites','dynamicRuleId'], (data) => {
        const blockedSites = [...new Set([...(data.blockedSites || []), request.domain])]; // Set 防止重复domain

       
        chrome.storage.local.set({ blockedSites, dynamicRuleId: data.dynamicRuleId + blockedSites.length }, () => {
          updateBlockRules().then(() => sendResponse({ status: "success" }));
        }); // 更新本地缓存
      });
      return true; // 保持异步响应
    
    case "removeSite": // ----- 移除禁用网页 -----
      chrome.storage.local.get(['blockedSites'], (data) => {
        const blockedSites = (data.blockedSites || []).filter(d => d !== request.domain);
        chrome.storage.local.set({ blockedSites }, () => {
          updateBlockRules().then(() => sendResponse({ status: "success" }));
        }); // 更新本地缓存
      });
      return true; // 保持异步响应

    case "startFocus": // ----- 开始专注 -----
      const minutes = parseFloat(request.minutes);
      if (isNaN(minutes) || minutes <= 0) {
        sendResponse({ status: "invalid_timer_input" });
        return;
      }
      updateBlockRules(true); // 更新启用禁用规则
      startCountdown(minutes); // 开启倒计时
      return true; // 保持异步响应

    case "pauseFocus": // ----- 取消专注 -----
      resetData(); // 重置操作
      updateBlockRules(false);
      return true; // 保持异步响应

    default:
      console.log(Error(`未 catch 的 error， ${request.action}`))
      sendResponse({ status: "unknown_action" });
  }
  return true;
});

// 系统notification option button list 监听事件
chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
  if (notificationId === 'focusEndNotification') {
    if (buttonIndex === 0) { // "再来一轮"按钮
      if (lastDuration) {
        updateBlockRules(true);
        startCountdown(lastDuration);
        
        // 添加视觉反馈
        chrome.action.setBadgeBackgroundColor({ color: '#4CAF50' });
        setTimeout(() => {
          chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });
        }, 300);
      }
    } 
    chrome.notifications.clear(notificationId); // 关闭通知
  }
});
