# 动态语音通知功能说明

## 功能概述

为Chrome插件添加了基于字节跳动TTS（文本转语音）服务的动态语音通知功能。当专注模式开始或结束时，系统会使用AI生成的个性化文本，并通过语音合成技术播放人性化的语音提醒。

## 新增功能

### 1. TTS配置存储 (ttsConfigStorage.ts)
- 新增TTS服务配置存储
- 支持字节跳动TTS API配置
- 包含语音类型、语速等参数设置
- 默认禁用，需要用户手动配置API密钥

### 2. TTS服务模块 (ttsService.ts)
- 集成字节跳动TTS API
- 支持文本转语音合成
- 自动处理base64音频数据转换
- 包含错误处理和回退机制

### 3. TTS设置UI组件 (TTSSettings.tsx)
- 语音合成开关切换
- API配置界面（AppID、Token）
- 语音类型选择（男声/女声，不同风格）
- 语速调节滑块
- 测试语音合成按钮
- 响应式设计，支持暗黑模式

### 4. 背景脚本语音播放 (background/index.ts)
- 在专注模式开始时播放TTS语音提醒
- 在专注模式结束时播放AI生成的个性化语音通知
- 支持TTS测试功能
- 自动回退到普通音效（如果TTS失败）

### 5. 音频播放增强 (offscreen.js)
- 新增TTS音频播放支持
- 自动清理临时音频URL
- 支持动态生成的音频内容

## 使用方法

### 1. 配置TTS服务
1. **打开插件popup页面**
2. **在"语音合成设置"部分：**
   - 启用语音通知开关
   - 输入字节跳动TTS的AppID和Token
   - 选择喜欢的语音类型（男声/女声）
   - 调节语速（0.5x - 2.0x）
   - 点击"测试语音合成"验证配置

### 2. 获取字节跳动TTS API密钥
1. 访问 [字节跳动语音开放平台](https://openspeech.bytedance.com/)
2. 注册账号并创建应用
3. 获取AppID和访问令牌（Token）
4. 将密钥配置到插件中

### 3. 专注模式中的语音提醒
- **启动专注模式时：** 播放鼓励性的语音提醒
- **专注时间结束时：** 播放AI生成的个性化休息提醒
- **自动回退：** 如果TTS服务不可用，自动使用普通音效

## 技术实现

### TTS配置结构
```typescript
type TTSConfig = {
  enabled: boolean;        // 是否启用TTS
  appid: string;          // 字节跳动TTS应用ID
  token: string;          // 访问令牌
  cluster: string;        // 集群名称
  voiceType: string;      // 语音类型
  encoding: string;       // 音频编码格式
  speedRatio: number;     // 语速比例
  uid: string;           // 用户ID
};
```

### API请求格式

**请求Headers：**
```
Content-Type: application/json
Authorization: Bearer ${your_access_token}
```

**请求Body：**
```json
{
  "app": {
    "appid": "your_app_id",
    "cluster": "volcano_tts"
  },
  "user": {
    "uid": "chrome_extension_user"
  },
  "audio": {
    "voice_type": "zh_male_M392_conversation_wvae_bigtts",
    "encoding": "mp3",
    "speed_ratio": 1.0
  },
  "request": {
    "reqid": "unique_request_id",
    "text": "要转换的文本",
    "operation": "query"
  }
}
```

**重要说明：**
- 认证方式采用 Bearer Token，需要在请求Header中填入 `Authorization: Bearer; ${token}`
- 请求体中的 `app` 对象不再包含 `token` 字段
- Token只在Authorization header中使用

### 语音播放流程
1. **文本生成：** AI生成个性化通知文本
2. **语音合成：** 调用字节跳动TTS API
3. **音频处理：** 将base64数据转换为Blob URL
4. **播放音频：** 通过offscreen document播放
5. **资源清理：** 自动清理临时音频URL

## 支持的语音类型

- `zh_male_M392_conversation_wvae_bigtts` - 男声对话风格
- `zh_female_F001_conversation_wvae_bigtts` - 女声对话风格
- `zh_male_M001_conversation_wvae_bigtts` - 男声标准
- `zh_female_F002_conversation_wvae_bigtts` - 女声标准

## 错误处理和回退机制

1. **配置检查：** 自动检测TTS配置是否完整
2. **网络错误：** 处理API请求失败情况
3. **音频播放失败：** 自动回退到普通音效
4. **用户友好提示：** 在UI中显示详细的错误信息

## 安全考虑

- API密钥存储在本地Chrome存储中
- 不会向第三方服务发送敏感信息
- 音频数据仅在本地处理和播放

## 性能优化

- 音频URL自动清理，避免内存泄漏
- 异步处理，不阻塞主线程
- 智能回退机制，确保用户体验

## 使用建议

1. **首次使用：** 建议先测试语音合成功能
2. **网络环境：** 确保网络连接稳定以获得最佳体验
3. **音量设置：** 配合声音设置中的音量控制
4. **语音选择：** 根据个人喜好选择合适的语音类型

这个功能让专注时间管理更加人性化和智能化，通过动态生成的语音提醒，为用户提供更好的专注体验。
