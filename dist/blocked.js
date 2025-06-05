// 获取被阻止的URL
function getBlockedUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const blockedUrl = urlParams.get('url');
  if (blockedUrl) {
    document.getElementById('blockedUrl').textContent = decodeURIComponent(blockedUrl);
  } else {
    document.getElementById('blockedUrl').textContent = '未知网站';
  }
}

// 返回上一页
function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.close();
  }
}

// 打开设置页面
function openSettings() {
  chrome.runtime.sendMessage({
    type: 'OPEN_SETTINGS',
  });
}

// 页面加载时执行
document.addEventListener('DOMContentLoaded', function () {
  getBlockedUrl();

  // 添加事件监听器
  document.getElementById('goBackBtn').addEventListener('click', function (e) {
    e.preventDefault();
    goBack();
  });

  document.getElementById('openSettingsBtn').addEventListener('click', function (e) {
    e.preventDefault();
    openSettings();
  });
});
