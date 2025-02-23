document.getElementById("closeButton").addEventListener("click", function() {
    // 如果浏览器历史记录中有页面则返回上一级，否则尝试关闭当前窗口
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.close();
    }
});