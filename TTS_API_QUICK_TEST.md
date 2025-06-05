# 字节跳动TTS API快速测试指南

## 获取API密钥

1. **访问字节跳动语音开放平台**
   - 网址：https://console.volcengine.com/speech/app
   - 注册并登录账号

2. **创建应用**
   - 在控制台创建新应用
   - 获取AppID和访问令牌(Token)

## API测试

### 使用curl命令测试

```bash
curl -X POST "https://openspeech.bytedance.com/api/v1/tts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "app": {
      "appid": "YOUR_APP_ID",
      "cluster": "volcano_tts"
    },
    "user": {
      "uid": "test_user"
    },
    "audio": {
      "voice_type": "zh_male_M392_conversation_wvae_bigtts",
      "encoding": "mp3",
      "speed_ratio": 1.0
    },
    "request": {
      "reqid": "test_' + Date.now() + '",
      "text": "这是一个测试",
      "operation": "query"
    }
  }'
```

### 使用JavaScript测试

```javascript
async function testTTSAPI() {
  const response = await fetch('https://openspeech.bytedance.com/api/v1/tts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
    },
    body: JSON.stringify({
      app: {
        appid: 'YOUR_APP_ID',
        cluster: 'volcano_tts'
      },
      user: {
        uid: 'test_user'
      },
      audio: {
        voice_type: 'zh_male_M392_conversation_wvae_bigtts',
        encoding: 'mp3',
        speed_ratio: 1.0
      },
      request: {
        reqid: 'test_' + Date.now(),
        text: '这是一个测试',
        operation: 'query'
      }
    })
  });

  const result = await response.json();
  console.log('API Response:', result);
  
  if (result.code === 3000 && result.data) {
    console.log('✅ TTS API测试成功');
    return true;
  } else {
    console.log('❌ TTS API测试失败:', result.message);
    return false;
  }
}
```

## 成功响应示例

```json
{
  "reqid": "test_1234567890",
  "code": 3000,
  "operation": "query",
  "message": "Success",
  "sequence": -1,
  "data": "base64_encoded_audio_data_here...",
  "addition": {
    "duration": "1960"
  }
}
```

## 常见错误码

| 错误码 | 说明 | 解决方案 |
|--------|------|----------|
| 4001 | 缺少Authorization header | 检查请求头中的Authorization字段 |
| 4003 | Token无效或过期 | 重新获取访问令牌 |
| 4004 | AppID无效 | 检查AppID是否正确 |
| 4005 | 请求频率超限 | 降低请求频率 |
| 5000 | 服务器内部错误 | 稍后重试 |

## 在Chrome插件中测试

1. **配置API密钥**
   - 打开插件popup页面
   - 在"语音合成设置"中输入AppID和Token
   - 确保"启用语音通知"开关已打开

2. **测试语音合成**
   - 点击"测试语音合成"按钮
   - 查看控制台日志
   - 听取语音播放效果

3. **查看详细日志**
   - 打开Chrome开发者工具(F12)
   - 切换到Console标签
   - 查看TTS相关日志信息

## 故障排除检查清单

- [ ] AppID和Token是否正确填写
- [ ] Token是否包含多余的空格或特殊字符
- [ ] 网络连接是否正常
- [ ] 是否超出API调用频率限制
- [ ] 浏览器是否允许音频播放
- [ ] 声音设置是否已启用

## 注意事项

1. **Token安全**
   - 不要在公开代码中暴露Token
   - 定期更换访问令牌

2. **调用频率**
   - 避免频繁测试以免超出限制
   - 生产环境中合理控制调用频率

3. **音频格式**
   - 支持mp3、wav等格式
   - 建议使用mp3以获得更好的压缩率

4. **语音类型**
   - 选择合适的语音类型
   - 不同语音类型有不同的效果

## 联系支持

如果API测试仍然失败，请：
1. 检查字节跳动官方文档
2. 联系字节跳动技术支持
3. 查看API状态页面
