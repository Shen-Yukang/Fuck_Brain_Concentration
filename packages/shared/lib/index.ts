export * from './hooks/index.js';

// Re-export the classes and factory functions
export { AIService, createAIService } from './services/aiService.js';
export { NotificationGenerator, createNotificationGenerator } from './services/notificationGenerator.js';
export { SpeechService } from './services/speechService.js';
export type {
  SpeechRecognitionResult,
  SpeechRecognitionOptions,
  SpeechRecognitionCallbacks,
} from './services/speechService.js';

// Re-export voice configuration constants
export {
  VOICE_OPTIONS,
  DEFAULT_TEXTS,
  VoiceType,
  getDefaultTextByVoiceType,
  isStartVoiceText,
  getVoiceLabelByType,
} from './constants/voiceConfig.js';
export type { VoiceOption } from './constants/voiceConfig.js';
