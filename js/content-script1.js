/*
 * @Author: your name
 * @Date: 2022-03-21 10:48:52
 * @LastEditTime: 2022-03-29 16:29:19
 * @LastEditors: shenyukang
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /ad-mask/js/content-script1.js
 */

console.log("哈哈哈哈-test")



function core () {
	zhiHuADDomList = document.getElementsByClassName("Banner-link");

	// baidu
	baiduADDomMainPage = document.getElementById("s_main");
	baiduADDomSearchRightPage = document.getElementById("content_right");
	console.log("哈哈哈哈-hideElements",zhiHuADDomList,baiduADDomMainPage,baiduADDomSearchRightPage)

	if (!!baiduADDomMainPage && baiduADDomMainPage.style.display !== "none") {
		baiduADDomMainPage.style.display = "none"
	}
	if (!!baiduADDomSearchRightPage && baiduADDomSearchRightPage.style.display !== "none") {
		baiduADDomSearchRightPage.style.display = "none"
	}
}

(function(history){
	const pushState = history.pushState;
	const replaceState = history.replaceState;
	
	history.pushState = function(state) {
		const result = pushState.apply(history, arguments);
		window.dispatchEvent(new Event('pushstate'));
		return result;
	};
	
	history.replaceState = function(state) {
		const result = replaceState.apply(history, arguments);
		window.dispatchEvent(new Event('replacestate'));
		return result;
	};
	
	window.addEventListener('pushstate', () => {
		console.log("pushstate");
		core();
	});

	window.addEventListener('replacestate', () => {
		console.log("replacestate");
		core();
	});

})(window.history);


  document.addEventListener('DOMContentLoaded', () => {
		//  zhihu
		console.log("监听了DOMContentLoaded");

		core()

	// chrome.runtime.sendMessage({message: "DOM_loaded"});
  });

  window.addEventListener('popstate', function(event) {
	// 执行内容脚本
	console.log("popstate")
	core()
	chrome.runtime.sendMessage({message: "popstate"});
  });
