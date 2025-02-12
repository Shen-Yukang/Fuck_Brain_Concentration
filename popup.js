
// 新增域名验证函数
function isValidDomain(domain) {
  return /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/.test(domain);
}

// 修改初始加载逻辑
document.addEventListener('DOMContentLoaded', () => {
  // 初始化屏蔽列表 ✅ 新增这行
  loadBlockedList();
  // 绑定按钮事件
  document.getElementById("pauseFocus").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "pauseFocus" });
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

});

// 修改dom结构动态渲染block site list
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

  // 绑定删除事件
  document.querySelectorAll(".remove-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
          const siteToRemove = e.target.dataset.site;
          chrome.runtime.sendMessage(
              { action: "removeSite", domain: siteToRemove },
              (response) => {
                  if (chrome.runtime.lastError) {
                      console.error(chrome.runtime.lastError);
                      return;
                  }
                  // 重新加载列表
                  loadBlockedList();
              }
          );
      });
  });
}

// 新增函数：从存储加载屏蔽列表
function loadBlockedList() {
  chrome.storage.local.get(["blockedSites"], (data) => {
      const blockedSites = data.blockedSites || [];
      renderBlockedList(blockedSites);
  });
}

// 开始专注按钮逻辑
document.getElementById("startFocus").addEventListener("click", () => {
  const minutes = parseFloat(document.getElementById("focusTime").value);
  if (isNaN(minutes) || minutes <= 0) {
    alert("请输入有效的正数分钟！");
    return;
  }
  chrome.runtime.sendMessage({ action: "startFocus", minutes });
});
