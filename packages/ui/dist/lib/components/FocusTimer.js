import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { focusStorage } from '@extension/storage';
import { useStorage } from '@extension/shared';
import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
export const FocusTimer = ({ className }) => {
    const focusConfig = useStorage(focusStorage);
    const [duration, setDuration] = useState(focusConfig.duration);
    const [remainingTime, setRemainingTime] = useState(0);
    const [isActive, setIsActive] = useState(focusConfig.isActive);
    // 格式化时间为 MM:SS
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    // 计算进度百分比
    const calculateProgress = () => {
        if (!focusConfig.startTime || !focusConfig.endTime)
            return 0;
        const totalDuration = (focusConfig.endTime - focusConfig.startTime) / 1000;
        const elapsed = totalDuration - remainingTime;
        return Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
    };
    // 更新剩余时间
    useEffect(() => {
        let interval = null;
        if (focusConfig.isActive) {
            // 立即获取一次剩余时间
            focusStorage.getRemainingTime().then(time => {
                setRemainingTime(time);
            });
            // 设置定时器每秒更新一次
            interval = setInterval(() => {
                focusStorage.getRemainingTime().then(time => {
                    setRemainingTime(time);
                    // 注意：不再在这里停止专注，而是由后台脚本负责
                    // 这样即使popup关闭，后台脚本也能处理倒计时结束的情况
                });
            }, 1000);
        }
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [focusConfig.isActive]);
    // 同步状态
    useEffect(() => {
        setIsActive(focusConfig.isActive);
        setDuration(focusConfig.duration);
    }, [focusConfig]);
    // 开始专注
    const handleStartFocus = () => {
        focusStorage.startFocus(duration);
    };
    // 停止专注
    const handleStopFocus = () => {
        focusStorage.stopFocus();
    };
    // 更新时长
    const handleDurationChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value > 0) {
            setDuration(value);
        }
    };
    return (_jsxs("div", { className: cn('flex flex-col gap-4 p-4 rounded-lg shadow-md transition-all duration-300', className), style: { backgroundColor: 'rgba(255, 255, 255, 0.8)' }, children: [_jsxs("h2", { className: "text-lg font-bold flex items-center gap-2", children: [_jsx("span", { className: "inline-block w-1.5 h-5 bg-blue-500 rounded-sm" }), "\u4E13\u6CE8\u65F6\u95F4\u8BBE\u7F6E"] }), isActive ? (_jsxs("div", { className: "flex flex-col items-center py-3", children: [_jsxs("div", { className: "relative w-32 h-32 mb-4 flex items-center justify-center", children: [_jsxs("svg", { className: "absolute w-full h-full -rotate-90", viewBox: "0 0 100 100", children: [_jsx("circle", { cx: "50", cy: "50", r: "45", fill: "none", stroke: "#e5e7eb", strokeWidth: "8" }), _jsx("circle", { cx: "50", cy: "50", r: "45", fill: "none", stroke: "#3b82f6", strokeWidth: "8", strokeLinecap: "round", strokeDasharray: "283", strokeDashoffset: 283 - (283 * calculateProgress()) / 100, style: { transition: 'stroke-dashoffset 1s ease-in-out' } })] }), _jsx("div", { className: "text-3xl font-bold z-10", children: formatTime(remainingTime) })] }), _jsx("button", { onClick: handleStopFocus, className: "py-2 px-6 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-white font-bold", style: { background: 'linear-gradient(to right, #ef4444, #dc2626)' }, children: "\u505C\u6B62\u4E13\u6CE8" })] })) : (_jsxs("div", { className: "flex flex-col gap-4 py-2", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("label", { htmlFor: "duration", className: "whitespace-nowrap font-medium", children: "\u4E13\u6CE8\u65F6\u957F (\u5206\u949F):" }), _jsx("div", { className: "relative", children: _jsx("input", { id: "duration", type: "number", min: "1", max: "180", value: duration, onChange: handleDurationChange, className: "border border-gray-300 rounded-md px-3 py-2 w-20 text-center outline-none", style: { transition: 'all 0.3s ease' } }) })] }), _jsx("button", { onClick: handleStartFocus, className: "py-2 px-6 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-white font-bold", style: { background: 'linear-gradient(to right, #22c55e, #16a34a)' }, children: "\u5F00\u59CB\u4E13\u6CE8" })] }))] }));
};
