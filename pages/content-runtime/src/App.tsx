import { useEffect } from 'react';
import { VirtualCharacter } from '@extension/ui';
import { ContentCharacterManager } from './characterManager';

export default function App() {
  useEffect(() => {
    console.log('runtime content view loaded');

    // Initialize character manager in content script context
    const initializeCharacterManager = async () => {
      try {
        const characterManager = ContentCharacterManager.getInstance();
        await characterManager.initialize();

        // Expose character manager globally for VirtualCharacter component
        (window as any).characterManager = characterManager;

        console.log('Character manager initialized in content script');
      } catch (error) {
        console.error('Error initializing character manager:', error);
      }
    };

    initializeCharacterManager();
  }, []);

  return (
    <div>
      {/* Virtual Character Component */}
      <VirtualCharacter />
    </div>
  );
}
