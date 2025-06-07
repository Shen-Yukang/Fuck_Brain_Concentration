import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useStorage } from '@extension/shared';
import { mcpConfigStorage } from '@extension/storage';
export const TaskSelector = ({ isOpen, onClose, onTaskSelect, suggestedTask, suggestedQuery = '', isDark = false, }) => {
    const mcpConfig = useStorage(mcpConfigStorage);
    const [selectedTaskId, setSelectedTaskId] = useState(suggestedTask || '');
    const [query, setQuery] = useState(suggestedQuery);
    const [maxResults, setMaxResults] = useState(20);
    useEffect(() => {
        if (suggestedTask) {
            setSelectedTaskId(suggestedTask);
        }
        if (suggestedQuery) {
            setQuery(suggestedQuery);
        }
    }, [suggestedTask, suggestedQuery]);
    const availableTasks = mcpConfig.tasks.filter(task => task.enabled);
    const selectedTask = availableTasks.find(task => task.id === selectedTaskId);
    const handleExecute = () => {
        if (!selectedTaskId || !query.trim()) {
            return;
        }
        onTaskSelect(selectedTaskId, query.trim());
        onClose();
    };
    const getTaskIcon = (taskType) => {
        switch (taskType) {
            case 'research':
                return '🔬';
            case 'web_search':
                return '🔍';
            case 'data_collection':
                return '📊';
            case 'content_analysis':
                return '📝';
            default:
                return '🤖';
        }
    };
    const getTaskTypeLabel = (taskType) => {
        switch (taskType) {
            case 'research':
                return '学术研究';
            case 'web_search':
                return '网络搜索';
            case 'data_collection':
                return '数据收集';
            case 'content_analysis':
                return '内容分析';
            default:
                return '未知类型';
        }
    };
    if (!isOpen)
        return null;
    return (_jsxs("div", { style: {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '480px',
            maxHeight: '600px',
            zIndex: 10002,
            backgroundColor: isDark ? '#1f2937' : '#ffffff',
            border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
            borderRadius: '16px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
        }, children: [_jsx("div", { style: {
                    padding: '20px 24px',
                    borderBottom: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                    backgroundColor: isDark ? '#374151' : '#f9fafb',
                }, children: _jsxs("div", { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }, children: [_jsxs("div", { children: [_jsx("h3", { style: {
                                        margin: 0,
                                        fontSize: '18px',
                                        fontWeight: '600',
                                        color: isDark ? '#f9fafb' : '#111827',
                                    }, children: "\uD83E\uDD16 \u9009\u62E9\u7814\u7A76\u4EFB\u52A1" }), _jsx("p", { style: {
                                        margin: '4px 0 0 0',
                                        fontSize: '14px',
                                        color: isDark ? '#9ca3af' : '#6b7280',
                                    }, children: "\u9009\u62E9\u4E00\u4E2A\u4EFB\u52A1\u7C7B\u578B\u6765\u5E2E\u52A9\u60A8\u8FDB\u884C\u81EA\u52A8\u5316\u7814\u7A76" })] }), _jsx("button", { onClick: onClose, style: {
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: isDark ? '#9ca3af' : '#6b7280',
                                fontSize: '24px',
                                padding: '4px',
                                borderRadius: '6px',
                            }, onMouseEnter: e => {
                                e.currentTarget.style.backgroundColor = isDark ? '#4b5563' : '#f3f4f6';
                            }, onMouseLeave: e => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                            }, children: "\u00D7" })] }) }), _jsxs("div", { style: { padding: '24px', flex: 1, overflowY: 'auto' }, children: [_jsxs("div", { style: { marginBottom: '24px' }, children: [_jsx("label", { style: {
                                    display: 'block',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: isDark ? '#f9fafb' : '#111827',
                                    marginBottom: '8px',
                                }, children: "\u4EFB\u52A1\u7C7B\u578B" }), _jsx("div", { style: { display: 'grid', gap: '8px' }, children: availableTasks.map(task => (_jsxs("div", { onClick: () => setSelectedTaskId(task.id), style: {
                                        padding: '12px 16px',
                                        border: `2px solid ${selectedTaskId === task.id ? '#3b82f6' : isDark ? '#374151' : '#e5e7eb'}`,
                                        borderRadius: '8px',
                                        backgroundColor: selectedTaskId === task.id ? (isDark ? '#1e3a8a' : '#eff6ff') : isDark ? '#374151' : '#ffffff',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                    }, onMouseEnter: e => {
                                        if (selectedTaskId !== task.id) {
                                            e.currentTarget.style.backgroundColor = isDark ? '#4b5563' : '#f9fafb';
                                        }
                                    }, onMouseLeave: e => {
                                        if (selectedTaskId !== task.id) {
                                            e.currentTarget.style.backgroundColor = isDark ? '#374151' : '#ffffff';
                                        }
                                    }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '12px' }, children: [_jsx("span", { style: { fontSize: '20px' }, children: getTaskIcon(task.type) }), _jsxs("div", { style: { flex: 1 }, children: [_jsx("div", { style: {
                                                                fontSize: '14px',
                                                                fontWeight: '500',
                                                                color: isDark ? '#f9fafb' : '#111827',
                                                                marginBottom: '2px',
                                                            }, children: task.name }), _jsxs("div", { style: {
                                                                fontSize: '12px',
                                                                color: isDark ? '#9ca3af' : '#6b7280',
                                                            }, children: [getTaskTypeLabel(task.type), " \u2022 \u6700\u591A ", task.maxResults, " \u4E2A\u7ED3\u679C"] })] }), selectedTaskId === task.id && (_jsx("div", { style: {
                                                        width: '20px',
                                                        height: '20px',
                                                        borderRadius: '50%',
                                                        backgroundColor: '#3b82f6',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        color: '#ffffff',
                                                        fontSize: '12px',
                                                    }, children: "\u2713" }))] }), _jsx("div", { style: {
                                                fontSize: '12px',
                                                color: isDark ? '#9ca3af' : '#6b7280',
                                                marginTop: '8px',
                                                lineHeight: '1.4',
                                            }, children: task.description })] }, task.id))) })] }), _jsxs("div", { style: { marginBottom: '24px' }, children: [_jsx("label", { style: {
                                    display: 'block',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: isDark ? '#f9fafb' : '#111827',
                                    marginBottom: '8px',
                                }, children: "\u641C\u7D22\u5173\u952E\u8BCD" }), _jsx("textarea", { value: query, onChange: e => setQuery(e.target.value), placeholder: "\u8F93\u5165\u60A8\u8981\u641C\u7D22\u7684\u5173\u952E\u8BCD\u6216\u95EE\u9898...", rows: 3, style: {
                                    width: '100%',
                                    padding: '12px',
                                    border: `1px solid ${isDark ? '#4b5563' : '#d1d5db'}`,
                                    borderRadius: '8px',
                                    backgroundColor: isDark ? '#1f2937' : '#ffffff',
                                    color: isDark ? '#f9fafb' : '#111827',
                                    fontSize: '14px',
                                    resize: 'vertical',
                                    outline: 'none',
                                    fontFamily: 'inherit',
                                }, onFocus: e => {
                                    e.currentTarget.style.borderColor = '#3b82f6';
                                }, onBlur: e => {
                                    e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                                } })] }), _jsxs("div", { style: { marginBottom: '24px' }, children: [_jsx("label", { style: {
                                    display: 'block',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: isDark ? '#f9fafb' : '#111827',
                                    marginBottom: '8px',
                                }, children: "\u6700\u5927\u7ED3\u679C\u6570\u91CF" }), _jsx("input", { type: "number", value: maxResults, onChange: e => setMaxResults(Math.max(1, Math.min(100, parseInt(e.target.value) || 20))), min: "1", max: "100", style: {
                                    width: '100px',
                                    padding: '8px 12px',
                                    border: `1px solid ${isDark ? '#4b5563' : '#d1d5db'}`,
                                    borderRadius: '6px',
                                    backgroundColor: isDark ? '#1f2937' : '#ffffff',
                                    color: isDark ? '#f9fafb' : '#111827',
                                    fontSize: '14px',
                                    outline: 'none',
                                } })] }), selectedTask && (_jsxs("div", { style: {
                            padding: '12px',
                            backgroundColor: isDark ? '#374151' : '#f3f4f6',
                            borderRadius: '8px',
                            marginBottom: '24px',
                        }, children: [_jsx("div", { style: {
                                    fontSize: '12px',
                                    fontWeight: '500',
                                    color: isDark ? '#f9fafb' : '#111827',
                                    marginBottom: '4px',
                                }, children: "\u4EFB\u52A1\u8BE6\u60C5" }), _jsxs("div", { style: {
                                    fontSize: '11px',
                                    color: isDark ? '#9ca3af' : '#6b7280',
                                    lineHeight: '1.4',
                                }, children: ["\u641C\u7D22\u7AD9\u70B9:", ' ', selectedTask.sites
                                        .filter(s => s.enabled)
                                        .map(s => s.name)
                                        .join(', '), _jsx("br", {}), "\u8D85\u65F6\u65F6\u95F4: ", selectedTask.timeout, "\u79D2 \u2022 \u91CD\u8BD5\u6B21\u6570: ", selectedTask.retryAttempts] })] }))] }), _jsxs("div", { style: {
                    padding: '16px 24px',
                    borderTop: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                    backgroundColor: isDark ? '#374151' : '#f9fafb',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '12px',
                }, children: [_jsx("button", { onClick: onClose, style: {
                            padding: '8px 16px',
                            border: `1px solid ${isDark ? '#4b5563' : '#d1d5db'}`,
                            borderRadius: '6px',
                            backgroundColor: isDark ? '#1f2937' : '#ffffff',
                            color: isDark ? '#f9fafb' : '#374151',
                            fontSize: '14px',
                            cursor: 'pointer',
                            fontWeight: '500',
                        }, children: "\u53D6\u6D88" }), _jsx("button", { onClick: handleExecute, disabled: !selectedTaskId || !query.trim(), style: {
                            padding: '8px 16px',
                            border: 'none',
                            borderRadius: '6px',
                            backgroundColor: !selectedTaskId || !query.trim() ? (isDark ? '#4b5563' : '#e5e7eb') : '#3b82f6',
                            color: !selectedTaskId || !query.trim() ? (isDark ? '#9ca3af' : '#9ca3af') : '#ffffff',
                            fontSize: '14px',
                            cursor: !selectedTaskId || !query.trim() ? 'not-allowed' : 'pointer',
                            fontWeight: '500',
                        }, children: "\uD83D\uDE80 \u5F00\u59CB\u7814\u7A76" })] })] }));
};
