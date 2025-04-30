import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { aiConfigStorage, AIProvider } from '@extension/storage';
import { useStorage } from '@extension/shared';
import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
export const AISettings = ({ className }) => {
    const aiConfig = useStorage(aiConfigStorage);
    const [enabled, setEnabled] = useState(aiConfig.enabled);
    const [apiKey, setApiKey] = useState(aiConfig.apiKey);
    const [provider, setProvider] = useState(aiConfig.provider);
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
    const handleApiKeyChange = (e) => {
        setApiKey(e.target.value);
    };
    // 保存API密钥
    const handleSaveApiKey = () => {
        aiConfigStorage.updateAPIKey(apiKey);
    };
    // 更新提供商
    const handleProviderChange = (e) => {
        const newProvider = e.target.value;
        setProvider(newProvider);
        // 根据提供商设置默认模型
        if (newProvider === AIProvider.DEEPSEEK) {
            setModel('deepseek-chat');
        }
        else if (newProvider === AIProvider.OPENAI) {
            setModel('gpt-3.5-turbo');
        }
        aiConfigStorage.updateProvider(newProvider, newProvider === AIProvider.DEEPSEEK ? 'deepseek-chat' : 'gpt-3.5-turbo');
    };
    // 更新模型
    const handleModelChange = (e) => {
        setModel(e.target.value);
        aiConfigStorage.updateProvider(provider, e.target.value);
    };
    // 更新预生成时间
    const handlePreGenerateMinutesChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value > 0) {
            setPreGenerateMinutes(value);
            aiConfigStorage.updatePreGenerateTime(value);
        }
    };
    return (_jsxs("div", { className: cn('flex flex-col gap-4 p-4 rounded-lg shadow-md transition-all duration-300', className), style: { backgroundColor: 'rgba(255, 255, 255, 0.8)' }, children: [_jsxs("h2", { className: "text-lg font-bold flex items-center gap-2", children: [_jsx("span", { className: "inline-block w-1.5 h-5 bg-purple-500 rounded-sm" }), "AI \u901A\u77E5\u8BBE\u7F6E"] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("label", { htmlFor: "ai-enabled", className: "font-medium", children: "\u542F\u7528 AI \u751F\u6210\u901A\u77E5" }), _jsxs("div", { className: "relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full", children: [_jsx("input", { type: "checkbox", id: "ai-enabled", className: "absolute w-6 h-6 transition duration-200 ease-in-out transform bg-white rounded-full appearance-none cursor-pointer peer checked:right-0 checked:bg-blue-500 border border-gray-300 checked:border-blue-500 left-0 top-0", checked: enabled, onChange: handleToggleEnabled }), _jsx("label", { htmlFor: "ai-enabled", className: "block w-full h-full overflow-hidden rounded-full cursor-pointer bg-gray-300 peer-checked:bg-blue-200" })] })] }), enabled && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("label", { htmlFor: "api-key", className: "font-medium", children: "API \u5BC6\u94A5" }), _jsxs("div", { className: "flex gap-2", children: [_jsx("input", { id: "api-key", type: showApiKey ? 'text' : 'password', value: apiKey, onChange: handleApiKeyChange, placeholder: "\u8F93\u5165 API \u5BC6\u94A5", className: "flex-1 border border-gray-300 rounded-md px-3 py-2 outline-none" }), _jsx("button", { type: "button", onClick: () => setShowApiKey(!showApiKey), className: "px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors", children: showApiKey ? '隐藏' : '显示' })] }), _jsx("button", { onClick: handleSaveApiKey, className: "mt-1 py-1 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors", children: "\u4FDD\u5B58\u5BC6\u94A5" })] }), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("label", { htmlFor: "pre-generate-minutes", className: "font-medium", children: "\u63D0\u524D\u751F\u6210\u901A\u77E5\u65F6\u95F4\uFF08\u5206\u949F\uFF09" }), _jsx("input", { id: "pre-generate-minutes", type: "number", min: "1", max: "30", value: preGenerateMinutes, onChange: handlePreGenerateMinutesChange, className: "border border-gray-300 rounded-md px-3 py-2 outline-none" }), _jsx("p", { className: "text-sm text-gray-500", children: "\u5728\u5012\u8BA1\u65F6\u7ED3\u675F\u524D\u591A\u5C11\u5206\u949F\u9884\u751F\u6210\u901A\u77E5\u5185\u5BB9" })] }), _jsxs("div", { className: "mt-2", children: [_jsxs("button", { onClick: () => setIsAdvancedOpen(!isAdvancedOpen), className: "flex items-center gap-1 text-blue-500 hover:text-blue-700", children: [_jsxs("span", { children: [isAdvancedOpen ? '收起' : '展开', "\u9AD8\u7EA7\u8BBE\u7F6E"] }), _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: `h-4 w-4 transition-transform ${isAdvancedOpen ? 'rotate-180' : ''}`, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) })] }), isAdvancedOpen && (_jsx("div", { className: "mt-3 p-3 bg-gray-50 rounded-md", children: _jsxs("div", { className: "flex flex-col gap-3", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "ai-provider", className: "block font-medium mb-1", children: "AI \u63D0\u4F9B\u5546" }), _jsxs("select", { id: "ai-provider", value: provider, onChange: handleProviderChange, className: "w-full border border-gray-300 rounded-md px-3 py-2 outline-none", children: [_jsx("option", { value: AIProvider.DEEPSEEK, children: "DeepSeek" }), _jsx("option", { value: AIProvider.OPENAI, children: "OpenAI" })] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "ai-model", className: "block font-medium mb-1", children: "\u6A21\u578B" }), _jsx("input", { id: "ai-model", type: "text", value: model, onChange: handleModelChange, className: "w-full border border-gray-300 rounded-md px-3 py-2 outline-none" })] })] }) }))] })] }))] }));
};
