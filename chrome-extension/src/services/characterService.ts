import { characterStorage, chatHistoryStorage, focusStorage } from '@extension/storage';
import type { CharacterConfig, ChatMessage, ChatSession } from '@extension/storage';
import { TTSService } from './ttsService.js';

// Character state management
export type CharacterState = {
  isVisible: boolean;
  isAnimating: boolean;
  isChatOpen: boolean;
  currentAnimation: string;
  position: { x: number; y: number };
};

// Character animation types
export type AnimationType = 'idle' | 'greeting' | 'thinking' | 'speaking' | 'celebrating' | 'encouraging' | 'sleeping';

// Character service class
export class CharacterService {
  private static instance: CharacterService;
  private state: CharacterState;
  private animationTimer?: NodeJS.Timeout;
  private currentSession?: ChatSession;

  private constructor() {
    this.state = {
      isVisible: false,
      isAnimating: false,
      isChatOpen: false,
      currentAnimation: 'idle',
      position: { x: 0, y: 0 },
    };
  }

  static getInstance(): CharacterService {
    if (!CharacterService.instance) {
      CharacterService.instance = new CharacterService();
    }
    return CharacterService.instance;
  }

  // Initialize character service
  async initialize(): Promise<void> {
    try {
      const config = await characterStorage.get();

      if (config.enabled) {
        await this.show();
        this.startIdleAnimations();
      }

      // Listen for focus mode changes
      this.setupFocusModeListener();

      console.log('Character service initialized');
    } catch (error) {
      console.error('Error initializing character service:', error);
    }
  }

  // Show character
  async show(): Promise<void> {
    const config = await characterStorage.get();

    this.state.isVisible = true;
    this.updatePosition(config.appearance.position);

    // Play greeting animation
    await this.playAnimation('greeting');

    console.log('Character shown');
  }

  // Hide character
  async hide(): Promise<void> {
    this.state.isVisible = false;
    this.stopIdleAnimations();

    if (this.state.isChatOpen) {
      await this.closeChatDialog();
    }

    console.log('Character hidden');
  }

  // Update character position based on configuration
  private updatePosition(position: string): void {
    const padding = 20;
    const characterSize = 60; // Base size, will be adjusted by size setting

    switch (position) {
      case 'bottom-right':
        this.state.position = {
          x: window.innerWidth - characterSize - padding,
          y: window.innerHeight - characterSize - padding,
        };
        break;
      case 'bottom-left':
        this.state.position = {
          x: padding,
          y: window.innerHeight - characterSize - padding,
        };
        break;
      case 'top-right':
        this.state.position = {
          x: window.innerWidth - characterSize - padding,
          y: padding,
        };
        break;
      case 'top-left':
        this.state.position = {
          x: padding,
          y: padding,
        };
        break;
      default:
        this.state.position = {
          x: window.innerWidth - characterSize - padding,
          y: window.innerHeight - characterSize - padding,
        };
    }
  }

  // Start idle animations
  private startIdleAnimations(): void {
    const config = characterStorage.get();

    if (!(config as any).behavior?.idleAnimations) return;

    this.animationTimer = setInterval(() => {
      if (!this.state.isAnimating && !this.state.isChatOpen) {
        // Randomly play idle animations
        const animations: AnimationType[] = ['idle', 'thinking', 'sleeping'];
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
        this.playAnimation(randomAnimation);
      }
    }, 10000); // Every 10 seconds
  }

  // Stop idle animations
  private stopIdleAnimations(): void {
    if (this.animationTimer) {
      clearInterval(this.animationTimer);
      this.animationTimer = undefined;
    }
  }

  // Play character animation
  async playAnimation(animation: AnimationType): Promise<void> {
    if (this.state.isAnimating) return;

    this.state.isAnimating = true;
    this.state.currentAnimation = animation;

    // Animation duration varies by type
    const duration = this.getAnimationDuration(animation);

    // Notify UI components about animation change
    this.notifyStateChange();

    // Reset to idle after animation
    setTimeout(() => {
      this.state.isAnimating = false;
      this.state.currentAnimation = 'idle';
      this.notifyStateChange();
    }, duration);
  }

  // Get animation duration in milliseconds
  private getAnimationDuration(animation: AnimationType): number {
    const durations: Record<AnimationType, number> = {
      idle: 2000,
      greeting: 3000,
      thinking: 4000,
      speaking: 2000,
      celebrating: 5000,
      encouraging: 4000,
      sleeping: 6000,
    };

    return durations[animation] || 2000;
  }

  // Handle character click
  async handleCharacterClick(): Promise<void> {
    try {
      await characterStorage.updateLastInteraction();

      if (this.state.isChatOpen) {
        await this.closeChatDialog();
      } else {
        await this.openChatDialog();
      }
    } catch (error) {
      console.error('Error handling character click:', error);
    }
  }

