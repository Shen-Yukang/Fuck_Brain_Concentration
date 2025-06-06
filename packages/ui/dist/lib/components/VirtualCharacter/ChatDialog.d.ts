import React from 'react';
type ChatDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    onSendMessage: (message: string, type: 'text' | 'voice') => Promise<void>;
    characterPosition: {
        x: number;
        y: number;
    };
};
export declare const ChatDialog: React.FC<ChatDialogProps>;
export {};
