import React, { useState, useEffect, useRef } from 'react';
import { useStorage } from '@extension/shared';
import { characterStorage, chatHistoryStorage, mcpConfigStorage } from '@extension/storage';
import type { ChatMessage } from '@extension/storage';
import { TaskSelector } from './TaskSelector.js';
import { TaskProgress } from './TaskProgress.js';

// Task execution state type (simplified for UI)
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

type ChatDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSendMessage: (message: string, type: 'text' | 'voice') => Promise<void>;
  onTaskExecute?: (taskId: string, query: string) => Promise<void>;
  characterPosition: { x: number; y: number };
};

export const ChatDialog: React.FC<ChatDialogProps> = ({
  isOpen,
  onClose,
  onSendMessage,
  onTaskExecute,
  characterPosition,
}) => {
  const config = useStorage(characterStorage);
  const mcpConfig = useStorage(mcpConfigStorage);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showTaskSelector, setShowTaskSelector] = useState(false);
  const [showTaskProgress, setShowTaskProgress] = useState(false);
  const [currentTaskState, setCurrentTaskState] = useState<TaskExecutionState | undefined>();
  const [suggestedTask, setSuggestedTask] = useState<string>('');
  const [suggestedQuery, setSuggestedQuery] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent messages when dialog opens
  useEffect(() => {
    if (isOpen) {
      loadRecentMessages();
      // Focus input when dialog opens
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadRecentMessages = async () => {
    try {
      const recentMessages = await chatHistoryStorage.getRecentMessages(10);
      setMessages(recentMessages.reverse()); // Show oldest first
    } catch (error) {
      console.error('Error loading recent messages:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Detect research requests in messages
  const detectResearchRequest = (message: string) => {
    const lowerMessage = message.toLowerCase();

    // Research keywords
    const researchKeywords = [
      '研究',
      '搜索',
      '查找',
      '寻找',
      '帮我找',
      '需要',
      '论文',
      'research',
      'search',
      'find',
      'look for',
      'help me find',
      'papers',
    ];

    // Academic keywords
    const academicKeywords = ['论文', '学术', '研究', '期刊', 'paper', 'academic', 'journal', 'arxiv'];

    // Code keywords
    const codeKeywords = ['代码', '库', '项目', '开源', 'code', 'library', 'project', 'github', 'repository'];

    const hasResearchKeyword = researchKeywords.some(keyword => lowerMessage.includes(keyword));

    if (!hasResearchKeyword) {
      return { isResearch: false };
    }

    // Determine suggested task
    let suggestedTaskId = 'general_research';
    if (academicKeywords.some(keyword => lowerMessage.includes(keyword))) {
      suggestedTaskId = 'research_papers';
    } else if (codeKeywords.some(keyword => lowerMessage.includes(keyword))) {
      suggestedTaskId = 'code_search';
    }

    // Extract query (simplified)
    let query = message
      .replace(/^(请|帮我|帮忙|能否|可以|我想|我需要|help me|can you|please)/i, '')
      .replace(/(搜索|查找|寻找|找到|research|search|find)/i, '')
      .replace(/(相关的|关于|有关|related to|about)/i, '')
      .replace(/(论文|资料|信息|papers|information|data)/i, '')
      .trim();

    // Extract content within brackets or quotes
    const bracketMatch = query.match(/[\[【]([^】\]]+)[\]】]/);
    if (bracketMatch) {
      query = bracketMatch[1];
    }

    const quoteMatch = query.match(/["'"]([^"'"]+)["'"]/);
    if (quoteMatch) {
      query = quoteMatch[1];
    }

    return {
      isResearch: true,
      suggestedTask: suggestedTaskId,
      query: query.trim() || message.trim(),
    };
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const messageText = inputText.trim();
    setInputText('');
    setIsLoading(true);

    try {
      // Check if MCP is enabled and detect research requests
      if (mcpConfig.enabled) {
        const detection = detectResearchRequest(messageText);
        if (detection.isResearch) {
          // Show task selector with suggestions
          setSuggestedTask(detection.suggestedTask || '');
          setSuggestedQuery(detection.query || '');
          setShowTaskSelector(true);
          setIsLoading(false);
          return;
        }
      }

      await onSendMessage(messageText, 'text');
      // Reload messages to get the latest
      await loadRecentMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTaskSelect = async (taskId: string, query: string) => {
    try {
      if (onTaskExecute) {
        await onTaskExecute(taskId, query);
      }
      setShowTaskSelector(false);
    } catch (error) {
      console.error('Error executing task:', error);
    }
  };

  const handleTaskCancel = async (executionId: string) => {
    try {
      // This would be handled by the character manager
      console.log('Cancelling task:', executionId);
      setShowTaskProgress(false);
    } catch (error) {
      console.error('Error cancelling task:', error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceInput = async () => {
    try {
      // Check if browser supports speech recognition
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (!SpeechRecognition) {
        alert('您的浏览器不支持语音识别功能');
        return;
      }

      if (isListening) {
        // Stop listening (will be handled by recognition.stop())
        setIsListening(false);
        return;
      }

      // Request microphone permission first
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop()); // Stop immediately, just checking permission
      } catch (error) {
        alert('需要麦克风权限才能使用语音输入');
        return;
      }

      // Create and configure speech recognition
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'zh-CN';
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        console.log('Speech recognition started');
      };

      recognition.onend = () => {
        setIsListening(false);
        console.log('Speech recognition ended');
      };

      recognition.onresult = (event: any) => {
        try {
          const result = event.results[event.results.length - 1];
          const transcript = result[0].transcript;
          const isFinal = result.isFinal;

          if (isFinal && transcript.trim()) {
            setInputText(transcript.trim());
            setIsListening(false);
          }
        } catch (error) {
          console.error('Error processing speech result:', error);
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);

        let errorMessage = '语音识别出错';
        switch (event.error) {
          case 'no-speech':
            errorMessage = '没有检测到语音，请重试';
            break;
          case 'audio-capture':
            errorMessage = '无法访问麦克风，请检查权限';
            break;
          case 'not-allowed':
            errorMessage = '麦克风权限被拒绝';
            break;
          case 'network':
            errorMessage = '网络错误，请检查连接';
            break;
        }

        alert(`语音识别错误: ${errorMessage}`);
      };

      // Start recognition
      recognition.start();
    } catch (error) {
      console.error('Error with voice input:', error);
      setIsListening(false);
      alert('启动语音识别失败');
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

    // Position dialog relative to character
    let left = characterPosition.x - dialogWidth - padding;
    let top = characterPosition.y;

    // Adjust if dialog would go off-screen
    if (left < padding) {
      left = characterPosition.x + 80; // Position to the right of character
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
              backgroundColor: '#10b981',
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
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = isDark ? '#4b5563' : '#f3f4f6';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}>
          ×
        </button>
      </div>

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
                  backgroundColor:
                    message.sender === 'user' ? (isDark ? '#3b82f6' : '#3b82f6') : isDark ? '#374151' : '#f3f4f6',
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
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
            }}>
            <div
              style={{
                padding: '8px 12px',
                borderRadius: '12px',
                backgroundColor: isDark ? '#374151' : '#f3f4f6',
                color: isDark ? '#9ca3af' : '#6b7280',
                fontSize: '14px',
              }}>
              <span>正在思考</span>
              <span className="animate-pulse">...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        style={{
          padding: '12px',
          borderTop: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
          backgroundColor: isDark ? '#374151' : '#f9fafb',
        }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入消息..."
            disabled={isLoading}
            style={{
              flex: 1,
              padding: '8px 12px',
              border: `1px solid ${isDark ? '#4b5563' : '#d1d5db'}`,
              borderRadius: '8px',
              backgroundColor: isDark ? '#1f2937' : '#ffffff',
              color: isDark ? '#f9fafb' : '#111827',
              fontSize: '14px',
              outline: 'none',
            }}
          />
          {mcpConfig.enabled && (
            <button
              onClick={() => setShowTaskSelector(true)}
              disabled={isLoading}
              style={{
                padding: '8px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: isDark ? '#4b5563' : '#e5e7eb',
                color: isDark ? '#f9fafb' : '#374151',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                fontSize: '14px',
              }}
              title="研究任务">
              🤖
            </button>
          )}
          <button
            onClick={handleVoiceInput}
            disabled={isLoading}
            style={{
              padding: '8px',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: isListening ? '#ef4444' : isDark ? '#4b5563' : '#e5e7eb',
              color: isListening ? '#ffffff' : isDark ? '#f9fafb' : '#374151',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontSize: '14px',
            }}
            title="语音输入">
            🎤
          </button>
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
            style={{
              padding: '8px 12px',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: !inputText.trim() || isLoading ? (isDark ? '#4b5563' : '#e5e7eb') : '#3b82f6',
              color: !inputText.trim() || isLoading ? (isDark ? '#9ca3af' : '#9ca3af') : '#ffffff',
              cursor: !inputText.trim() || isLoading ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: '500',
            }}>
            发送
          </button>
        </div>
      </div>

      {/* Task Selector Modal */}
      <TaskSelector
        isOpen={showTaskSelector}
        onClose={() => setShowTaskSelector(false)}
        onTaskSelect={handleTaskSelect}
        suggestedTask={suggestedTask}
        suggestedQuery={suggestedQuery}
        isDark={isDark}
      />

      {/* Task Progress Modal */}
      <TaskProgress
        isOpen={showTaskProgress}
        onClose={() => setShowTaskProgress(false)}
        onCancel={handleTaskCancel}
        taskState={currentTaskState}
        isDark={isDark}
      />
    </div>
  );
};
