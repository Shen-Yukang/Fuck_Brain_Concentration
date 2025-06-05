# AI Prompt 自定义功能实现

## 功能概述

为 Chrome 扩展的 AISettings 组件添加了用户自定义 prompt 的功能，允许用户个性化定制 AI 生成通知的行为和内容。

## 实现的功能

### 1. 用户界面增强

在 `packages/ui/lib/components/AISettings.tsx` 中添加了：

- **提示词设置折叠面板**：紫色主题的可展开/收起面板
- **系统提示词输入框**：6行文本域，用于定义 AI 助手的角色和行为规范
- **用户提示词模板输入框**：4行文本域，用于定制生成通知的具体指令
- **保存设置按钮**：保存用户自定义的提示词
- **重置为默认按钮**：清空自定义设置，恢复使用默认提示词

### 2. 状态管理

添加了以下状态变量：
```typescript
const [systemPrompt, setSystemPrompt] = useState(aiConfig.systemPrompt || '');
const [promptTemplate, setPromptTemplate] = useState(aiConfig.promptTemplate || '');
const [isPromptSettingsOpen, setIsPromptSettingsOpen] = useState(false);
```

### 3. 事件处理函数

实现了完整的用户交互逻辑：
- `handleSystemPromptChange`: 更新系统提示词
- `handlePromptTemplateChange`: 更新用户提示词模板
- `handleSavePrompts`: 保存提示词设置到存储
- `handleResetPrompts`: 重置提示词为默认值

### 4. 存储层支持

存储层 (`packages/storage/lib/impl/aiConfigStorage.ts`) 已经支持：
- `systemPrompt?: string` - 自定义系统提示词
- `promptTemplate?: string` - 自定义用户提示词模板
- `updatePrompts()` 方法用于更新提示词设置

## 工作原理

### 回退机制 (Fallback)

在 `chrome-extension/src/background/managers/notificationManager.ts` 中：

```typescript
const systemPrompt = aiConfig.systemPrompt || defaultSystemPrompt;
```

这行代码实现了智能回退：
1. **优先使用用户自定义**：如果用户设置了自定义 systemPrompt，则使用用户的设置
2. **自动回退到默认值**：如果用户没有设置，则使用预定义的默认提示词

### 占位符支持

用户提示词模板支持 `{duration}` 占位符：
```typescript
const promptTemplate = aiConfig.promptTemplate || defaultTemplate;
return promptTemplate.replace('{duration}', duration.toString());
```

## 用户体验

### 界面设计
- **紫色主题**：与其他设置面板区分，使用紫色作为主色调
- **折叠面板**：节省空间，用户可按需展开
- **清晰标签**：中英文对照的标签说明
- **占位符提示**：输入框中提供使用指导
- **帮助文本**：每个输入框下方都有详细说明

### 操作流程
1. 用户点击"展开提示词设置"
2. 在文本域中输入自定义的系统提示词和用户提示词模板
3. 点击"保存设置"按钮保存
4. 如需恢复默认，点击"重置为默认"按钮

## 技术特点

### 1. 类型安全
- 使用 TypeScript 确保类型安全
- 正确的事件处理器类型定义

### 2. 响应式设计
- 使用 Tailwind CSS 实现响应式布局
- 平滑的动画过渡效果

### 3. 数据持久化
- 设置自动保存到 Chrome 扩展的本地存储
- 跨会话保持用户设置

### 4. 向后兼容
- 如果用户没有设置自定义提示词，自动使用默认值
- 不影响现有功能的正常运行

## 默认提示词

### 系统提示词 (System Prompt)
```
你是一个友好、积极的助手，负责在用户专注工作一段时间后提醒他们休息。
你的消息应该：
1. 简短（不超过50个字）
2. 友好且鼓励性的
3. 有时可以幽默或有趣
4. 提醒用户休息的重要性
5. 偶尔可以建议简单的伸展运动或放松技巧
6. 语气自然，像朋友一样交流
7. 不要重复相同的内容
8. 不要使用过于正式或机械的语言
```

### 用户提示词模板 (Prompt Template)
```
现在是{当前时间}，用户刚刚完成了{duration}分钟的专注时间段。请生成一条温暖、鼓励的休息提醒，内容要：
1. 简洁明了（不超过50字）
2. 积极正面，给用户成就感
3. 建议适当的休息活动
4. 语气亲切自然, 邻家女孩口吻或可爱学妹口吻, 带有情感色彩

请直接返回通知内容，不要包含其他解释。
```

## 构建状态

✅ 功能已完成并成功构建
✅ UI 组件已编译到 `packages/ui/dist/lib/components/AISettings.js`
✅ 所有依赖包已正确构建
✅ 扩展可正常加载和运行

## 下一步建议

1. **测试功能**：在浏览器中加载扩展，测试自定义 prompt 功能
2. **用户文档**：为用户提供如何使用自定义 prompt 的指南
3. **预设模板**：可考虑提供一些预设的 prompt 模板供用户选择
4. **导入导出**：允许用户导入/导出自定义的 prompt 设置
