// worker.js
let timerId = null;

self.addEventListener('message', (e) => {
  const { type, duration } = e.data;
  
  switch(type) {
    case 'start':
      clearInterval(timerId);
      timerId = setInterval(() => {
        self.postMessage({ type: 'tick' });
      }, 1000);
      break;

    case 'stop':
      clearInterval(timerId);
      self.postMessage({ type: 'stopped' });
      break;
  }
});