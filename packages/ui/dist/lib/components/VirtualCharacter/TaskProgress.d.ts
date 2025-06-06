import React from 'react';
type TaskExecutionState = {
    id: string;
    taskId: string;
    status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled' | 'timeout';
    progress: number;
    startTime: number;
    endTime?: number;
    currentSite?: string;
    message?: string;
    error?: string;
};
type TaskProgressProps = {
    isOpen: boolean;
    onClose: () => void;
    onCancel?: (executionId: string) => void;
    taskState?: TaskExecutionState;
    isDark?: boolean;
};
export declare const TaskProgress: React.FC<TaskProgressProps>;
export {};
