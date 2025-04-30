import { aiConfigStorage, AIProvider } from '@extension/storage';
import { useStorage } from '@extension/shared';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type AISettingsProps = {
  className?: string;
};

export const AISettings = ({ className }: AISettingsProps) => {
  const aiConfig = useStorage(aiConfigStorage);
  const [enabled, setEnabled] = useState(aiConfig.enabled);
  const [apiKey, setApiKey] = useState(aiConfig.apiKey);
  const [provider, setProvider] = useState<AIProvider>(aiConfig.provider);
  const [model, setModel] = useState(aiConfig.model);
  const [preGenerateMinutes, setPreGenerateMinutes] = useState(aiConfig.preGenerateMinutes);
  const [showApiKey, setShowApiKey] = useState(false);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  // 同步状态
  useEffect(() => {
    setEnabled(aiConfig.enabled);
    setApiKey(aiConfig.apiKey);
    setProvider(aiConfig.provider);
    setModel(aiConfig.model);
    setPreGenerateMinutes(aiConfig.preGenerateMinutes);
  }, [aiConfig]);

  // 更新启用状态
  const handleToggleEnabled = () => {
    aiConfigStorage.enableAI(!enabled);
  };

  // 更新API密钥
  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  // 保存API密钥
  const handleSaveApiKey = () => {
    aiConfigStorage.updateAPIKey(apiKey);
  };

  // 更新提供商
  const handleProviderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newProvider = e.target.value as AIProvider;
    setProvider(newProvider);

    // 根据提供商设置默认模型
    if (newProvider === AIProvider.DEEPSEEK) {
      setModel('deepseek-chat');
    } else if (newProvider === AIProvider.OPENAI) {
      setModel('gpt-3.5-turbo');
    }

    aiConfigStorage.updateProvider(
      newProvider,
      newProvider === AIProvider.DEEPSEEK ? 'deepseek-chat' : 'gpt-3.5-turbo',
    );
  };

  // 更新模型
  const handleModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModel(e.target.value);
    aiConfigStorage.updateProvider(provider, e.target.value);
  };

  // 更新预生成时间
  const handlePreGenerateMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setPreGenerateMinutes(value);
      aiConfigStorage.updatePreGenerateTime(value);
    }
  };

  return (
    <div
      className={cn('flex flex-col gap-4 p-4 rounded-lg shadow-md transition-all duration-300', className)}
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
      <h2 className="text-lg font-bold flex items-center gap-2">
        <span className="inline-block w-1.5 h-5 bg-purple-500 rounded-sm"></span>
        AI 通知设置
      </h2>

      <div className="flex items-center justify-between">
        <label htmlFor="ai-enabled" className="font-medium">
          启用 AI 生成通知
        </label>
        <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
          <input
            type="checkbox"
            id="ai-enabled"
            className="absolute w-6 h-6 transition duration-200 ease-in-out transform bg-white rounded-full appearance-none cursor-pointer peer checked:right-0 checked:bg-blue-500 border border-gray-300 checked:border-blue-500 left-0 top-0"
            checked={enabled}
            onChange={handleToggleEnabled}
          />
          <label
            htmlFor="ai-enabled"
            className="block w-full h-full overflow-hidden rounded-full cursor-pointer bg-gray-300 peer-checked:bg-blue-200"
          />
        </div>
      </div>

      {enabled && (
        <>
          <div className="flex flex-col gap-2">
            <label htmlFor="api-key" className="font-medium">
              API 密钥
            </label>
            <div className="flex gap-2">
              <input
                id="api-key"
                type={showApiKey ? 'text' : 'password'}
                value={apiKey}
                onChange={handleApiKeyChange}
                placeholder="输入 API 密钥"
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors">
                {showApiKey ? '隐藏' : '显示'}
              </button>
            </div>
            <button
              onClick={handleSaveApiKey}
              className="mt-1 py-1 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              保存密钥
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="pre-generate-minutes" className="font-medium">
              提前生成通知时间（分钟）
            </label>
            <input
              id="pre-generate-minutes"
              type="number"
              min="1"
              max="30"
              value={preGenerateMinutes}
              onChange={handlePreGenerateMinutesChange}
              className="border border-gray-300 rounded-md px-3 py-2 outline-none"
            />
            <p className="text-sm text-gray-500">在倒计时结束前多少分钟预生成通知内容</p>
          </div>

          <div className="mt-2">
            <button
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className="flex items-center gap-1 text-blue-500 hover:text-blue-700">
              <span>{isAdvancedOpen ? '收起' : '展开'}高级设置</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transition-transform ${isAdvancedOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isAdvancedOpen && (
              <div className="mt-3 p-3 bg-gray-50 rounded-md">
                <div className="flex flex-col gap-3">
                  <div>
                    <label htmlFor="ai-provider" className="block font-medium mb-1">
                      AI 提供商
                    </label>
                    <select
                      id="ai-provider"
                      value={provider}
                      onChange={handleProviderChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none">
                      <option value={AIProvider.DEEPSEEK}>DeepSeek</option>
                      <option value={AIProvider.OPENAI}>OpenAI</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="ai-model" className="block font-medium mb-1">
                      模型
                    </label>
                    <input
                      id="ai-model"
                      type="text"
                      value={model}
                      onChange={handleModelChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
