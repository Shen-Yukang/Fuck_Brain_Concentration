# 🌸 Fuck Brain Concentration - 智能专注时间管理助手

<div align="center">

![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-yellow.svg)
![React](https://img.shields.io/badge/React-19.0.0-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.1-blue.svg)

*一个功能强大的Chrome扩展，帮助您保持专注，提高工作效率*

</div>

## 📖 项目简介

Fuck Brain Concentration 是一个现代化的Chrome浏览器扩展，专为提高工作和学习效率而设计。它结合了传统的番茄工作法与现代AI技术，为用户提供个性化的专注体验。

### 🎯 核心功能

- **🕐 智能专注计时器** - 可自定义的专注时间管理（1-120分钟）
- **🚫 网站屏蔽系统** - 完全屏蔽或学习模式的网站管理
- **🔊 多样化通知系统** - 声音提醒、TTS语音合成、AI生成个性化通知
- **🤖 AI智能助手** - 基于LLM的个性化休息提醒和鼓励
- **🎨 现代化界面** - 支持暗黑模式的响应式设计
- **⚙️ 高度可定制** - 丰富的个性化设置选项

## 🚀 快速开始

### 安装方法

#### 方法一：开发者模式安装（推荐）✅

1. **启用开发者模式**
   - 打开 [Chrome扩展管理页面](chrome://extensions/)
   - 右上角开启"开发者模式"

2. **加载扩展**
   - 点击"加载已解压的扩展程序"
   - 选择项目的 `dist` 文件夹

3. **固定扩展图标**
   - 点击Chrome工具栏的扩展图标
   - 找到"Fuck Brain Concentration"并点击固定

4. **开始使用**
   - 点击扩展图标打开设置面板
   - 配置您的专注时间和偏好设置

<details>
<summary>📸 安装步骤截图</summary>

**加载扩展包**
<img width="1464" alt="Load Extension" src="https://private-user-images.githubusercontent.com/160222653/438998601-2be2c314-4390-47ed-b5d5-ccdff7c60900.png" />

**启用扩展**
<img width="426" alt="Enable Extension" src="https://github.com/user-attachments/assets/4c72ae73-dc2d-4a8b-bc14-f80cea76108f" />

**固定扩展图标**
<img width="412" alt="Pin Extension" src="https://github.com/user-attachments/assets/f6dc817d-295a-4154-8189-c0b957e08136" />

**设置面板**
<img width="458" alt="Settings Panel" src="https://github.com/user-attachments/assets/e46fdc20-507f-4fb9-a369-0bb55eb260d7" />

**专注模式页面**
<img width="1467" alt="Focus Mode" src="https://github.com/user-attachments/assets/0c599ec3-11cc-4811-b13b-e0a4cb6e0ea7" />

</details>

#### 方法二：Chrome应用商店 ⌛️

> **注意**: 基于安全考虑，暂不计划发布到Chrome应用商店。我们坚持开源透明的原则，鼓励用户直接使用源码安装！

### 开发环境搭建

#### 系统要求

- **Node.js**: >= 22.12.0
- **包管理器**: pnpm 9.15.1
- **浏览器**: Chrome 109+ 或 Firefox 109+

#### 构建步骤

```bash
# 克隆项目
git clone <repository-url>
cd Fuck_Brain_Concentration

# 安装依赖
pnpm install

# 开发模式构建
pnpm dev

# 生产模式构建
pnpm build

# 打包扩展
pnpm zip
```

## 📋 功能详解

### 🕐 专注时间管理

- **灵活时间设置**: 支持1-120分钟的自定义专注时长
- **智能徽章显示**: 实时显示剩余专注时间，颜色随时间变化
- **自动状态管理**: 专注模式的启动、暂停、停止全自动化

### 🚫 网站屏蔽系统

#### 完全屏蔽模式
- 完全阻止访问指定网站
- 显示友好的提醒页面
- 支持域名和完整URL匹配

#### 学习模式
- 隐藏网站的干扰元素（如推荐、评论等）
- 保留核心学习内容
- 预设支持：百度、哔哩哔哩等热门网站
- 自定义CSS选择器支持

### 🔊 多样化通知系统

#### 声音通知
- 内置通知音效
- 可调节音量（0-100%）
- 测试播放功能

#### TTS语音合成
- 集成字节跳动TTS API
- 多种语音类型选择（男声/女声）
- 可调节语速（0.5x - 2.0x）
- 智能缓存机制，节省API调用

#### AI个性化通知
- 基于LLM生成个性化休息提醒
- 自定义系统提示词和用户模板
- 智能预生成，减少等待时间
- 温暖鼓励的语言风格

### 🤖 AI智能助手

#### 自定义Prompt功能
- **系统提示词**: 定义AI助手的角色和行为规范
- **用户模板**: 自定义通知生成的具体指令
- **占位符支持**: 支持 `{duration}` 等动态变量
- **智能回退**: 未配置时自动使用默认模板

#### 默认AI设置
- 友好积极的语言风格
- 简短有效的提醒内容（≤50字）
- 邻家女孩或可爱学妹口吻
- 包含休息建议和鼓励话语

### 🎨 用户界面

#### 现代化设计
- **响应式布局**: 适配不同屏幕尺寸
- **暗黑模式**: 护眼的深色主题
- **动画效果**: 平滑的过渡和交互反馈
- **直观操作**: 清晰的图标和标签

#### 设置面板
- **折叠式设计**: 节省空间，按需展开
- **实时预览**: 设置更改即时生效
- **导入导出**: 配置备份和恢复（规划中）

## 🛠️ 技术架构

### 前端技术栈

- **React 19.0.0**: 现代化的用户界面框架
- **TypeScript 5.8.1**: 类型安全的开发体验
- **Tailwind CSS**: 实用优先的CSS框架
- **Vite 6.1.0**: 快速的构建工具

### 扩展架构

- **Manifest V3**: 最新的Chrome扩展标准
- **Service Worker**: 后台脚本管理
- **Content Scripts**: 页面内容操作
- **Offscreen Documents**: 音频播放支持

### 存储系统

- **Chrome Storage API**: 配置数据持久化
- **实时同步**: 跨标签页状态同步
- **类型安全**: TypeScript接口定义

### 包管理

- **Monorepo架构**: 模块化的代码组织
- **Turbo**: 高效的构建系统
- **pnpm**: 快速的包管理器

## 📁 项目结构

```
Fuck_Brain_Concentration/
├── chrome-extension/          # Chrome扩展核心
│   ├── src/
│   │   ├── background/        # 后台脚本
│   │   ├── content/           # 内容脚本
│   │   └── constants/         # 常量定义
│   ├── public/                # 静态资源
│   └── manifest.ts            # 扩展清单
├── packages/                  # 共享包
│   ├── storage/               # 存储管理
│   ├── ui/                    # UI组件
│   ├── shared/                # 共享工具
│   └── ...
├── pages/                     # 页面组件
│   ├── popup/                 # 弹出页面
│   ├── content/               # 内容页面
│   └── ...
├── dist/                      # 构建输出
└── docs/                      # 文档文件
```

## 🔧 配置说明

### TTS语音合成配置

1. **获取API密钥**
   - 访问 [字节跳动语音开放平台](https://openspeech.bytedance.com/)
   - 注册账号并创建应用
   - 获取AppID和访问令牌

2. **配置步骤**
   - 在扩展设置中启用语音通知
   - 输入AppID和Token
   - 选择语音类型和语速
   - 测试语音合成功能

### AI助手配置

1. **基础设置**
   - 启用AI通知功能
   - 配置API密钥（如需要）
   - 设置预生成时间

2. **自定义Prompt**
   - 展开"提示词设置"面板
   - 编辑系统提示词和用户模板
   - 保存设置并测试效果

## 🚀 使用指南

### 基础使用流程

1. **设置专注时间**
   - 打开扩展弹窗
   - 设置专注时长（推荐25分钟）
   - 点击"开始专注"

2. **配置屏蔽网站**
   - 添加容易分心的网站
   - 选择屏蔽模式（完全屏蔽/学习模式）
   - 测试屏蔽效果

3. **个性化设置**
   - 配置通知方式（声音/TTS/AI）
   - 调整界面主题
   - 自定义AI提示词

### 高级功能

#### 学习模式网站配置

```javascript
// 自定义CSS选择器示例
{
  "baidu.com": [
    ".result-op",           // 隐藏推广内容
    "#content_right",       // 隐藏右侧广告
    ".c-recomm-wrap"        // 隐藏推荐内容
  ]
}
```

#### AI Prompt自定义示例

**系统提示词**:
```
你是一个温柔的学习伙伴，专门帮助用户在专注学习后放松休息。
你的回复应该：
1. 简短温暖（不超过50字）
2. 充满鼓励和关怀
3. 建议合适的休息活动
4. 使用亲切自然的语气
```

**用户模板**:
```
用户刚完成{duration}分钟的专注学习，现在是{当前时间}。
请生成一条温暖的休息提醒，要体现出对用户努力的认可，
并建议适合的休息方式。语气要像关心的朋友一样自然亲切。
```

## 📈 更新历史

### v1.2.0 (2025-06-05) 🎉
- **重大更新**: 全面重构，更稳定的功能和交互
- **新增**: TTS语音合成功能
- **新增**: AI个性化通知系统
- **新增**: 自定义Prompt功能
- **优化**: 用户界面和交互体验
- **修复**: 多项稳定性问题

### v1.0.0 (2025-02-21)
- **修复**: 严重bug修复
- **优化**: 通知体验提升
- **改进**: 界面响应性

### v0.0.1 (2025-02-05) 🌱
- **首次发布**: 基础专注时间管理功能
- **核心功能**: 网站屏蔽、时间计时、通知提醒

## 🤝 贡献指南

我们欢迎社区贡献！请遵循以下步骤：

1. **Fork项目** 并创建功能分支
2. **编写代码** 并确保通过测试
3. **提交PR** 并详细描述更改内容
4. **代码审查** 通过后将合并到主分支

### 开发规范

- 使用TypeScript进行类型安全开发
- 遵循ESLint和Prettier代码规范
- 编写单元测试覆盖新功能
- 更新相关文档

## 📄 许可证

本项目采用 [MIT License](LICENSE) 开源协议。

## 🙏 致谢

- [Chrome Extension Boilerplate](https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite) - 项目脚手架
- [字节跳动TTS](https://openspeech.bytedance.com/) - 语音合成服务
- 所有贡献者和用户的支持

## 💝 支持项目

如果这个项目对您有帮助，欢迎：

- ⭐ 给项目点个Star
- 🐛 报告Bug和建议
- 🔀 提交Pull Request
- 📢 推荐给朋友使用

> **开源承诺**: 本项目承诺永久开源免费，坚持透明开发的初心！ ✅🍃🎉

---

<div align="center">

**不思善，不思恶，正与么时，哪个是明上座本来面目** 🧘‍♂️

*专注当下，活在此刻*

</div>
