// Offscreen document for playing audio
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'PLAY_NOTIFICATION_SOUND') {
    playNotificationSound(message.volume, message.audioUrl)
      .then(() => sendResponse({ success: true }))
      .catch(error => {
        console.error('Error playing sound in offscreen:', error);
        sendResponse({ success: false, error: error.message });
      });
    return true; // Keep the message channel open for async response
  } else if (message.type === 'PLAY_TTS_SOUND') {
    playTTSSound(message.volume, message.audioData)
      .then(() => sendResponse({ success: true }))
      .catch(error => {
        console.error('Error playing TTS sound in offscreen:', error);
        sendResponse({ success: false, error: error.message });
      });
    return true; // Keep the message channel open for async response
  }
});

async function playNotificationSound(volume, audioUrl) {
  try {
    const audio = new Audio(audioUrl);
    audio.volume = volume;
    await audio.play();
    console.log('Notification sound played successfully with volume:', volume);
  } catch (error) {
    console.error('Failed to play notification sound:', error);
    throw error;
  }
}

// 将base64字符串转换为Blob
function base64ToBlob(base64, mimeType) {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
}

async function playTTSSound(volume, audioData) {
  let audioUrl = null;
  try {
    // 将base64数据转换为Blob URL
    const audioBlob = base64ToBlob(audioData, 'audio/mpeg');
    audioUrl = URL.createObjectURL(audioBlob);

    const audio = new Audio(audioUrl);
    audio.volume = volume;

    // 添加事件监听器来清理URL
    audio.addEventListener('ended', () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        console.log('TTS audio URL cleaned up');
      }
    });

    audio.addEventListener('error', () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        console.log('TTS audio URL cleaned up after error');
      }
    });

    await audio.play();
    console.log('TTS sound played successfully with volume:', volume);
  } catch (error) {
    console.error('Failed to play TTS sound:', error);
    // 确保在错误时也清理URL
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    throw error;
  }
}
