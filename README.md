# 专注时间管理功能使用说明

### 使用方法

- **Method 1** ✅
先在[Google Chrome Manage Extensions](chrome://extensions/)中右上角打开开发者模式，然后左上角Load Unpacked 调出系统文件夹选择当前项目文件夹即可加载使用。
    
    ######  具体步骤如下：
    -  **Load plugin raw package**
    <img width="1464" alt="Image" src="https://private-user-images.githubusercontent.com/160222653/438998601-2be2c314-4390-47ed-b5d5-ccdff7c60900.png" />

    - **Enable plugin**
    <img width="426" alt="Image" src="https://github.com/user-attachments/assets/4c72ae73-dc2d-4a8b-bc14-f80cea76108f" />

    - **Pin this plugin icon (as an entrance of interaction)**
    <img width="412" alt="Image" src="https://github.com/user-attachments/assets/f6dc817d-295a-4154-8189-c0b957e08136" />

    - **Click plugin icon, you will see the popup of setting panel.**
    
        Explore and enjoy your journey! 🍻
    <img width="458" alt="Image" src="https://github.com/user-attachments/assets/e46fdc20-507f-4fb9-a369-0bb55eb260d7" />

    - **Redirect page while on concentration period**
    <img width="1467" alt="Image" src="https://github.com/user-attachments/assets/0c599ec3-11cc-4811-b13b-e0a4cb6e0ea7" />


- **OR Method 2** ⌛️
    - [ ] 打包发布Chrome Extension Store ( **暂时不打算...** )
    基于可能存在的对“打包后的黑盒Plugin”的安全顾虑，短期内没打算，真诚的希望大家直接源码自己加载部署！所看即所得！


### TODO List
- [x] badge专注倒计时
    - [x] 智能化badge倒计时（防止2h 以上超出系统Icon badge宽度不够显示被截断问题）
    - [x] 颜色区分，增加对时间流逝感知

- [x] 优化的notification
    - [x] 支持系统级通知
    - [x] 自定义toastify(基于Toastify.js 做的内嵌tab page)
    - [ ] 优化交互动效，让提醒也具有情绪价值，鼓励你的同时，关心你的休息～
- [x] block sites
    - [x] 管理专注时警用网站
- [x] dynamic notification content
    - [x] hard-code dynamic message list
    - [x] 接入LLM做一些奇妙的东西(拟人化方式)
        - [ ] ideas.... (欢迎讨论)

- [x] 拓展一些助手需求 (Brainstorm ，这会是十分精彩的！) 安排中
    - [ ] 语音助手
    - [ ] 图片生成
    - [ ] MCP 集成
  
- [ ] 打包发布⌛️
    暂时不考虑... 但是将来如果有好的方案解决安全顾虑问题，可以尝试！

- [ ] sponsor文档 
``鉴于付出的精力，后续期望开通 sponsor 渠道，用户可以酌情捐赠，利于促进积极性，优化体验``
``当然不是强制性的。✅🍃**这个项目承诺坚持开源免费初心**✅🍃🎉``
    - [ ] 捐助收款码
    - [ ] 合法性安全的捐款渠道

- [ ] Cooperation Template（issue、md、...）
    规范合作和小伙伴贡献的模板 和 要求

- [ ] fix bugs...
        是的，没完没了的 bug... 
  


### Update History

- 04/29/2025 Tuesday ⛅️☀️ （**我** 🎉 —— version 1.1.0, 彻底改头还面了，更稳健的功能和交互！）
- 02/21/2025 Friday ☀️ (**我**的一些严重bug被修改、提升notification体验)
- 02/05/2025 Wednesday ⛅️ （**我**诞生了🎉 —— version 0.0.1）

**我**: 不思善，不思恶，正与么时，哪个是明上座本来面目

### Reference
[Chrome-extension-boilerplate-react-vite](https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite) 👈 更多高级配置定制参考