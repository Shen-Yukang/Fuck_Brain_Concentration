import { characterStorage, chatHistoryStorage, focusStorage } from '@extension/storage';
import { CharacterAIService } from '../../../chrome-extension/src/services/characterAIService.js';

// Character state management for content scripts
export type CharacterState = {
  isVisible: boolean;
  isAnimating: boolean;
  isChatOpen: boolean;
  currentAnimation: string;
  position: { x: number; y: number };
};

// Character animation types
export type AnimationType = 'idle' | 'greeting' | 'thinking' | 'speaking' | 'celebrating' | 'encouraging' | 'sleeping';

// Character manager for content scripts
export class ContentCharacterManager {
  private static instance: ContentCharacterManager;
  private state: CharacterState;
  private animationTimer?: NodeJS.Timeout;
  private aiService: CharacterAIService;

  private constructor() {
    this.aiService = CharacterAIService.getInstance();
    this.state = {
      isVisible: false,
      isAnimating: false,
      isChatOpen: false,
      currentAnimation: 'idle',
      position: { x: 0, y: 0 },
    };
  }

  static getInstance(): ContentCharacterManager {
    if (!ContentCharacterManager.instance) {
      ContentCharacterManager.instance = new ContentCharacterManager();
    }
    return ContentCharacterManager.instance;
  }

  // Initialize character manager
  async initialize(): Promise<void> {
    try {
      // Initialize AI service
      await this.aiService.initialize();

      const config = await characterStorage.get();

      if (config.enabled) {
        await this.show();
        this.startIdleAnimations();
      }

      // Listen for focus mode changes
      this.setupFocusModeListener();

      console.log('Content character manager initialized');
    } catch (error) {
      console.error('Error initializing content character manager:', error);
    }
  }

  // Show character
  async show(): Promise<void> {
    const config = await characterStorage.get();

    this.state.isVisible = true;
    this.updatePosition(config.appearance.position);

    // Play greeting animation
    await this.playAnimation('greeting');

    this.notifyStateChange();
    console.log('Character shown');
  }

  // Hide character
  async hide(): Promise<void> {
    this.state.isVisible = false;
    this.stopIdleAnimations();

    if (this.state.isChatOpen) {
      await this.closeChatDialog();
    }

    this.notifyStateChange();
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
    this.animationTimer = setInterval(async () => {
      if (!this.state.isAnimating && !this.state.isChatOpen) {
        const config = await characterStorage.get();
        if (config.behavior?.idleAnimations) {
          // Randomly play idle animations
          const animations: AnimationType[] = ['idle', 'thinking', 'sleeping'];
          const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
          this.playAnimation(randomAnimation);
        }
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

      await chatHistoryStorage.startSession(website, focusMode);

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
      const config = await characterStorage.get();
      if (config.currentSession) {
        await chatHistoryStorage.endSession(config.currentSession);
      }

      this.notifyStateChange();

      console.log('Chat dialog closed');
    } catch (error) {
      console.error('Error closing chat dialog:', error);
    }
  }

  // Send message in chat
  async sendMessage(content: string, type: 'text' | 'voice' = 'text'): Promise<void> {
    try {
      // Add user message
      await chatHistoryStorage.addMessage({
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
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  // Generate character response
  private async generateCharacterResponse(userMessage: string): Promise<void> {
    try {
      await this.playAnimation('thinking');

      // Get conversation context
      const context = await this.buildConversationContext();

      // Generate AI response
      const aiResponse = await this.aiService.generateResponse(userMessage, context);

      // Add character response to chat
      await chatHistoryStorage.addMessage({
        sender: 'character',
        content: aiResponse,
        type: 'text',
        metadata: {
          website: window.location.hostname,
          focusMode: (await focusStorage.get()).isActive,
        },
      });

      // Play speaking animation
      await this.playAnimation('speaking');

      console.log('Character response generated:', aiResponse);
    } catch (error) {
      console.error('Error generating character response:', error);
    }
  }

  // Build conversation context for AI
  private async buildConversationContext() {
    const focusConfig = await focusStorage.get();
    const recentMessages = await chatHistoryStorage.getRecentMessages(6);

    // Extract conversation history (alternating user/character messages)
    const conversationHistory = recentMessages
      .slice(0, 6) // Last 6 messages
      .map(msg => `${msg.sender === 'user' ? '用户' : '助手'}: ${msg.content}`)
      .reverse(); // Chronological order

    return {
      website: window.location.hostname,
      focusMode: focusConfig.isActive,
      conversationHistory,
    };
  }

  // Setup focus mode listener
  private setupFocusModeListener(): void {
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

  // Handle focus mode start
  private async onFocusModeStart(): Promise<void> {
    const config = await characterStorage.get();

    if (config.behavior.focusModeIntegration) {
      await this.playAnimation('encouraging');

      // Generate encouraging message
      try {
        const encouragingMessage = await this.aiService.generateFocusStartMessage();

        // Show message if proactive chat is enabled or chat is open
        if (config.behavior.proactiveChat || this.state.isChatOpen) {
          await chatHistoryStorage.addMessage({
            sender: 'character',
            content: encouragingMessage,
            type: 'text',
            metadata: {
              website: window.location.hostname,
              focusMode: true,
              context: 'focus_start',
            },
          });
        }

        console.log('Focus mode started - character encouraging user:', encouragingMessage);
      } catch (error) {
        console.error('Error generating focus start message:', error);
      }
    }
  }

  // Handle focus mode end
  private async onFocusModeEnd(): Promise<void> {
    const config = await characterStorage.get();

    if (config.behavior.focusModeIntegration) {
      await this.playAnimation('celebrating');

      // Generate celebration message
      try {
        const celebrationMessage = await this.aiService.generateFocusEndMessage();

        // Show message if proactive chat is enabled or chat is open
        if (config.behavior.proactiveChat || this.state.isChatOpen) {
          await chatHistoryStorage.addMessage({
            sender: 'character',
            content: celebrationMessage,
            type: 'text',
            metadata: {
              website: window.location.hostname,
              focusMode: false,
              context: 'focus_end',
            },
          });
        }

        console.log('Focus mode ended - character celebrating:', celebrationMessage);
      } catch (error) {
        console.error('Error generating focus end message:', error);
      }
    }
  }

  // Get current character state
  getState(): CharacterState {
    return { ...this.state };
  }

  // Notify UI components about state changes
  private notifyStateChange(): void {
    window.dispatchEvent(
      new CustomEvent('characterStateChange', {
        detail: this.getState(),
      }),
    );
  }

  // Check if character should be visible on current website
  async shouldBeVisible(): Promise<boolean> {
    const config = await characterStorage.get();
    return config.enabled;
  }
}