  // Open chat dialog
  async openChatDialog(): Promise<void> {
    try {
      this.state.isChatOpen = true;

      // Start new chat session
      const website = window.location.hostname;
      const focusConfig = await focusStorage.get();
      const focusMode = focusConfig.isActive;

      this.currentSession = await chatHistoryStorage.startSession(website, focusMode);

      // Play greeting animation
      await this.playAnimation('greeting');

      this.notifyStateChange();

      console.log('Chat dialog opened');
    } catch (error) {
      console.error('Error opening chat dialog:', error);
    }
  }

  // Close chat dialog
  async closeChatDialog(): Promise<void> {
    try {
      this.state.isChatOpen = false;

      // End current session
      if (this.currentSession) {
        await chatHistoryStorage.endSession(this.currentSession.id);
        this.currentSession = undefined;
      }

      this.notifyStateChange();

      console.log('Chat dialog closed');
    } catch (error) {
      console.error('Error closing chat dialog:', error);
    }
  }

  // Send message in chat
  async sendMessage(content: string, type: 'text' | 'voice' = 'text'): Promise<ChatMessage> {
    if (!this.currentSession) {
      throw new Error('No active chat session');
    }

    const message = await chatHistoryStorage.addMessage({
      sender: 'user',
      content,
      type,
      metadata: {
        website: window.location.hostname,
        focusMode: (await focusStorage.get()).isActive,
      },
    });

    // Generate character response
    await this.generateCharacterResponse(content);

    return message;
  }

  // Generate character response
  private async generateCharacterResponse(userMessage: string): Promise<void> {
    try {
      await this.playAnimation('thinking');

      // TODO: Integrate with AI service for response generation
      // For now, use a simple response
      const responses = [
        '我理解你的想法！',
        '这很有趣，告诉我更多吧！',
        '我在这里支持你！',
        '让我们一起专注学习吧！',
        '你做得很好！',
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      // Add character response to chat
      const characterMessage = await chatHistoryStorage.addMessage({
        sender: 'character',
        content: randomResponse,
        type: 'text',
        metadata: {
          website: window.location.hostname,
          focusMode: (await focusStorage.get()).isActive,
        },
      });

      // Play speaking animation
      await this.playAnimation('speaking');

      // Try to speak the response using TTS
      await this.speakMessage(randomResponse);

      console.log('Character response generated:', characterMessage);
    } catch (error) {
      console.error('Error generating character response:', error);
    }
  }

  // Speak message using TTS
  private async speakMessage(text: string): Promise<void> {
    try {
      const audioData = await TTSService.generateSpeech(text);

      if (audioData) {
        // TODO: Play audio through existing audio system
        console.log('TTS audio generated for character speech');
      }
    } catch (error) {
      console.error('Error speaking message:', error);
    }
  }

  // Setup focus mode listener
  private setupFocusModeListener(): void {
    // Only set up listener if we're in a content script context
    if (typeof window !== 'undefined' && typeof chrome !== 'undefined' && chrome.storage) {
      // Listen for focus mode changes
      chrome.storage.onChanged.addListener(async (changes, areaName) => {
        if (areaName === 'local' && changes['focus-time-storage-key']) {
          const newValue = changes['focus-time-storage-key'].newValue;
          const oldValue = changes['focus-time-storage-key'].oldValue;

          // React to focus mode changes
          if (newValue?.isActive && !oldValue?.isActive) {
            await this.onFocusModeStart();
          } else if (!newValue?.isActive && oldValue?.isActive) {
            await this.onFocusModeEnd();
          }
        }
      });
    }
  }

  // Handle focus mode start
  private async onFocusModeStart(): Promise<void> {
    const config = await characterStorage.get();

    if (config.behavior.focusModeIntegration) {
      await this.playAnimation('encouraging');

      // Optionally show encouraging message
      if (config.behavior.proactiveChat && !this.state.isChatOpen) {
        // Could open chat with encouraging message
        console.log('Focus mode started - character encouraging user');
      }
    }
  }

  // Handle focus mode end
  private async onFocusModeEnd(): Promise<void> {
    const config = await characterStorage.get();

    if (config.behavior.focusModeIntegration) {
      await this.playAnimation('celebrating');

      console.log('Focus mode ended - character celebrating');
    }
  }

  // Get current character state
  getState(): CharacterState {
    return { ...this.state };
  }

  // Notify UI components about state changes
  private notifyStateChange(): void {
    // Only dispatch events if we're in a browser context with window
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('characterStateChange', {
          detail: this.getState(),
        }),
      );
    }
  }

  // Check if character should be visible on current website
  async shouldBeVisible(): Promise<boolean> {
    const config = await characterStorage.get();

    if (!config.enabled) return false;

    // TODO: Add website-specific visibility rules if needed
    // For now, show on all websites
    return true;
  }
}
