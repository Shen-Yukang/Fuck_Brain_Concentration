/**
 * 语音服务测试
 * 验证重构后的语音交互功能
 */

import { UnifiedVoiceService, VoiceState, VoiceErrorType, VoiceError } from '../unifiedVoiceService.js';

// Mock Chrome API
const mockChrome = {
  runtime: {
    sendMessage: jest.fn(),
    lastError: null,
  },
};

// Mock Web Speech API
const mockSpeechRecognition = jest.fn();
const mockSpeechSynthesis = {
  speak: jest.fn(),
  cancel: jest.fn(),
  speaking: false,
  pending: false,
};

// Mock Navigator API
const mockNavigator = {
  mediaDevices: {
    getUserMedia: jest.fn(),
  },
  permissions: {
    query: jest.fn(),
  },
};

// Setup global mocks
beforeAll(() => {
  (global as any).chrome = mockChrome;
  (global as any).window = {
    SpeechRecognition: mockSpeechRecognition,
    webkitSpeechRecognition: mockSpeechRecognition,
    speechSynthesis: mockSpeechSynthesis,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    matchMedia: jest.fn(() => ({ matches: false })),
  };
  (global as any).navigator = mockNavigator;
});

describe('UnifiedVoiceService', () => {
  let voiceService: UnifiedVoiceService;

  beforeEach(() => {
    voiceService = new UnifiedVoiceService();
    jest.clearAllMocks();
  });

  afterEach(async () => {
    await voiceService.cleanup();
  });

  describe('初始状态', () => {
    test('应该有正确的初始状态', () => {
      const state = voiceService.getState();
      expect(state.state).toBe(VoiceState.IDLE);
      expect(state.isListening).toBe(false);
      expect(state.isSpeaking).toBe(false);
      expect(state.conversationMode).toBe(false);
      expect(state.error).toBeUndefined();
    });
  });

  describe('权限管理', () => {
    test('应该能够请求麦克风权限', async () => {
      const mockStream = {
        getTracks: jest.fn(() => [{ stop: jest.fn() }]),
      };
      mockNavigator.mediaDevices.getUserMedia.mockResolvedValue(mockStream);

      const result = await voiceService.requestPermissions();

      expect(result.success).toBe(true);
      expect(result.data).toBe(true);
      expect(mockNavigator.mediaDevices.getUserMedia).toHaveBeenCalledWith({ audio: true });
    });

    test('应该处理权限被拒绝的情况', async () => {
      mockNavigator.mediaDevices.getUserMedia.mockRejectedValue(new Error('Permission denied'));

      const result = await voiceService.requestPermissions();

      expect(result.success).toBe(false);
      expect(result.error?.type).toBe(VoiceErrorType.MICROPHONE_ACCESS_DENIED);
    });
  });

  describe('语音合成', () => {
    test('应该能够开始TTS播放', async () => {
      mockChrome.runtime.sendMessage.mockImplementation((message, callback) => {
        callback({ success: true });
      });

      const result = await voiceService.speak('测试文本');

      expect(result.success).toBe(true);
      expect(mockChrome.runtime.sendMessage).toHaveBeenCalledWith({
        type: 'PLAY_TTS_SOUND',
        text: '测试文本',
      });
    });

    test('应该拒绝空文本', async () => {
      const result = await voiceService.speak('');

      expect(result.success).toBe(false);
      expect(result.error?.type).toBe(VoiceErrorType.INVALID_CONFIGURATION);
    });

    test('应该能够停止播放', async () => {
      const result = await voiceService.stopSpeaking();

      expect(result.success).toBe(true);
    });
  });

  describe('语音识别', () => {
    test('应该能够开始监听', async () => {
      mockNavigator.mediaDevices.getUserMedia.mockResolvedValue({
        getTracks: () => [{ stop: jest.fn() }],
      });

      // Mock speech recognition
      const mockRecognition = {
        start: jest.fn(),
        abort: jest.fn(),
        continuous: false,
        interimResults: false,
        lang: 'zh-CN',
        maxAlternatives: 1,
        onstart: null,
        onresult: null,
        onend: null,
        onerror: null,
      };
      mockSpeechRecognition.mockImplementation(() => mockRecognition);

      const listenPromise = voiceService.listen({
        language: 'zh-CN',
        continuous: false,
      });

      // Simulate successful recognition
      setTimeout(() => {
        if (mockRecognition.onresult) {
          mockRecognition.onresult({
            results: [
              {
                0: { transcript: '测试识别', confidence: 0.9 },
                isFinal: true,
              },
            ],
          });
        }
      }, 100);

      const result = await listenPromise;

      expect(result.success).toBe(true);
      expect(result.data?.transcript).toBe('测试识别');
      expect(mockRecognition.start).toHaveBeenCalled();
    });

    test('应该能够停止监听', async () => {
      const result = await voiceService.stopListening();

      expect(result.success).toBe(true);
    });
  });

  describe('对话模式', () => {
    test('应该能够开始对话模式', async () => {
      mockNavigator.mediaDevices.getUserMedia.mockResolvedValue({
        getTracks: () => [{ stop: jest.fn() }],
      });

      const result = await voiceService.startConversation();

      expect(result.success).toBe(true);
    });

    test('应该能够停止对话模式', async () => {
      const result = await voiceService.stopConversation();

      expect(result.success).toBe(true);
    });
  });

  describe('错误处理', () => {
    test('VoiceError应该提供用户友好的消息', () => {
      const error = new VoiceError(VoiceErrorType.MICROPHONE_ACCESS_DENIED, 'Permission denied');

      expect(error.getUserFriendlyMessage()).toContain('麦克风权限');
      expect(error.isRetryable()).toBe(false);
    });

    test('网络错误应该是可重试的', () => {
      const error = new VoiceError(VoiceErrorType.NETWORK_ERROR, 'Network failed');

      expect(error.isRetryable()).toBe(true);
    });
  });

  describe('资源清理', () => {
    test('应该能够清理所有资源', async () => {
      await voiceService.cleanup();

      const state = voiceService.getState();
      expect(state.state).toBe(VoiceState.IDLE);
      expect(state.isListening).toBe(false);
      expect(state.isSpeaking).toBe(false);
      expect(state.conversationMode).toBe(false);
    });
  });
});

describe('VoiceError', () => {
  test('应该正确创建错误实例', () => {
    const originalError = new Error('Original error');
    const context = { userId: '123' };

    const voiceError = new VoiceError(VoiceErrorType.TTS_GENERATION_FAILED, 'TTS failed', originalError, context);

    expect(voiceError.type).toBe(VoiceErrorType.TTS_GENERATION_FAILED);
    expect(voiceError.message).toBe('TTS failed');
    expect(voiceError.originalError).toBe(originalError);
    expect(voiceError.context).toBe(context);
    expect(voiceError.name).toBe('VoiceError');
  });
});
