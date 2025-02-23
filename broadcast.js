// broadcast.js (同时在background和content script中引入)
const channel = new BroadcastChannel('focus_notification_channel');

export const sendMessage = (msg) => {
  channel.postMessage({
    ...msg,
    source: 'focus_extension',
    version: '1.0'
  });
};

export const listen = (callback) => {
  channel.addEventListener('message', (e) => {
    if (e.data.source === 'focus_extension') {
      callback(e.data);
    }
  });
};