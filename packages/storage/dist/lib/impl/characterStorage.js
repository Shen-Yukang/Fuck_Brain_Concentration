import { createStorage, StorageEnum } from '../base/index.js';
// Default character configuration
const defaultCharacterConfig = {
    enabled: false,
    appearance: {
        style: 'cute-mascot',
        size: 'medium',
        position: 'bottom-right',
        theme: 'auto',
    },
    behavior: {
        idleAnimations: true,
        proactiveChat: false,
        focusModeIntegration: true,
        interactionFrequency: 'medium',
        contextualTips: true,
    },
    personality: {
        name: '小助手',
        personality: 'encouraging',
        responseStyle: 'conversational',
    },
};
// Default chat history
const defaultChatHistory = {
    sessions: [],
    maxSessions: 50, // Keep last 50 sessions
    totalMessages: 0,
};
// Create character configuration storage
const characterConfigBaseStorage = createStorage('character-config-storage-key', defaultCharacterConfig, {
    storageEnum: StorageEnum.Local,
    liveUpdate: true,
});
// Create chat history storage
const chatHistoryBaseStorage = createStorage('character-chat-history-storage-key', defaultChatHistory, {
    storageEnum: StorageEnum.Local,
    liveUpdate: false, // Don't need live updates for chat history
});
// Extended character storage
export const characterStorage = {
    ...characterConfigBaseStorage,
    enable: async (enabled) => {
        await characterConfigBaseStorage.set(current => ({
            ...current,
            enabled,
        }));
    },
    updateAppearance: async (appearance) => {
        await characterConfigBaseStorage.set(current => ({
            ...current,
            appearance: { ...current.appearance, ...appearance },
        }));
    },
    updateBehavior: async (behavior) => {
        await characterConfigBaseStorage.set(current => ({
            ...current,
            behavior: { ...current.behavior, ...behavior },
        }));
    },
    updatePersonality: async (personality) => {
        await characterConfigBaseStorage.set(current => ({
            ...current,
            personality: { ...current.personality, ...personality },
        }));
    },
    setCurrentSession: async (sessionId) => {
        await characterConfigBaseStorage.set(current => ({
            ...current,
            currentSession: sessionId,
        }));
    },
    updateLastInteraction: async () => {
        await characterConfigBaseStorage.set(current => ({
            ...current,
            lastInteraction: Date.now(),
        }));
    },
};
// Extended chat history storage
export const chatHistoryStorage = {
    ...chatHistoryBaseStorage,
    addMessage: async (message) => {
        const newMessage = {
            ...message,
            id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
            timestamp: Date.now(),
        };
        const currentConfig = await characterStorage.get();
        const currentSessionId = currentConfig.currentSession;
        await chatHistoryBaseStorage.set(current => {
            const updatedSessions = [...current.sessions];
            if (currentSessionId) {
                const sessionIndex = updatedSessions.findIndex(s => s.id === currentSessionId);
                if (sessionIndex !== -1) {
                    updatedSessions[sessionIndex] = {
                        ...updatedSessions[sessionIndex],
                        messages: [...updatedSessions[sessionIndex].messages, newMessage],
                    };
                }
            }
            return {
                ...current,
                sessions: updatedSessions,
                totalMessages: current.totalMessages + 1,
            };
        });
        return newMessage;
    },
    startSession: async (website, focusMode) => {
        const newSession = {
            id: `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
            startTime: Date.now(),
            messages: [],
            website,
            focusMode,
        };
        await chatHistoryBaseStorage.set(current => {
            const updatedSessions = [newSession, ...current.sessions];
            // Keep only the most recent sessions
            if (updatedSessions.length > current.maxSessions) {
                updatedSessions.splice(current.maxSessions);
            }
            return {
                ...current,
                sessions: updatedSessions,
            };
        });
        // Set as current session
        await characterStorage.setCurrentSession(newSession.id);
        return newSession;
    },
    endSession: async (sessionId) => {
        await chatHistoryBaseStorage.set(current => {
            const updatedSessions = current.sessions.map(session => session.id === sessionId ? { ...session, endTime: Date.now() } : session);
            return {
                ...current,
                sessions: updatedSessions,
            };
        });
        // Clear current session if it matches
        const currentConfig = await characterStorage.get();
        if (currentConfig.currentSession === sessionId) {
            await characterStorage.setCurrentSession(undefined);
        }
    },
    getRecentMessages: async (limit = 20) => {
        const history = await chatHistoryBaseStorage.get();
        const allMessages = [];
        // Collect messages from all sessions, most recent first
        for (const session of history.sessions) {
            allMessages.push(...session.messages);
        }
        // Sort by timestamp (most recent first) and limit
        return allMessages.sort((a, b) => b.timestamp - a.timestamp).slice(0, limit);
    },
    clearHistory: async () => {
        await chatHistoryBaseStorage.set(defaultChatHistory);
        await characterStorage.setCurrentSession(undefined);
    },
    getSessionById: async (sessionId) => {
        const history = await chatHistoryBaseStorage.get();
        return history.sessions.find(session => session.id === sessionId) || null;
    },
};
