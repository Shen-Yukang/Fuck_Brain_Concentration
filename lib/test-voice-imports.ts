/**
 * 测试语音服务导入
 */

import {
  createVoiceService,
  VoiceErrorType,
  VoiceError,
  RECOGNITION_CONSTANTS,
  UnifiedVoiceService,
  VoiceState,
} from '@extension/shared';

// 测试导入是否正常工作
console.log('Voice service imports test:');
console.log('createVoiceService:', typeof createVoiceService);
console.log('VoiceErrorType:', VoiceErrorType);
console.log('VoiceError:', VoiceError);
console.log('RECOGNITION_CONSTANTS:', RECOGNITION_CONSTANTS);
console.log('UnifiedVoiceService:', UnifiedVoiceService);
console.log('VoiceState:', VoiceState);

// 创建语音服务实例
const voiceService = createVoiceService();
console.log('Voice service created:', voiceService);

// 测试错误创建
const testError = new VoiceError(VoiceErrorType.NETWORK_ERROR, 'Test error');
console.log('Test error:', testError.getUserFriendlyMessage());
