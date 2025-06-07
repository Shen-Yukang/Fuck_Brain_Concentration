import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useStorage, VOICE_OPTIONS, TTSTextProcessor } from '@extension/shared';
import { ttsConfigStorage } from '@extension/storage';
import { useState } from 'react';
export const TTSSettings = () => {
    const ttsConfig = useStorage(ttsConfigStorage);
    const [isTestPlaying, setIsTestPlaying] = useState(false);
    const [testResult, setTestResult] = useState('');
    const handleToggleTTS = async () => {
        await ttsConfigStorage.updateConfig({ enabled: !ttsConfig.enabled });
    };
    const handleConfigChange = async (field, value) => {
        await ttsConfigStorage.updateConfig({ [field]: value });
    };
    // 获取当前语音类型的默认文本
    const getCurrentDefaultText = () => {
        // 创建一个临时配置，清空用户自定义文本，获取语音类型的默认文本
        const tempConfig = { ...ttsConfig, defaultText: '' };
        return TTSTextProcessor.getDisplayDefaultText(tempConfig);
    };
    // 获取显示的默认文本（用户自定义 > 语音类型默认）
    const getDisplayDefaultText = () => {
        return TTSTextProcessor.getDisplayDefaultText(ttsConfig);
    };
    const handleTestTTS = async () => {
        if (isTestPlaying)
            return;
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
            }
            else {
                setTestResult('❌ 测试失败：' + (response?.error || '未知错误'));
            }
        }
        catch (error) {
            console.error('TTS test error:', error);
            setTestResult('❌ 测试失败：' + error.message);
        }
        finally {
            setIsTestPlaying(false);
        }
    };
    return (_jsxs("div", { className: "space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: "\uD83C\uDFA4 \u8BED\u97F3\u5408\u6210\u8BBE\u7F6E" }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("label", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: "\u542F\u7528\u8BED\u97F3\u901A\u77E5" }), _jsx("button", { onClick: handleToggleTTS, className: `relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${ttsConfig.enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'}`, children: _jsx("span", { className: `inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${ttsConfig.enabled ? 'translate-x-6' : 'translate-x-1'}` }) })] }), ttsConfig.enabled && (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: "API \u914D\u7F6E" }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs text-gray-600 dark:text-gray-400 mb-1", children: "\u5E94\u7528ID (AppID)" }), _jsx("input", { type: "text", value: ttsConfig.appid, onChange: e => handleConfigChange('appid', e.target.value), placeholder: "\u8BF7\u8F93\u5165\u5B57\u8282\u8DF3\u52A8TTS\u5E94\u7528ID", className: "w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs text-gray-600 dark:text-gray-400 mb-1", children: "\u8BBF\u95EE\u4EE4\u724C (Token)" }), _jsx("input", { type: "password", value: ttsConfig.token, onChange: e => handleConfigChange('token', e.target.value), placeholder: "\u8BF7\u8F93\u5165\u8BBF\u95EE\u4EE4\u724C", className: "w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: "\u8BED\u97F3\u8BBE\u7F6E" }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs text-gray-600 dark:text-gray-400 mb-1", children: "\u8BED\u97F3\u7C7B\u578B" }), _jsx("select", { value: ttsConfig.voiceType, onChange: e => handleConfigChange('voiceType', e.target.value), className: "w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white", children: VOICE_OPTIONS.map(option => (_jsx("option", { value: option.value, children: option.label }, option.value))) })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-xs text-gray-600 dark:text-gray-400 mb-1", children: ["\u8BED\u901F: ", ttsConfig.speedRatio, "x"] }), _jsx("input", { type: "range", min: "0.5", max: "2.0", step: "0.1", value: ttsConfig.speedRatio, onChange: e => handleConfigChange('speedRatio', parseFloat(e.target.value)), className: "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" }), _jsxs("div", { className: "flex justify-between text-xs text-gray-500 mt-1", children: [_jsx("span", { children: "\u6162 (0.5x)" }), _jsx("span", { children: "\u6B63\u5E38 (1.0x)" }), _jsx("span", { children: "\u5FEB (2.0x)" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs text-gray-600 dark:text-gray-400 mb-1", children: "\u9ED8\u8BA4\u8BED\u97F3\u6587\u672C" }), _jsx("textarea", { value: getDisplayDefaultText(), onChange: e => handleConfigChange('defaultText', e.target.value), placeholder: getCurrentDefaultText(), rows: 3, className: "w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none" }), _jsx("div", { className: "text-xs text-gray-500 dark:text-gray-400 mt-1", children: "\uD83D\uDCA1 \u7559\u7A7A\u5C06\u4F7F\u7528\u5F53\u524D\u8BED\u97F3\u89D2\u8272\u7684\u9ED8\u8BA4\u6587\u672C" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("button", { onClick: handleTestTTS, disabled: isTestPlaying || !ttsConfig.appid || !ttsConfig.token, className: `w-full px-3 py-2 text-sm font-medium rounded-md transition-colors ${isTestPlaying || !ttsConfig.appid || !ttsConfig.token
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400'
                                    : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800'}`, children: isTestPlaying ? '🎵 测试中...' : '🎤 测试语音合成' }), testResult && (_jsx("div", { className: `p-2 text-xs rounded-md ${testResult.includes('✅')
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                    : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'}`, children: testResult }))] }), _jsxs("div", { className: "text-xs text-gray-500 dark:text-gray-400 space-y-1", children: [_jsx("p", { children: "\uD83D\uDCA1 \u4F7F\u7528\u8BF4\u660E\uFF1A" }), _jsxs("ul", { className: "list-disc list-inside space-y-1 ml-2", children: [_jsx("li", { children: "\u9700\u8981\u914D\u7F6E\u5B57\u8282\u8DF3\u52A8TTS\u670D\u52A1\u7684API\u5BC6\u94A5" }), _jsx("li", { children: "\u542F\u7528\u540E\uFF0C\u4E13\u6CE8\u6A21\u5F0F\u7684\u901A\u77E5\u5C06\u4F7F\u7528\u8BED\u97F3\u64AD\u62A5" }), _jsx("li", { children: "\u5982\u679C\u8BED\u97F3\u5408\u6210\u5931\u8D25\uFF0C\u4F1A\u81EA\u52A8\u56DE\u9000\u5230\u666E\u901A\u97F3\u6548" })] })] })] }))] }));
};
