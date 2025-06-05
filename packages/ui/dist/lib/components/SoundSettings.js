import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useStorage } from '@extension/shared';
import { soundSettingsStorage } from '@extension/storage';
import { useState } from 'react';
export const SoundSettings = () => {
    const soundSettings = useStorage(soundSettingsStorage);
    const [isTestPlaying, setIsTestPlaying] = useState(false);
    const handleToggleSound = async () => {
        await soundSettingsStorage.enableSound(!soundSettings.enabled);
    };
    const handleVolumeChange = async (event) => {
        const volume = parseFloat(event.target.value);
        await soundSettingsStorage.setVolume(volume);
    };
    const handleTestSound = async () => {
        if (isTestPlaying)
            return;
        setIsTestPlaying(true);
        try {
            // 播放测试音频
            const audio = new Audio(chrome.runtime.getURL('notification.mp3'));
            audio.volume = soundSettings.volume;
            await audio.play();
        }
        catch (error) {
            console.error('Error playing test sound:', error);
        }
        finally {
            setIsTestPlaying(false);
        }
    };
    return (_jsxs("div", { className: "space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: "\uD83D\uDD0A \u58F0\u97F3\u8BBE\u7F6E" }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("label", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: "\u542F\u7528\u901A\u77E5\u58F0\u97F3" }), _jsx("button", { onClick: handleToggleSound, className: `relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${soundSettings.enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'}`, children: _jsx("span", { className: `inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${soundSettings.enabled ? 'translate-x-6' : 'translate-x-1'}` }) })] }), soundSettings.enabled && (_jsxs("div", { className: "space-y-2", children: [_jsxs("label", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: ["\u97F3\u91CF: ", Math.round(soundSettings.volume * 100), "%"] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-xs text-gray-500", children: "\uD83D\uDD08" }), _jsx("input", { type: "range", min: "0", max: "1", step: "0.1", value: soundSettings.volume, onChange: handleVolumeChange, className: "flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" }), _jsx("span", { className: "text-xs text-gray-500", children: "\uD83D\uDD0A" })] }), _jsx("button", { onClick: handleTestSound, disabled: isTestPlaying, className: `w-full px-3 py-2 text-sm font-medium rounded-md transition-colors ${isTestPlaying
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400'
                            : 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800'}`, children: isTestPlaying ? '播放中...' : '🎵 测试声音' })] }))] }));
};
