# TTS语音通知故障排除指南

## 常见错误及解决方案

### 错误1：Could not establish connection. Receiving end does not exist.

**问题描述：** TTS测试时出现连接错误，无法建立与音频播放器的连接。

**状态：** ✅ 已修复

**修复说明：**
- 已优化消息传递机制
- 改进了base64音频数据处理
- 在offscreen document中创建音频URL

**如果仍然遇到此问题：**

#### 方案1：重新加载扩展
1. 打开 `chrome://extensions/`
2. 找到你的扩展
3. 点击"重新加载"按钮
4. 重新测试TTS功能

#### 方案2：检查浏览器控制台
1. 打开Chrome开发者工具（F12）
2. 切换到"Console"标签
3. 查看是否有相关错误信息
4. 特别关注以下日志：
   - `Offscreen document created for audio playback`
   - `TTS generation successful`
   - `TTS sound played successfully`

### 错误2：URL.createObjectURL is not a function

**问题描述：** 在background script中出现"URL.createObjectURL is not a function"错误。

**状态：** ✅ 已修复

**修复说明：**
- Background script运行在service worker环境中，无法使用DOM API
- 已改为在offscreen document中处理音频URL创建
- 现在直接传递base64数据到offscreen document

### 错误3：TTS未启用或未配置

**问题描述：** 提示TTS服务未启用或配置不完整。

**解决方案：**
1. 确认"启用语音通知"开关已打开
2. 检查AppID和Token是否正确填写
3. 验证API密钥是否有效

### 错误4：missing Authorization header

**问题描述：** API请求返回"missing Authorization header"错误。

**状态：** ✅ 已修复

**修复说明：**
- 已正确实现Bearer Token认证
- 在请求Header中添加 `Authorization: Bearer; ${token}`
- 从请求体中移除token字段

**如果仍然遇到此问题：**
1. **检查Token格式：**
   - 确保Token字段填写正确
   - Token不应包含"Bearer "前缀，系统会自动添加
   - 检查Token中是否有多余的空格或特殊字符

2. **重新获取Token：**
   - 登录字节跳动语音开放平台
   - 重新生成访问令牌
   - 确保Token未过期

### 错误5：语音生成失败

**问题描述：** TTS API调用失败，无法生成语音。

**可能原因：**
1. API密钥错误或过期
2. 网络连接问题
3. 字节跳动服务暂时不可用
4. API调用频率超限
5. 请求格式不正确

**解决方案：**
1. **验证API密钥：**
   - 登录字节跳动语音开放平台
   - 确认AppID和Token是否正确
   - 检查API密钥是否过期

2. **检查网络连接：**
   - 确保网络连接正常
   - 尝试访问 https://openspeech.bytedance.com/
   - 检查是否有防火墙或代理阻止

3. **查看详细错误：**
   - 打开浏览器控制台
   - 查看TTS API的具体错误信息
   - 根据错误码查找解决方案

4. **验证请求格式：**
   - 确认使用正确的Authorization header格式
   - 检查请求体是否符合API规范

### 错误6：音频播放失败

**问题描述：** 语音生成成功但播放失败。

**解决方案：**
1. **检查声音设置：**
   - 确认"启用通知声音"已开启
   - 调整音量设置
   - 测试普通通知音效是否正常

2. **检查浏览器音频权限：**
   - 确保Chrome允许音频播放
   - 检查是否有静音设置
   - 尝试刷新页面

## 调试步骤

### 步骤1：基础检查
1. 确认扩展已正确安装和加载
2. 检查所有必要权限已授予
3. 验证网络连接正常

### 步骤2：配置验证
1. 重新输入API密钥
2. 选择不同的语音类型测试
3. 调整语速设置

### 步骤3：逐步测试
1. 先测试普通通知音效
2. 再测试TTS语音合成
3. 最后测试完整的专注模式流程

### 步骤4：日志分析
查看控制台日志，关注以下关键信息：
- `TTS generation successful` - TTS生成成功
- `TTS sound played successfully` - TTS播放成功
- `Message sending error` - 消息发送错误
- `Audio play error` - 音频播放错误

## 常见问题FAQ

### Q: 为什么TTS测试按钮一直显示"测试中..."？
A: 可能是API请求超时或网络问题。等待几秒钟或刷新页面重试。

### Q: 语音播放很慢或断断续续？
A: 可能是网络速度问题。尝试降低语速或检查网络连接。

### Q: 可以使用其他TTS服务吗？
A: 目前只支持字节跳动TTS服务。如果需要其他服务，需要修改代码。

### Q: API调用有频率限制吗？
A: 是的，字节跳动TTS有调用频率限制。避免频繁测试。

## 联系支持

如果以上方法都无法解决问题，请提供以下信息：
1. 具体的错误信息
2. 浏览器版本和操作系统
3. 控制台日志截图
4. 复现步骤

## 备用方案

如果TTS功能完全无法使用，插件会自动回退到普通音效通知，确保基本功能不受影响。
