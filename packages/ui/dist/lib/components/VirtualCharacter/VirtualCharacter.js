import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useStorage } from '@extension/shared';
import { characterStorage } from '@extension/storage';
import { CharacterAvatar } from './CharacterAvatar';
import { ChatDialog } from './ChatDialog';
export const VirtualCharacter = ({ className }) => {
    const config = useStorage(characterStorage);
    const [characterState, setCharacterState] = useState({
        isVisible: false,
        isAnimating: false,
        isChatOpen: false,
        currentAnimation: 'idle',
        position: { x: 0, y: 0 },
    });
    const [extensionContextValid, setExtensionContextValid] = useState(true);
    // Check extension context validity
    useEffect(() => {
        const checkExtensionContext = () => {
            try {
                // Check if chrome runtime is available
                if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id) {
                    setExtensionContextValid(true);
                }
                else {
                    setExtensionContextValid(false);
                    console.warn('Extension context is not valid');
                }
            }
            catch (error) {
                setExtensionContextValid(false);
                console.warn('Extension context check failed:', error);
            }
        };
        checkExtensionContext();
        // Check periodically in case context becomes invalid
        const interval = setInterval(checkExtensionContext, 5000);
        return () => clearInterval(interval);
    }, []);
    // Initialize character when component mounts
    useEffect(() => {
        if (!extensionContextValid) {
            console.warn('Skipping character initialization - extension context invalid');
            return;
        }
        initializeCharacter();
        // Listen for character state changes from the service
        const handleStateChange = (event) => {
            setCharacterState(event.detail);
        };
        window.addEventListener('characterStateChange', handleStateChange);
        return () => {
            window.removeEventListener('characterStateChange', handleStateChange);
        };
    }, [extensionContextValid]);
    // Update character visibility when config changes
    useEffect(() => {
        if (config.enabled && !characterState.isVisible) {
            showCharacter();
        }
        else if (!config.enabled && characterState.isVisible) {
            hideCharacter();
        }
    }, [config.enabled]);
    // Update character position when config changes
    useEffect(() => {
        if (characterState.isVisible) {
            updateCharacterPosition();
        }
    }, [config.appearance.position, config.appearance.size]);
    const initializeCharacter = async () => {
        try {
            if (config.enabled) {
                await showCharacter();
            }
        }
        catch (error) {
            console.error('Error initializing character:', error);
        }
    };
    const showCharacter = async () => {
        try {
            const position = calculatePosition();
            setCharacterState(prev => ({
                ...prev,
                isVisible: true,
                position,
            }));
            // Play greeting animation
            setTimeout(() => {
                playAnimation('greeting');
            }, 100);
            console.log('Virtual character shown');
        }
        catch (error) {
            console.error('Error showing character:', error);
        }
    };
    const hideCharacter = async () => {
        try {
            setCharacterState(prev => ({
                ...prev,
                isVisible: false,
                isChatOpen: false,
            }));
            console.log('Virtual character hidden');
        }
        catch (error) {
            console.error('Error hiding character:', error);
        }
    };
    const calculatePosition = () => {
        const padding = 20;
        const characterSize = getCharacterSize();
        switch (config.appearance.position) {
            case 'bottom-right':
                return {
                    x: window.innerWidth - characterSize - padding,
                    y: window.innerHeight - characterSize - padding,
                };
            case 'bottom-left':
                return {
                    x: padding,
                    y: window.innerHeight - characterSize - padding,
                };
            case 'top-right':
                return {
                    x: window.innerWidth - characterSize - padding,
                    y: padding,
                };
            case 'top-left':
                return {
                    x: padding,
                    y: padding,
                };
            default:
                return {
                    x: window.innerWidth - characterSize - padding,
                    y: window.innerHeight - characterSize - padding,
                };
        }
    };
    const getCharacterSize = () => {
        const sizes = {
            small: 48,
            medium: 60,
            large: 72,
        };
        return sizes[config.appearance.size] || 60;
    };
    const updateCharacterPosition = () => {
        const newPosition = calculatePosition();
        setCharacterState(prev => ({
            ...prev,
            position: newPosition,
        }));
    };
    const playAnimation = (animation) => {
        setCharacterState(prev => ({
            ...prev,
            isAnimating: true,
            currentAnimation: animation,
        }));
        // Animation duration
        const duration = getAnimationDuration(animation);
        setTimeout(() => {
            setCharacterState(prev => ({
                ...prev,
                isAnimating: false,
                currentAnimation: 'idle',
            }));
        }, duration);
    };
    const getAnimationDuration = (animation) => {
        const durations = {
            idle: 2000,
            greeting: 3000,
            thinking: 4000,
            speaking: 2000,
            celebrating: 5000,
            encouraging: 4000,
            sleeping: 6000,
        };
        return durations[animation] || 2000;
    };
    const handleCharacterClick = async () => {
        try {
            // Use character manager if available
            if (typeof window !== 'undefined' && window.characterManager) {
                await window.characterManager.handleCharacterClick();
            }
            else {
                // Fallback: local handling
                await characterStorage.updateLastInteraction();
                if (characterState.isChatOpen) {
                    handleCloseChatDialog();
                }
                else {
                    handleOpenChatDialog();
                }
            }
        }
        catch (error) {
            console.error('Error handling character click:', error);
        }
    };
    const handleOpenChatDialog = async () => {
        try {
            setCharacterState(prev => ({
                ...prev,
                isChatOpen: true,
            }));
            // Play greeting animation
            playAnimation('greeting');
            console.log('Chat dialog opened');
        }
        catch (error) {
            console.error('Error opening chat dialog:', error);
        }
    };
    const handleCloseChatDialog = async () => {
        try {
            setCharacterState(prev => ({
                ...prev,
                isChatOpen: false,
            }));
            console.log('Chat dialog closed');
        }
        catch (error) {
            console.error('Error closing chat dialog:', error);
        }
    };
    const handleSendMessage = async (message, type = 'text') => {
        try {
            // Send message through character manager if available
            if (typeof window !== 'undefined' && window.characterManager) {
                await window.characterManager.sendMessage(message, type);
            }
            else {
                // Fallback: simple local handling
                playAnimation('thinking');
                await new Promise(resolve => setTimeout(resolve, 1000));
                playAnimation('speaking');
                console.log('Message sent:', message);
            }
        }
        catch (error) {
            console.error('Error sending message:', error);
        }
    };
    const handleTaskExecute = async (taskId, query) => {
        try {
            // Execute task through character manager if available
            if (typeof window !== 'undefined' && window.characterManager) {
                await window.characterManager.executeTask(taskId, query);
            }
            else {
                console.log('Task execution requested:', { taskId, query });
            }
        }
        catch (error) {
            console.error('Error executing task:', error);
        }
    };
    // Handle window resize to update character position
    useEffect(() => {
        const handleResize = () => {
            if (characterState.isVisible) {
                updateCharacterPosition();
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [characterState.isVisible, config.appearance.position, config.appearance.size]);
    // Don't render anything if character is not enabled or extension context is invalid
    if (!config.enabled || !extensionContextValid) {
        return null;
    }
    return (_jsxs("div", { className: className, children: [_jsx(CharacterAvatar, { onCharacterClick: handleCharacterClick, characterState: characterState }), _jsx(ChatDialog, { isOpen: characterState.isChatOpen, onClose: handleCloseChatDialog, onSendMessage: handleSendMessage, onTaskExecute: handleTaskExecute, characterPosition: characterState.position })] }));
};
