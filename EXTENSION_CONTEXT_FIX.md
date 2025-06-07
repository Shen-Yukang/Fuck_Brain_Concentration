# Extension Context Invalidated 错误修复

## 🐛 问题描述

在扩展重新加载后，出现了 "Extension context invalidated" 错误，具体表现为：

```
Uncaught (in promise) Error: Extension context invalidated.
Context: https://www.xiaohongshu.com/notification
Stack Trace: content-runtime/index.iife.js:329
```

这个错误通常发生在：
1. 扩展重新加载后，旧的content script还在运行
2. 旧的content script尝试与已经失效的扩展上下文通信
3. React组件尝试渲染但扩展API不可用

## 🔧 修复方案

### 1. 在Root.tsx中添加扩展上下文检查

**修复位置：** `pages/content-runtime/src/Root.tsx`

```typescript
export function mount() {
  // Check if extension context is valid before mounting
  try {
    if (!chrome?.runtime?.id) {
      console.warn('Extension context invalidated, skipping mount');
      return;
    }
  } catch (error) {
    console.warn('Extension context check failed, skipping mount:', error);
    return;
  }
  
  // ... rest of mount logic
  
  try {
    createRoot(rootIntoShadow).render(<App />);
  } catch (error) {
    console.error('Error rendering React app:', error);
    // If rendering fails due to extension context invalidation, clean up
    if (error instanceof Error && error.message.includes('Extension context invalidated')) {
      root.remove();
    }
  }
}
```

### 2. 在CharacterManager中添加Chrome API检查

**修复位置：** `pages/content-runtime/src/characterManager.ts`

```typescript
private setupFocusModeListener(): void {
  try {
    // Check if chrome.storage is available (extension context is valid)
    if (!chrome?.storage?.onChanged) {
      console.warn('Chrome storage API not available, skipping focus mode listener setup');
      return;
    }

    // Listen for focus mode changes
    chrome.storage.onChanged.addListener(async (changes, areaName) => {
      try {
        // ... listener logic
      } catch (error) {
        console.error('Error in focus mode listener:', error);
        // If extension context is invalidated, the listener will fail
        // This is expected behavior when extension is reloaded
      }
    });
  } catch (error) {
    console.error('Error setting up focus mode listener:', error);
  }
}
```

### 3. 在VirtualCharacter组件中添加上下文验证

**修复位置：** `packages/ui/lib/components/VirtualCharacter/VirtualCharacter.tsx`

```typescript
const [extensionContextValid, setExtensionContextValid] = useState(true);

// Check extension context validity
useEffect(() => {
  const checkExtensionContext = () => {
    try {
      // Check if chrome runtime is available
      if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id) {
        setExtensionContextValid(true);
      } else {
        setExtensionContextValid(false);
        console.warn('Extension context is not valid');
      }
    } catch (error) {
      setExtensionContextValid(false);
      console.warn('Extension context check failed:', error);
    }
  };

  checkExtensionContext();
  
  // Check periodically in case context becomes invalid
  const interval = setInterval(checkExtensionContext, 5000);
  
  return () => clearInterval(interval);
}, []);

// Don't render anything if extension context is invalid
if (!config.enabled || !extensionContextValid) {
  return null;
}
```

## 🎯 修复效果

### 修复前的问题：
- ❌ 扩展重新加载后出现"Extension context invalidated"错误
- ❌ 旧的content script继续运行并尝试访问失效的扩展API
- ❌ React组件渲染失败导致页面错误
- ❌ Chrome storage监听器在扩展上下文失效后仍然尝试执行

### 修复后的效果：
- ✅ 在扩展上下文失效时优雅地跳过组件挂载
- ✅ 添加了Chrome API可用性检查
- ✅ 定期检查扩展上下文状态
- ✅ 在上下文失效时自动停止渲染
- ✅ 提供清晰的警告日志而不是错误

## 🔍 技术细节

### 扩展上下文检查方法：
```typescript
// 检查chrome.runtime.id是否存在
if (!chrome?.runtime?.id) {
  // 扩展上下文已失效
}

// 检查chrome.storage API是否可用
if (!chrome?.storage?.onChanged) {
  // Chrome API不可用
}
```

### 错误处理策略：
1. **预防性检查**：在执行Chrome API调用前检查上下文
2. **优雅降级**：在API不可用时跳过功能而不是崩溃
3. **定期验证**：定期检查扩展上下文状态
4. **清理机制**：在检测到上下文失效时清理资源

### 日志输出：
- `Extension context invalidated, skipping mount` - 跳过组件挂载
- `Chrome storage API not available, skipping focus mode listener setup` - 跳过监听器设置
- `Extension context is not valid` - 扩展上下文无效
- `Extension context check failed` - 上下文检查失败

## 📋 测试验证

### 测试场景1：正常使用
1. 加载扩展
2. 打开网页
3. 验证虚拟角色正常显示
4. 验证语音对话功能正常

### 测试场景2：扩展重新加载
1. 在网页打开的情况下重新加载扩展
2. 验证不会出现"Extension context invalidated"错误
3. 验证旧的content script优雅地停止运行
4. 验证新的content script正常启动

### 测试场景3：扩展禁用/启用
1. 禁用扩展
2. 验证虚拟角色消失且无错误
3. 重新启用扩展
4. 验证功能恢复正常

## 🚀 部署建议

1. **重新加载扩展**：在Chrome扩展管理页面重新加载扩展
2. **清除缓存**：建议清除浏览器缓存以确保使用新版本
3. **监控日志**：观察浏览器控制台，确认警告日志正常显示
4. **功能测试**：测试虚拟角色和语音对话功能

## 🔮 预防措施

为了避免类似问题，建议：

1. **始终检查Chrome API可用性**
2. **使用try-catch包装所有Chrome API调用**
3. **实现优雅的错误处理和降级机制**
4. **定期验证扩展上下文状态**
5. **在组件卸载时正确清理资源**

---

这些修复确保了扩展在各种情况下都能稳定运行，避免了"Extension context invalidated"错误，提供了更好的用户体验。
