import React from 'react';
type TaskSelectorProps = {
    isOpen: boolean;
    onClose: () => void;
    onTaskSelect: (taskId: string, query: string) => void;
    suggestedTask?: string;
    suggestedQuery?: string;
    isDark?: boolean;
};
export declare const TaskSelector: React.FC<TaskSelectorProps>;
export {};
