# 通知声音功能说明

## 功能概述

为Chrome插件添加了通知声音提醒功能，当专注模式开始或结束时会播放提示音。

## 新增功能

### 1. 声音设置存储 (soundSettings.ts)
- 新增声音设置配置存储
- 支持启用/禁用声音
- 支持音量调节 (0-1)
- 默认启用声音，音量50%

### 2. 声音设置UI组件 (SoundSettings.tsx)
- 声音开关切换
- 音量滑块调节
- 测试声音按钮
- 响应式设计，支持暗黑模式

### 3. 背景脚本音频播放 (background/index.ts)
- 在专注模式开始时播放提示音
- 在专注模式结束时播放提示音
- 根据用户设置控制音量
- 支持禁用声音功能

### 4. 音频文件
- 添加了notification.mp3音频文件
- 在manifest.json中配置为web_accessible_resources
- 使用友好的铃声作为提示音

## 使用方法

1. **打开插件popup页面**
2. **在"声音设置"部分：**
   - 使用开关启用/禁用通知声音
   - 拖动滑块调节音量 (0-100%)
   - 点击"测试声音"按钮试听效果

3. **专注模式中的声音提醒：**
   - 启动专注模式时播放提示音
   - 专注时间结束时播放提示音
   - 音量根据设置自动调节

## 技术实现

### 存储结构
```typescript
type SoundSettings = {
  enabled: boolean; // 是否启用通知声音
  volume: number;   // 音量 (0-1)
};
```

### 音频播放逻辑
```typescript
async function playNotificationSound() {
  const soundSettings = await soundSettingsStorage.get();
  if (!soundSettings.enabled) return;

  // 使用offscreen document来播放音频
  await ensureOffscreenDocument();

  const response = await chrome.runtime.sendMessage({
    type: 'PLAY_NOTIFICATION_SOUND',
    volume: soundSettings.volume,
    audioUrl: chrome.runtime.getURL('notification.mp3')
  });
}
```

### UI组件特性
- 响应式设计
- 暗黑模式支持
- 实时音量预览
- 测试播放功能

## 文件修改清单

### 新增文件
- `packages/storage/lib/impl/soundSettings.ts` - 声音设置存储
- `packages/ui/lib/components/SoundSettings.tsx` - 声音设置UI组件
- `chrome-extension/public/notification.mp3` - 通知音频文件
- `chrome-extension/public/offscreen.html` - 离屏文档HTML
- `chrome-extension/public/offscreen.js` - 离屏文档音频播放脚本

### 修改文件
- `packages/storage/lib/impl/index.ts` - 导出声音设置存储
- `packages/ui/lib/components/index.ts` - 导出声音设置组件
- `chrome-extension/src/background/index.ts` - 添加音频播放功能和offscreen document管理
- `pages/popup/src/Popup.tsx` - 添加声音设置组件
- `chrome-extension/manifest.ts` - 添加offscreen权限和音频文件配置

## 注意事项

1. **浏览器权限**: 使用offscreen API需要Chrome 109+版本支持
2. **音频格式**: 使用MP3格式确保浏览器兼容性
3. **音量控制**: 音量范围为0-1，UI显示为0-100%
4. **错误处理**: 音频播放失败时会在控制台记录错误
5. **性能**: 音频文件大小约97KB，不会显著影响插件性能
6. **架构**: 使用offscreen document解决background script中Audio API不可用的问题

## 测试建议

1. 测试声音开关功能
2. 测试音量调节功能
3. 测试专注模式开始/结束时的声音播放
4. 测试在不同浏览器中的兼容性
5. 测试暗黑模式下的UI显示
