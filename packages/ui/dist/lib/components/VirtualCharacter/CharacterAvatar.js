import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useStorage } from '@extension/shared';
import { characterStorage } from '@extension/storage';
export const CharacterAvatar = ({ onCharacterClick, characterState }) => {
    const config = useStorage(characterStorage);
    const [isHovered, setIsHovered] = useState(false);
    // Don't render if character is not visible
    if (!characterState.isVisible) {
        return null;
    }
    // Get character size based on configuration
    const getCharacterSize = () => {
        const sizes = {
            small: 48,
            medium: 60,
            large: 72,
        };
        return sizes[config.appearance.size] || 60;
    };
    // Get character style based on configuration
    const getCharacterStyle = () => {
        const size = getCharacterSize();
        const isDark = config.appearance.theme === 'dark' ||
            (config.appearance.theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        return {
            width: `${size}px`,
            height: `${size}px`,
            position: 'fixed',
            left: `${characterState.position.x}px`,
            top: `${characterState.position.y}px`,
            zIndex: 10000,
            cursor: 'pointer',
            borderRadius: '50%',
            transition: 'all 0.3s ease',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            filter: isHovered ? 'brightness(1.1)' : 'brightness(1)',
            backgroundColor: isDark ? '#374151' : '#f3f4f6',
            border: `2px solid ${isDark ? '#6b7280' : '#d1d5db'}`,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        };
    };
    // Get animation classes
    const getAnimationClasses = () => {
        const baseClasses = 'character-avatar';
        const animationClasses = {
            idle: 'animate-pulse',
            greeting: 'animate-bounce',
            thinking: 'animate-pulse',
            speaking: 'animate-pulse',
            celebrating: 'animate-bounce',
            encouraging: 'animate-pulse',
            sleeping: 'animate-pulse',
        };
        const animationClass = animationClasses[characterState.currentAnimation] || '';
        return `${baseClasses} ${animationClass}`;
    };
    // Render character based on style
    const renderCharacterContent = () => {
        const isDark = config.appearance.theme === 'dark' ||
            (config.appearance.theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        switch (config.appearance.style) {
            case 'cute-mascot':
                return (_jsx("div", { className: "flex items-center justify-center w-full h-full", children: _jsx("span", { style: { fontSize: '24px' }, children: characterState.currentAnimation === 'sleeping'
                            ? '😴'
                            : characterState.currentAnimation === 'thinking'
                                ? '🤔'
                                : characterState.currentAnimation === 'celebrating'
                                    ? '🎉'
                                    : characterState.currentAnimation === 'encouraging'
                                        ? '💪'
                                        : characterState.isChatOpen
                                            ? '😊'
                                            : '🤖' }) }));
            case 'simple-geometric':
                return (_jsx("div", { className: "flex items-center justify-center w-full h-full", children: _jsx("div", { style: {
                            width: '60%',
                            height: '60%',
                            backgroundColor: isDark ? '#60a5fa' : '#3b82f6',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, children: _jsx("div", { style: {
                                width: '40%',
                                height: '40%',
                                backgroundColor: 'white',
                                borderRadius: '50%',
                            } }) }) }));
            case 'minimalist-icon':
                return (_jsx("div", { className: "flex items-center justify-center w-full h-full", children: _jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("circle", { cx: "12", cy: "12", r: "10", stroke: isDark ? '#60a5fa' : '#3b82f6', strokeWidth: "2" }), _jsx("circle", { cx: "8", cy: "10", r: "1", fill: isDark ? '#60a5fa' : '#3b82f6' }), _jsx("circle", { cx: "16", cy: "10", r: "1", fill: isDark ? '#60a5fa' : '#3b82f6' }), _jsx("path", { d: "M8 14s1.5 2 4 2 4-2 4-2", stroke: isDark ? '#60a5fa' : '#3b82f6', strokeWidth: "2", strokeLinecap: "round" })] }) }));
            default:
                return (_jsx("div", { className: "flex items-center justify-center w-full h-full", children: _jsx("span", { style: { fontSize: '24px' }, children: "\uD83E\uDD16" }) }));
        }
    };
    return (_jsxs("div", { className: getAnimationClasses(), style: getCharacterStyle(), onClick: onCharacterClick, onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), title: `${config.personality.name} - 点击聊天`, children: [renderCharacterContent(), characterState.isChatOpen && (_jsx("div", { style: {
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    width: '16px',
                    height: '16px',
                    backgroundColor: '#10b981',
                    borderRadius: '50%',
                    border: '2px solid white',
                    animation: 'pulse 2s infinite',
                } })), characterState.isAnimating && characterState.currentAnimation !== 'idle' && (_jsxs("div", { style: {
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '12px',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    color: 'white',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                }, children: [characterState.currentAnimation === 'thinking' && '思考中...', characterState.currentAnimation === 'speaking' && '说话中...', characterState.currentAnimation === 'celebrating' && '庆祝！', characterState.currentAnimation === 'encouraging' && '加油！', characterState.currentAnimation === 'greeting' && '你好！', characterState.currentAnimation === 'sleeping' && '休息中...'] }))] }));
};
// CSS animations (to be included in global styles)
export const characterAvatarStyles = `
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  .character-avatar {
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }

  .character-avatar:hover {
    animation-duration: 0.5s !important;
  }

  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  .animate-bounce {
    animation: bounce 1s infinite;
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: translateY(-25%);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
  }
`;
