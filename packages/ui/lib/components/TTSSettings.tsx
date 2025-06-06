import { useStorage } from '@extension/shared';
import { ttsConfigStorage } from '@extension/storage';
import { useState } from 'react';

export const TTSSettings = () => {
  const ttsConfig = useStorage(ttsConfigStorage);
  const [isTestPlaying, setIsTestPlaying] = useState(false);
  const [testResult, setTestResult] = useState<string>('');

  const handleToggleTTS = async () => {
    await ttsConfigStorage.updateConfig({ enabled: !ttsConfig.enabled });
  };

  const handleConfigChange = async (field: string, value: string | number) => {
    await ttsConfigStorage.updateConfig({ [field]: value });
  };

  // 获取当前语音类型的默认文本
  const getCurrentDefaultText = () => {
    const currentVoice = voiceOptions.find(option => option.value === ttsConfig.voiceType);
    return currentVoice?.defaultText || '';
  };

  // 获取显示的默认文本（用户自定义 > 语音类型默认）
  const getDisplayDefaultText = () => {
    return ttsConfig.defaultText || getCurrentDefaultText();
  };

  const handleTestTTS = async () => {
    if (isTestPlaying) return;

    setIsTestPlaying(true);
    setTestResult('');

    try {
      // 使用当前配置的默认文本进行测试
      const testText = getDisplayDefaultText() || '这是语音合成测试，你好！';

      // 发送消息给background script进行TTS测试
      const response = await chrome.runtime.sendMessage({
        type: 'TEST_TTS',
        text: testText,
      });

      if (response && response.success) {
        setTestResult('✅ 测试成功！语音合成正常工作。');
      } else {
        setTestResult('❌ 测试失败：' + (response?.error || '未知错误'));
      }
    } catch (error) {
      console.error('TTS test error:', error);
      setTestResult('❌ 测试失败：' + (error as Error).message);
    } finally {
      setIsTestPlaying(false);
    }
  };

  const voiceOptions = [
    {
      value: 'zh_female_linjianvhai_moon_bigtts',
      label: '领家女孩',
      defaultText:
        '呀~ 看你专注的样子，眼睛亮亮的，真的超有魅力呢！这股认真劲儿，一定能收获满满！加油哦，我就悄悄在旁边陪你一起，专注冲鸭！',
    },
    {
      value: 'zh_female_yuanqinvyou_moon_bigtts',
      label: '撒娇学妹',
      defaultText:
        '呀~ 看你专注的样子，眼睛亮亮的，真的超有魅力呢！这股认真劲儿，一定能收获满满！加油哦，我就悄悄在旁边陪你一起，专注冲鸭！',
    },
    {
      value: 'zh_female_gaolengyujie_moon_bigtts',
      label: '高冷御姐',
      defaultText:
        '呀~ 看你专注的样子，眼睛亮亮的，真的超有魅力呢！这股认真劲儿，一定能收获满满！加油哦，我就悄悄在旁边陪你一起，专注冲鸭！',
    },
    {
      value: 'multi_female_shuangkuaisisi_moon_bigtts',
      label: 'はるこ',
      defaultText:
        'いやー、集中しているところを見ると、目がキラキラしていて、超魅力的ですよね!この本気さ、きっと手に入ります!頑張って、私はそっとそばであなたに付き添って一緒に、集中してアヒルを沖ます!愛してますよ',
    },
    {
      value: 'multi_female_gaolengyujie_moon_bigtts',
      label: 'あけみ',
      defaultText:
        'いやー、集中しているところを見ると、目がキラキラしていて、超魅力的ですよね!この本気さ、きっと手に入ります!頑張って、私はそっとそばであなたに付き添って一緒に、集中してアヒルを沖ます!愛してますよ',
    },
    {
      value: 'zh_female_tianmeixiaoyuan_moon_bigtts',
      label: '甜美小源',
      defaultText:
        '呀~ 看你专注的样子，眼睛亮亮的，真的超有魅力呢！这股认真劲儿，一定能收获满满！加油哦，我就悄悄在旁边陪你一起，专注冲鸭！',
    },
    {
      value: 'zh_female_kailangjiejie_moon_bigtts',
      label: '开朗姐姐',
      defaultText:
        '呀~ 看你专注的样子，眼睛亮亮的，真的超有魅力呢！这股认真劲儿，一定能收获满满！加油哦，我就悄悄在旁边陪你一起，专注冲鸭！',
    },
  ];

  return (
    <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">🎤 语音合成设置</h3>

      {/* 启用/禁用TTS */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">启用语音通知</label>
        <button
          onClick={handleToggleTTS}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            ttsConfig.enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
          }`}>
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              ttsConfig.enabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* TTS配置 */}
      {ttsConfig.enabled && (
        <div className="space-y-4">
          {/* API配置 */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">API 配置</h4>

            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">应用ID (AppID)</label>
              <input
                type="text"
                value={ttsConfig.appid}
                onChange={e => handleConfigChange('appid', e.target.value)}
                placeholder="请输入字节跳动TTS应用ID"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">访问令牌 (Token)</label>
              <input
                type="password"
                value={ttsConfig.token}
                onChange={e => handleConfigChange('token', e.target.value)}
                placeholder="请输入访问令牌"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          {/* 语音设置 */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">语音设置</h4>

            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">语音类型</label>
              <select
                value={ttsConfig.voiceType}
                onChange={e => handleConfigChange('voiceType', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {voiceOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                语速: {ttsConfig.speedRatio}x
              </label>
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.1"
                value={ttsConfig.speedRatio}
                onChange={e => handleConfigChange('speedRatio', parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>慢 (0.5x)</span>
                <span>正常 (1.0x)</span>
                <span>快 (2.0x)</span>
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">默认语音文本</label>
              <textarea
                value={getDisplayDefaultText()}
                onChange={e => handleConfigChange('defaultText', e.target.value)}
                placeholder={getCurrentDefaultText()}
                rows={3}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none"
              />
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">💡 留空将使用当前语音角色的默认文本</div>
            </div>
          </div>

          {/* 测试按钮 */}
          <div className="space-y-2">
            <button
              onClick={handleTestTTS}
              disabled={isTestPlaying || !ttsConfig.appid || !ttsConfig.token}
              className={`w-full px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isTestPlaying || !ttsConfig.appid || !ttsConfig.token
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400'
                  : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800'
              }`}>
              {isTestPlaying ? '🎵 测试中...' : '🎤 测试语音合成'}
            </button>

            {testResult && (
              <div
                className={`p-2 text-xs rounded-md ${
                  testResult.includes('✅')
                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                    : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                }`}>
                {testResult}
              </div>
            )}
          </div>

          {/* 使用说明 */}
          <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
            <p>💡 使用说明：</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>需要配置字节跳动TTS服务的API密钥</li>
              <li>启用后，专注模式的通知将使用语音播报</li>
              <li>如果语音合成失败，会自动回退到普通音效</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
