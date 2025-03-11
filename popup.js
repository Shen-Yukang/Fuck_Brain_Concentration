/**
 * popup.js
 * @author shenyukang
 * @contributor [shenyukang、]
 * @description 插件设置面板的html的 js脚本，空置按钮和输入事件、监听 background.js通信事件
 * 
 */


// 新增域名验证函数
function isValidDomain(domain) {
  return /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/.test(domain);
}

// 修改初始加载逻辑
document.addEventListener('DOMContentLoaded', () => {
  // 防止在开启了专注后，反复添加开启新的专注，从 ui 层面控制用户操作按钮和 input 输入
  updateControls();

  // 初始化屏蔽列表 ✅ 新增这行
  loadBlockedList(); // 这里挂在了block domain list dom elements

  // pauseFocus 按钮监听
  document.getElementById("pauseFocus").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "pauseFocus" });
  });


  // 开始专注 按钮监听
  document.getElementById("startFocus").addEventListener("click", () => {
    const minutes = parseFloat(document.getElementById("focusTime").value);

    if (isNaN(minutes) || minutes <= 0) {
      alert("请输入有效的正数分钟！");
      return;
    }
    chrome.runtime.sendMessage({ action: "startFocus", minutes });
    
    document.getElementById("startFocus").disabled = true;
    chrome.runtime.sendMessage({ action: "startFocus", minutes });
  });


  // popup.js 修改添加网站部分
  document.getElementById("addSite").addEventListener("click", () => {
    const domain = document.getElementById("newSite").value.trim().toLowerCase();
    if (!domain || !isValidDomain(domain)) {
      alert("请输入有效域名（如：example.com）");
      return;
    }

    chrome.runtime.sendMessage({ action: "addSite", domain }, (response) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        return;
      }
      loadBlockedList(); // 统一使用列表加载
      document.getElementById("newSite").value = "";
    });
  });

     // 绑定删除事件 （事件委托）
  document.getElementById("blockedList").addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const siteToRemove = e.target.dataset.site;
      chrome.runtime.sendMessage(
        { action: "removeSite", domain: siteToRemove },
        (response) => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            return;
          }
          loadBlockedList();
        }
      );
    }
  });
//    // 绑定删除事件
//    document.querySelectorAll(".remove-btn").forEach((btn) => {
//     console.log("点击了")
//     btn.addEventListener("click", (e) => {
//         const siteToRemove = e.target.dataset.site;
//         chrome.runtime.sendMessage(
//             { action: "removeSite", domain: siteToRemove },
//             (response) => {
//                 if (chrome.runtime.lastError) {
//                     console.error(chrome.runtime.lastError);
//                     return;
//                 }
//                 // 重新加载列表
//                 loadBlockedList();
//             }
//         );
//     });
// });

});


// 加载屏蔽域列表，并渲染
function loadBlockedList() {
  chrome.storage.local.get(["blockedSites"], (data) => {
      const blockedSites = data.blockedSites || [];
      renderBlockedList(blockedSites);
  });
}

// 控件状态管理函数（UI）
function updateControls() {
  chrome.storage.local.get(['isFocusActive'], (data) => {
    const isActive = data.isFocusActive || false;
    document.getElementById("startFocus").disabled = isActive;
    document.getElementById("pauseFocus").disabled = !isActive;
    document.getElementById("focusTime").disabled = isActive;
  });
}

// 监听存储变化， 改变按钮和 input 的可操作状态 （UI）
chrome.storage.onChanged.addListener((changes) => {
  updateControls();
});

// 动态渲染 blockSite list
function renderBlockedList(blockedSites) {
  const listContainer = document.getElementById("blockedList");
  listContainer.innerHTML = ""; // 清空旧内容
  
  blockedSites.forEach((site) => {
      const item = document.createElement("div");
      item.className = "site-item";
      item.innerHTML = `
          <span>${site}</span>
          <span class="remove-btn" data-site="${site}">×</span>
      `;
      listContainer.appendChild(item);
  });
 
}


