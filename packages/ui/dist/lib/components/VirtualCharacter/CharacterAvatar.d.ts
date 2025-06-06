import React from 'react';
type CharacterState = {
    isVisible: boolean;
    isAnimating: boolean;
    isChatOpen: boolean;
    currentAnimation: string;
    position: {
        x: number;
        y: number;
    };
};
type CharacterAvatarProps = {
    onCharacterClick: () => void;
    characterState: CharacterState;
};
export declare const CharacterAvatar: React.FC<CharacterAvatarProps>;
export declare const characterAvatarStyles = "\n  @keyframes pulse {\n    0%, 100% {\n      opacity: 1;\n    }\n    50% {\n      opacity: 0.5;\n    }\n  }\n\n  .character-avatar {\n    user-select: none;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n  }\n\n  .character-avatar:hover {\n    animation-duration: 0.5s !important;\n  }\n\n  .animate-pulse {\n    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;\n  }\n\n  .animate-bounce {\n    animation: bounce 1s infinite;\n  }\n\n  @keyframes bounce {\n    0%, 100% {\n      transform: translateY(0);\n      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);\n    }\n    50% {\n      transform: translateY(-25%);\n      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);\n    }\n  }\n";
export {};
