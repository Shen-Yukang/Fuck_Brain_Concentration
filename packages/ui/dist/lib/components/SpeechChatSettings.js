import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useStorage } from '@extension/shared';
import { speechChatConfigStorage } from '@extension/storage';
export const SpeechChatSettings = () => {
    const config = useStorage(speechChatConfigStorage);
    const [isTestingInput, setIsTestingInput] = useState(false);
    const [isTestingOutput, setIsTestingOutput] = useState(false);
    const [testResult, setTestResult] = useState('');
    // 语音录入设置处理
    const handleInputToggle = async () => {
        await speechChatConfigStorage.enableSpeechInput(!config.input.enabled);
    };
    const handleInputConfigChange = async (field, value) => {
        await speechChatConfigStorage.updateInputConfig({ [field]: value });
    };
    // 语音播放设置处理
    const handleOutputToggle = async () => {
        await speechChatConfigStorage.enableSpeechOutput(!config.output.enabled);
    };
    const handleOutputConfigChange = async (field, value) => {
        await speechChatConfigStorage.updateOutputConfig({ [field]: value });
    };
    // 对话模式设置
    const handleConversationModeToggle = async () => {
        await speechChatConfigStorage.enableConversationMode(!config.conversationMode);
    };
    // 测试语音录入
    const handleTestSpeechInput = async () => {
        if (isTestingInput)
            return;
        setIsTestingInput(true);
        setTestResult('');
        try {
            // 检查浏览器支持
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition) {
                setTestResult('❌ 您的浏览器不支持语音识别功能');
                return;
            }
            // 请求麦克风权限
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach(track => track.stop());
            // 创建语音识别实例
            const recognition = new SpeechRecognition();
            recognition.continuous = config.input.continuous;
            recognition.interimResults = config.input.interimResults;
            recognition.lang = config.input.language;
            recognition.maxAlternatives = config.input.maxAlternatives;
            recognition.onstart = () => {
                setTestResult('🎤 正在监听，请说话...');
            };
            recognition.onresult = (event) => {
                const result = event.results[event.results.length - 1];
                const transcript = result[0].transcript;
                const confidence = result[0].confidence || 0;
                if (result.isFinal) {
                    setTestResult(`✅ 识别结果: "${transcript}" (置信度: ${Math.round(confidence * 100)}%)`);
                }
                else {
                    setTestResult(`🎤 识别中: "${transcript}"`);
                }
            };
            recognition.onerror = (event) => {
                setTestResult(`❌ 识别错误: ${event.error}`);
            };
            recognition.onend = () => {
                setIsTestingInput(false);
            };
            recognition.start();
            // 5秒后自动停止
            setTimeout(() => {
                if (recognition) {
                    recognition.stop();
                }
            }, 5000);
        }
        catch (error) {
            setTestResult(`❌ 测试失败: ${error instanceof Error ? error.message : '未知错误'}`);
            setIsTestingInput(false);
        }
    };
    // 测试语音播放
    const handleTestSpeechOutput = async () => {
        if (isTestingOutput)
            return;
        setIsTestingOutput(true);
        try {
            // 使用更友好的测试文本
            const testText = '您好！这是语音播放测试。如果您能听到这段话，说明语音功能工作正常。';
            if (config.output.useTTS && typeof chrome !== 'undefined' && chrome.runtime) {
                // 使用TTS服务
                chrome.runtime.sendMessage({
                    type: 'PLAY_TTS_SOUND',
                    text: testText,
                });
            }
            else {
                // 使用Web Speech API
                const utterance = new SpeechSynthesisUtterance(testText);
                utterance.lang = config.input.language;
                utterance.rate = config.output.playSpeed;
                utterance.volume = config.output.volume;
                utterance.onend = () => {
                    setIsTestingOutput(false);
                };
                utterance.onerror = () => {
                    setIsTestingOutput(false);
                };
                speechSynthesis.speak(utterance);
            }
            // 3秒后重置状态
            setTimeout(() => {
                setIsTestingOutput(false);
            }, 3000);
        }
        catch (error) {
            console.error('Speech output test failed:', error);
            setIsTestingOutput(false);
        }
    };
    // 语言选项
    const languageOptions = [
        { value: 'zh-CN', label: '中文（简体）' },
        { value: 'zh-TW', label: '中文（繁体）' },
        { value: 'en-US', label: 'English (US)' },
        { value: 'en-GB', label: 'English (UK)' },
        { value: 'ja-JP', label: '日本語' },
        { value: 'ko-KR', label: '한국어' },
    ];
    return (_jsxs("div", { className: "space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: "\uD83C\uDF99\uFE0F \u8BED\u97F3\u5BF9\u8BDD\u8BBE\u7F6E" }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: "\u8BED\u97F3\u5F55\u5165" }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("label", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: "\u542F\u7528\u8BED\u97F3\u5F55\u5165" }), _jsx("button", { onClick: handleInputToggle, className: `relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${config.input.enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'}`, children: _jsx("span", { className: `inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.input.enabled ? 'translate-x-6' : 'translate-x-1'}` }) })] }), config.input.enabled && (_jsxs("div", { className: "space-y-3 pl-4 border-l-2 border-gray-200 dark:border-gray-600", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs text-gray-600 dark:text-gray-400 mb-1", children: "\u8BC6\u522B\u8BED\u8A00" }), _jsx("select", { value: config.input.language, onChange: e => speechChatConfigStorage.setLanguage(e.target.value), className: "w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white", children: languageOptions.map(option => (_jsx("option", { value: option.value, children: option.label }, option.value))) })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-xs text-gray-600 dark:text-gray-400 mb-1", children: ["\u7075\u654F\u5EA6: ", Math.round(config.input.sensitivity * 100), "%"] }), _jsx("input", { type: "range", min: "0", max: "1", step: "0.1", value: config.input.sensitivity, onChange: e => speechChatConfigStorage.setSensitivity(parseFloat(e.target.value)), className: "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("label", { className: "text-xs text-gray-600 dark:text-gray-400", children: "\u8FDE\u7EED\u8BC6\u522B" }), _jsx("input", { type: "checkbox", checked: config.input.continuous, onChange: e => handleInputConfigChange('continuous', e.target.checked), className: "rounded" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("label", { className: "text-xs text-gray-600 dark:text-gray-400", children: "\u81EA\u52A8\u53D1\u9001" }), _jsx("input", { type: "checkbox", checked: config.input.autoSend, onChange: e => handleInputConfigChange('autoSend', e.target.checked), className: "rounded" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("label", { className: "text-xs text-gray-600 dark:text-gray-400", children: "\u566A\u97F3\u964D\u566A" }), _jsx("input", { type: "checkbox", checked: config.input.noiseReduction, onChange: e => handleInputConfigChange('noiseReduction', e.target.checked), className: "rounded" })] })] }), _jsx("button", { onClick: handleTestSpeechInput, disabled: isTestingInput, className: `w-full px-3 py-2 text-sm font-medium rounded-md transition-colors ${isTestingInput
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400'
                                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800'}`, children: isTestingInput ? '🎤 测试中...' : '🎤 测试语音录入' })] }))] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: "\u8BED\u97F3\u64AD\u653E" }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("label", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: "\u542F\u7528\u8BED\u97F3\u64AD\u653E" }), _jsx("button", { onClick: handleOutputToggle, className: `relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${config.output.enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'}`, children: _jsx("span", { className: `inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.output.enabled ? 'translate-x-6' : 'translate-x-1'}` }) })] }), config.output.enabled && (_jsxs("div", { className: "space-y-3 pl-4 border-l-2 border-gray-200 dark:border-gray-600", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-xs text-gray-600 dark:text-gray-400 mb-1", children: ["\u64AD\u653E\u901F\u5EA6: ", config.output.playSpeed, "x"] }), _jsx("input", { type: "range", min: "0.5", max: "2.0", step: "0.1", value: config.output.playSpeed, onChange: e => speechChatConfigStorage.setPlaySpeed(parseFloat(e.target.value)), className: "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-xs text-gray-600 dark:text-gray-400 mb-1", children: ["\u64AD\u653E\u97F3\u91CF: ", Math.round(config.output.volume * 100), "%"] }), _jsx("input", { type: "range", min: "0", max: "1", step: "0.1", value: config.output.volume, onChange: e => speechChatConfigStorage.setVolume(parseFloat(e.target.value)), className: "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("label", { className: "text-xs text-gray-600 dark:text-gray-400", children: "\u81EA\u52A8\u64AD\u653E\u56DE\u590D" }), _jsx("input", { type: "checkbox", checked: config.output.autoPlay, onChange: e => handleOutputConfigChange('autoPlay', e.target.checked), className: "rounded" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("label", { className: "text-xs text-gray-600 dark:text-gray-400", children: "\u4F7F\u7528TTS\u5F15\u64CE" }), _jsx("input", { type: "checkbox", checked: config.output.useTTS, onChange: e => handleOutputConfigChange('useTTS', e.target.checked), className: "rounded" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("label", { className: "text-xs text-gray-600 dark:text-gray-400", children: "\u65B0\u8F93\u5165\u65F6\u4E2D\u65AD\u64AD\u653E" }), _jsx("input", { type: "checkbox", checked: config.output.interruptOnNewInput, onChange: e => handleOutputConfigChange('interruptOnNewInput', e.target.checked), className: "rounded" })] })] }), _jsx("button", { onClick: handleTestSpeechOutput, disabled: isTestingOutput, className: `w-full px-3 py-2 text-sm font-medium rounded-md transition-colors ${isTestingOutput
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400'
                                    : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800'}`, children: isTestingOutput ? '🔊 播放中...' : '🔊 测试语音播放' })] }))] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: "\u5BF9\u8BDD\u6A21\u5F0F" }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("label", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: "\u8FDE\u7EED\u8BED\u97F3\u5BF9\u8BDD" }), _jsx("button", { onClick: handleConversationModeToggle, className: `relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${config.conversationMode ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'}`, children: _jsx("span", { className: `inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.conversationMode ? 'translate-x-6' : 'translate-x-1'}` }) })] }), _jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: "\u542F\u7528\u540E\uFF0C\u52A9\u624B\u56DE\u590D\u5B8C\u6210\u540E\u4F1A\u81EA\u52A8\u5F00\u59CB\u76D1\u542C\u60A8\u7684\u4E0B\u4E00\u53E5\u8BDD" })] }), testResult && (_jsx("div", { className: "p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md", children: _jsx("p", { className: "text-sm text-blue-800 dark:text-blue-200", children: testResult }) }))] }));
};
