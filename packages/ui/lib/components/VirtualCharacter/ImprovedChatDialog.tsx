/**
 * 改进的聊天对话框组件
 * 使用统一的语音服务，解决状态管理和代码重复问题
 */

import React, { useState, useEffect, useRef } from 'react';
import { useStorage } from '@extension/shared';
import { createVoiceService, VoiceErrorType, VoiceError, RECOGNITION_CONSTANTS } from '@extension/shared';
import {
  characterConfigStorage,
  speechChatConfigStorage,
  chatHistoryStorage,
  mcpConfigStorage,
} from '@extension/storage';

interface ImprovedChatDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSendMessage: (message: string, type: 'text' | 'voice') => Promise<void>;
  onTaskExecute?: (taskId: string, query: string) => Promise<void>;
  characterPosition: { x: number; y: number };
}

export const ImprovedChatDialog: React.FC<ImprovedChatDialogProps> = ({
  isOpen,
  onClose,
  onSendMessage,
  onTaskExecute,
  characterPosition,
}) => {
  // 配置状态
  const config = useStorage(characterConfigStorage);
  const speechConfig = useStorage(speechChatConfigStorage);
  const mcpConfig = useStorage(mcpConfigStorage);

  // UI状态
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);

  // 语音状态 - 使用统一的语音服务
  const [voiceService] = useState(() => createVoiceService());
  const [voiceState, setVoiceState] = useState(() => voiceService.getState());
  const [voiceError, setVoiceError] = useState<VoiceError | null>(null);

  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 监听语音服务状态变化
  useEffect(() => {
    const updateVoiceState = () => {
      setVoiceState(voiceService.getState());
    };

    // 定期更新状态
    const interval = setInterval(updateVoiceState, 500);

    return () => {
      clearInterval(interval);
    };
  }, [voiceService]);

  // 加载最近消息
  useEffect(() => {
    if (isOpen) {
      loadRecentMessages();
    }
  }, [isOpen]);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 清理语音服务
  useEffect(() => {
    return () => {
      if (voiceState.conversationMode) {
        voiceService.stopConversation();
      }
    };
  }, []);

  const loadRecentMessages = async () => {
    try {
      const recentMessages = await chatHistoryStorage.getRecentMessages(10);
      setMessages(recentMessages);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const messageText = inputText.trim();
    setInputText('');
    setIsLoading(true);

    try {
      await onSendMessage(messageText, 'text');
      await loadRecentMessages();

      // 如果启用了语音输出和自动播放，播放助手回复
      if (speechConfig.output.enabled && speechConfig.output.autoPlay) {
        const recentMessages = await chatHistoryStorage.getRecentMessages(1);
        if (recentMessages.length > 0 && recentMessages[0].sender === 'character') {
          await playAssistantMessage(recentMessages[0].content);
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setVoiceError(new VoiceError(VoiceErrorType.UNKNOWN_ERROR, 'Failed to send message', error as Error));
    } finally {
      setIsLoading(false);
    }
  };

  const playAssistantMessage = async (text: string) => {
    try {
      const result = await voiceService.speak(text, {
        interruptCurrent: true,
        onError: error => {
          console.error('Error playing assistant message:', error);
          setVoiceError(error);
        },
      });

      if (!result.success) {
        setVoiceError(
          result.error || new VoiceError(VoiceErrorType.TTS_PLAYBACK_FAILED, 'Failed to play assistant message'),
        );
      }
    } catch (error) {
      console.error('Error playing assistant message:', error);
      setVoiceError(
        new VoiceError(VoiceErrorType.TTS_PLAYBACK_FAILED, 'Failed to play assistant message', error as Error),
      );
    }
  };

  const handleVoiceInput = async () => {
    try {
      if (!speechConfig.input.enabled) {
        alert('语音录入功能已禁用，请在设置中启用');
        return;
      }

      if (voiceState.isListening) {
        // 停止当前监听
        await voiceService.stopListening();
        return;
      }

      // 开始语音识别
      const result = await voiceService.listen({
        language: speechConfig.input.language,
        continuous: speechConfig.input.continuous,
        interimResults: speechConfig.input.interimResults,
        maxAlternatives: speechConfig.input.maxAlternatives,
        timeout: RECOGNITION_CONSTANTS.RECOGNITION_TIMEOUT,
        onResult: (transcript, isFinal) => {
          if (!isFinal) {
            // 显示中间结果
            setInputText(transcript);
          }
        },
        onError: error => {
          console.error('Voice recognition error:', error);
          setVoiceError(error);

          // 只对严重错误显示提示
          if (error.type !== VoiceErrorType.NO_SPEECH_DETECTED && error.type !== VoiceErrorType.OPERATION_CANCELLED) {
            alert(error.getUserFriendlyMessage());
          }
        },
      });

      if (result.success && result.data?.transcript.trim()) {
        setInputText(result.data.transcript.trim());

        // 如果启用了自动发送
        if (speechConfig.input.autoSend) {
          setTimeout(() => {
            handleSendMessage();
          }, RECOGNITION_CONSTANTS.AUTO_SEND_DELAY);
        }
      }
    } catch (error) {
      console.error('Error with voice input:', error);
      setVoiceError(
        new VoiceError(VoiceErrorType.SPEECH_RECOGNITION_FAILED, 'Failed to start voice input', error as Error),
      );
    }
  };

  const toggleConversationMode = async () => {
    try {
      if (voiceState.conversationMode) {
        await voiceService.stopConversation();
      } else {
        await voiceService.startConversation();
      }
    } catch (error) {
      console.error('Error toggling conversation mode:', error);
      setVoiceError(
        new VoiceError(VoiceErrorType.SPEECH_RECOGNITION_FAILED, 'Failed to toggle conversation mode', error as Error),
      );
    }
  };

  const stopAllSpeech = async () => {
    try {
      await voiceService.stopSpeaking();
      await voiceService.stopListening();
      if (voiceState.conversationMode) {
        await voiceService.stopConversation();
      }
      setVoiceError(null);
    } catch (error) {
      console.error('Error stopping speech:', error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getDialogPosition = () => {
    const dialogWidth = 320;
    const dialogHeight = 400;
    const padding = 20;

    let left = characterPosition.x - dialogWidth - padding;
    let top = characterPosition.y;

    if (left < padding) {
      left = characterPosition.x + 80;
    }

    if (top + dialogHeight > window.innerHeight - padding) {
      top = window.innerHeight - dialogHeight - padding;
    }

    if (top < padding) {
      top = padding;
    }

    return { left, top };
  };

  const isDark =
    config.appearance.theme === 'dark' ||
    (config.appearance.theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (!isOpen) return null;

  const dialogPosition = getDialogPosition();

  return (
    <div
      style={{
        position: 'fixed',
        left: `${dialogPosition.left}px`,
        top: `${dialogPosition.top}px`,
        width: '320px',
        height: '400px',
        zIndex: 10001,
        backgroundColor: isDark ? '#1f2937' : '#ffffff',
        border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
      {/* Header */}
      <div
        style={{
          padding: '12px 16px',
          borderBottom: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
          backgroundColor: isDark ? '#374151' : '#f9fafb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '8px',
              height: '8px',
              backgroundColor: voiceState.error ? '#ef4444' : '#10b981',
              borderRadius: '50%',
            }}
          />
          <span
            style={{
              fontWeight: '600',
              color: isDark ? '#f9fafb' : '#111827',
              fontSize: '14px',
            }}>
            {config.personality.name}
          </span>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: isDark ? '#9ca3af' : '#6b7280',
            fontSize: '18px',
            padding: '4px',
            borderRadius: '4px',
          }}>
          ×
        </button>
      </div>

      {/* Error Display */}
      {voiceError && (
        <div
          style={{
            padding: '8px 12px',
            backgroundColor: '#fef2f2',
            borderBottom: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
            fontSize: '12px',
            color: '#dc2626',
          }}>
          {voiceError.getUserFriendlyMessage()}
          <button
            onClick={() => setVoiceError(null)}
            style={{
              marginLeft: '8px',
              background: 'none',
              border: 'none',
              color: '#dc2626',
              cursor: 'pointer',
            }}>
            ×
          </button>
        </div>
      )}

      {/* Messages */}
      <div
        style={{
          flex: 1,
          padding: '12px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}>
        {messages.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              color: isDark ? '#9ca3af' : '#6b7280',
              fontSize: '14px',
              marginTop: '20px',
            }}>
            开始对话吧！我是你的学习助手 {config.personality.name} 😊
          </div>
        ) : (
          messages.map(message => (
            <div
              key={message.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: message.sender === 'user' ? 'flex-end' : 'flex-start',
              }}>
              <div
                style={{
                  maxWidth: '80%',
                  padding: '8px 12px',
                  borderRadius: '12px',
                  backgroundColor: message.sender === 'user' ? '#3b82f6' : isDark ? '#374151' : '#f3f4f6',
                  color: message.sender === 'user' ? '#ffffff' : isDark ? '#f9fafb' : '#111827',
                  fontSize: '14px',
                  lineHeight: '1.4',
                }}>
                {message.content}
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: isDark ? '#6b7280' : '#9ca3af',
                  marginTop: '2px',
                }}>
                {formatTime(message.timestamp)}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div
              style={{
                padding: '8px 12px',
                borderRadius: '12px',
                backgroundColor: isDark ? '#374151' : '#f3f4f6',
                color: isDark ? '#9ca3af' : '#6b7280',
                fontSize: '14px',
              }}>
              正在思考...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Speech Status Bar */}
      {(voiceState.isListening || voiceState.isSpeaking || voiceState.conversationMode) && (
        <div
          style={{
            padding: '8px 12px',
            backgroundColor: isDark ? '#1f2937' : '#f0f9ff',
            borderTop: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px',
          }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {voiceState.isListening && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ef4444' }}>
                <span>🎤</span>
                <span>正在监听...</span>
              </div>
            )}
            {voiceState.isSpeaking && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10b981' }}>
                <span>🔊</span>
                <span>正在播放...</span>
              </div>
            )}
            {voiceState.conversationMode && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#3b82f6' }}>
                <span>💬</span>
                <span>对话模式</span>
              </div>
            )}
          </div>
          <button
            onClick={stopAllSpeech}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: isDark ? '#9ca3af' : '#6b7280',
              fontSize: '12px',
              padding: '2px 6px',
              borderRadius: '4px',
            }}
            title="停止所有语音活动">
            ⏹️
          </button>
        </div>
      )}

      {/* Input */}
      <div
        style={{
          padding: '12px',
          borderTop: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
          backgroundColor: isDark ? '#374151' : '#f9fafb',
        }}>
        {/* Conversation Mode Toggle */}
        {speechConfig.input.enabled && speechConfig.output.enabled && (
          <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '12px', color: isDark ? '#9ca3af' : '#6b7280' }}>连续语音对话</span>
            <button
              onClick={toggleConversationMode}
              disabled={isLoading}
              style={{
                padding: '4px 8px',
                border: 'none',
                borderRadius: '6px',
                backgroundColor: voiceState.conversationMode ? '#3b82f6' : isDark ? '#4b5563' : '#e5e7eb',
                color: voiceState.conversationMode ? '#ffffff' : isDark ? '#f9fafb' : '#374151',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                fontSize: '11px',
                fontWeight: '500',
              }}
              title={voiceState.conversationMode ? '结束对话模式' : '开始对话模式'}>
              {voiceState.conversationMode ? '结束对话' : '开始对话'}
            </button>
          </div>
        )}

        <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={voiceState.isListening ? '正在监听语音...' : '输入消息...'}
            disabled={isLoading || voiceState.isListening}
            style={{
              flex: 1,
              padding: '8px 12px',
              border: `1px solid ${isDark ? '#4b5563' : '#d1d5db'}`,
              borderRadius: '8px',
              backgroundColor: isDark ? '#1f2937' : '#ffffff',
              color: isDark ? '#f9fafb' : '#111827',
              fontSize: '14px',
              outline: 'none',
              opacity: voiceState.isListening ? 0.7 : 1,
            }}
          />

          {speechConfig.input.enabled && (
            <button
              onClick={handleVoiceInput}
              disabled={isLoading}
              style={{
                padding: '8px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: voiceState.isListening ? '#ef4444' : isDark ? '#4b5563' : '#e5e7eb',
                color: voiceState.isListening ? '#ffffff' : isDark ? '#f9fafb' : '#374151',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                position: 'relative',
              }}
              title={voiceState.isListening ? '停止语音输入' : '开始语音输入'}>
              🎤
              {voiceState.isListening && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-2px',
                    right: '-2px',
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#ef4444',
                    borderRadius: '50%',
                    animation: 'pulse 1s infinite',
                  }}
                />
              )}
            </button>
          )}

          {speechConfig.output.enabled && voiceState.isSpeaking && (
            <button
              onClick={() => voiceService.stopSpeaking()}
              style={{
                padding: '8px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: '#10b981',
                color: '#ffffff',
                cursor: 'pointer',
                fontSize: '14px',
              }}
              title="停止播放">
              🔊
            </button>
          )}

          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isLoading || voiceState.isListening}
            style={{
              padding: '8px 12px',
              border: 'none',
              borderRadius: '8px',
              backgroundColor:
                !inputText.trim() || isLoading || voiceState.isListening ? (isDark ? '#4b5563' : '#e5e7eb') : '#3b82f6',
              color:
                !inputText.trim() || isLoading || voiceState.isListening ? (isDark ? '#9ca3af' : '#9ca3af') : '#ffffff',
              cursor: !inputText.trim() || isLoading || voiceState.isListening ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: '500',
            }}>
            发送
          </button>
        </div>
      </div>
    </div>
  );
};
