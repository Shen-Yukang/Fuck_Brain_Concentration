import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
export const TaskProgress = ({ isOpen, onClose, onCancel, taskState, isDark = false, }) => {
    const [dots, setDots] = useState('');
    // Animate loading dots
    useEffect(() => {
        if (taskState?.status === 'running' || taskState?.status === 'pending') {
            const interval = setInterval(() => {
                setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
            }, 500);
            return () => clearInterval(interval);
        }
        return undefined;
    }, [taskState?.status]);
    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending':
                return '⏳';
            case 'running':
                return '🔄';
            case 'completed':
                return '✅';
            case 'failed':
                return '❌';
            case 'cancelled':
                return '⏹️';
            case 'timeout':
                return '⏰';
            default:
                return '❓';
        }
    };
    const getStatusLabel = (status) => {
        switch (status) {
            case 'pending':
                return '等待中';
            case 'running':
                return '执行中';
            case 'completed':
                return '已完成';
            case 'failed':
                return '执行失败';
            case 'cancelled':
                return '已取消';
            case 'timeout':
                return '执行超时';
            default:
                return '未知状态';
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return '#f59e0b';
            case 'running':
                return '#3b82f6';
            case 'completed':
                return '#10b981';
            case 'failed':
                return '#ef4444';
            case 'cancelled':
                return '#6b7280';
            case 'timeout':
                return '#f59e0b';
            default:
                return '#6b7280';
        }
    };
    const formatDuration = (startTime, endTime) => {
        const duration = (endTime || Date.now()) - startTime;
        const seconds = Math.floor(duration / 1000);
        const minutes = Math.floor(seconds / 60);
        if (minutes > 0) {
            return `${minutes}分${seconds % 60}秒`;
        }
        return `${seconds}秒`;
    };
    const canCancel = taskState?.status === 'running' || taskState?.status === 'pending';
    if (!isOpen || !taskState)
        return null;
    return (_jsxs("div", { style: {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            zIndex: 10003,
            backgroundColor: isDark ? '#1f2937' : '#ffffff',
            border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
        }, children: [_jsxs("div", { style: {
                    padding: '16px 20px',
                    borderBottom: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                    backgroundColor: isDark ? '#374151' : '#f9fafb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '8px' }, children: [_jsx("span", { style: { fontSize: '18px' }, children: getStatusIcon(taskState.status) }), _jsx("span", { style: {
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    color: isDark ? '#f9fafb' : '#111827',
                                }, children: "\u4EFB\u52A1\u6267\u884C\u72B6\u6001" })] }), _jsx("button", { onClick: onClose, style: {
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: isDark ? '#9ca3af' : '#6b7280',
                            fontSize: '20px',
                            padding: '4px',
                            borderRadius: '4px',
                        }, onMouseEnter: e => {
                            e.currentTarget.style.backgroundColor = isDark ? '#4b5563' : '#f3f4f6';
                        }, onMouseLeave: e => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                        }, children: "\u00D7" })] }), _jsxs("div", { style: { padding: '20px' }, children: [_jsxs("div", { style: { marginBottom: '20px' }, children: [_jsxs("div", { style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    marginBottom: '8px',
                                }, children: [_jsx("div", { style: {
                                            width: '8px',
                                            height: '8px',
                                            borderRadius: '50%',
                                            backgroundColor: getStatusColor(taskState.status),
                                        } }), _jsxs("span", { style: {
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            color: isDark ? '#f9fafb' : '#111827',
                                        }, children: [getStatusLabel(taskState.status), (taskState.status === 'running' || taskState.status === 'pending') && dots] })] }), taskState.message && (_jsx("div", { style: {
                                    fontSize: '13px',
                                    color: isDark ? '#9ca3af' : '#6b7280',
                                    marginLeft: '16px',
                                }, children: taskState.message }))] }), (taskState.status === 'running' || taskState.status === 'pending') && (_jsxs("div", { style: { marginBottom: '20px' }, children: [_jsxs("div", { style: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '6px',
                                }, children: [_jsx("span", { style: {
                                            fontSize: '12px',
                                            fontWeight: '500',
                                            color: isDark ? '#f9fafb' : '#111827',
                                        }, children: "\u8FDB\u5EA6" }), _jsxs("span", { style: {
                                            fontSize: '12px',
                                            color: isDark ? '#9ca3af' : '#6b7280',
                                        }, children: [taskState.progress, "%"] })] }), _jsx("div", { style: {
                                    width: '100%',
                                    height: '6px',
                                    backgroundColor: isDark ? '#374151' : '#e5e7eb',
                                    borderRadius: '3px',
                                    overflow: 'hidden',
                                }, children: _jsx("div", { style: {
                                        width: `${taskState.progress}%`,
                                        height: '100%',
                                        backgroundColor: '#3b82f6',
                                        borderRadius: '3px',
                                        transition: 'width 0.3s ease',
                                    } }) })] })), _jsxs("div", { style: {
                            padding: '12px',
                            backgroundColor: isDark ? '#374151' : '#f3f4f6',
                            borderRadius: '8px',
                            marginBottom: '20px',
                        }, children: [_jsx("div", { style: {
                                    fontSize: '12px',
                                    fontWeight: '500',
                                    color: isDark ? '#f9fafb' : '#111827',
                                    marginBottom: '6px',
                                }, children: "\u4EFB\u52A1\u4FE1\u606F" }), _jsxs("div", { style: {
                                    fontSize: '11px',
                                    color: isDark ? '#9ca3af' : '#6b7280',
                                    lineHeight: '1.4',
                                }, children: [_jsxs("div", { children: ["\u4EFB\u52A1ID: ", taskState.taskId] }), _jsxs("div", { children: ["\u6267\u884CID: ", taskState.id] }), _jsxs("div", { children: ["\u5F00\u59CB\u65F6\u95F4: ", new Date(taskState.startTime).toLocaleTimeString()] }), _jsxs("div", { children: ["\u6301\u7EED\u65F6\u95F4: ", formatDuration(taskState.startTime, taskState.endTime)] }), taskState.currentSite && (_jsxs("div", { children: ["\u5F53\u524D\u641C\u7D22: ", taskState.currentSite] }))] })] }), taskState.error && (_jsxs("div", { style: {
                            padding: '12px',
                            backgroundColor: isDark ? '#7f1d1d' : '#fef2f2',
                            border: `1px solid ${isDark ? '#dc2626' : '#fecaca'}`,
                            borderRadius: '8px',
                            marginBottom: '20px',
                        }, children: [_jsx("div", { style: {
                                    fontSize: '12px',
                                    fontWeight: '500',
                                    color: isDark ? '#fca5a5' : '#dc2626',
                                    marginBottom: '4px',
                                }, children: "\u9519\u8BEF\u4FE1\u606F" }), _jsx("div", { style: {
                                    fontSize: '11px',
                                    color: isDark ? '#fca5a5' : '#dc2626',
                                    lineHeight: '1.4',
                                }, children: taskState.error })] })), _jsxs("div", { style: { display: 'flex', justifyContent: 'flex-end', gap: '8px' }, children: [canCancel && onCancel && (_jsx("button", { onClick: () => onCancel(taskState.id), style: {
                                    padding: '8px 16px',
                                    border: `1px solid ${isDark ? '#dc2626' : '#fecaca'}`,
                                    borderRadius: '6px',
                                    backgroundColor: isDark ? '#7f1d1d' : '#fef2f2',
                                    color: isDark ? '#fca5a5' : '#dc2626',
                                    fontSize: '12px',
                                    cursor: 'pointer',
                                    fontWeight: '500',
                                }, onMouseEnter: e => {
                                    e.currentTarget.style.backgroundColor = isDark ? '#991b1b' : '#fee2e2';
                                }, onMouseLeave: e => {
                                    e.currentTarget.style.backgroundColor = isDark ? '#7f1d1d' : '#fef2f2';
                                }, children: "\u53D6\u6D88\u4EFB\u52A1" })), _jsx("button", { onClick: onClose, style: {
                                    padding: '8px 16px',
                                    border: 'none',
                                    borderRadius: '6px',
                                    backgroundColor: '#3b82f6',
                                    color: '#ffffff',
                                    fontSize: '12px',
                                    cursor: 'pointer',
                                    fontWeight: '500',
                                }, onMouseEnter: e => {
                                    e.currentTarget.style.backgroundColor = '#2563eb';
                                }, onMouseLeave: e => {
                                    e.currentTarget.style.backgroundColor = '#3b82f6';
                                }, children: taskState.status === 'completed' || taskState.status === 'failed' || taskState.status === 'cancelled'
                                    ? '关闭'
                                    : '后台运行' })] })] })] }));
};
