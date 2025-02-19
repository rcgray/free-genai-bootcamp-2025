import Phaser from 'phaser';
import { wordService } from '../services/WordService';
import { sessionService } from '../services/SessionService';

export default class TitleScene extends Phaser.Scene {
  private selectedGroupId: number = -1;  // -1 means "All Words"
  private groupButtons: Phaser.GameObjects.Text[] = [];
  private startButton?: Phaser.GameObjects.Text;
  private title?: Phaser.GameObjects.Text;
  private loading: boolean = false;
  private groups: Array<{ id: number; name: string; words_count: number }> = [];
  private loadingText?: Phaser.GameObjects.Text;
  private sceneReady: boolean = false;
  private groupsLoaded: boolean = false;
  private cueType: 'romaji' | 'english' = 'romaji';  // Default to romaji
  private cueTypeButton?: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'TitleScene' });
  }

  init() {
    // Reset all state
    this.sceneReady = false;
    this.groupsLoaded = false;
    this.groups = [];
    this.selectedGroupId = -1;
    this.loading = false;
    this.groupButtons = [];
    
    // Clear any existing UI elements
    if (this.title) this.title.destroy();
    if (this.startButton) this.startButton.destroy();
    if (this.loadingText) this.loadingText.destroy();
    this.groupButtons.forEach(button => button.destroy());
    this.groupButtons = [];
  }

  preload() {
    // Load the background image
    this.load.image('titleBackground', 'assets/title.png');
    // Load the title banner
    this.load.image('titleBanner', 'assets/titlebanner.png');
    
    // Set background color (will be visible during load)
    this.cameras.main.setBackgroundColor('#1a1a1a');
  }

  create() {
    // Add the background image first so it's behind everything
    const background = this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      'titleBackground'
    ).setOrigin(0.5);

    // Scale the background to fit the game size if needed
    background.setDisplaySize(
      this.cameras.main.width,
      this.cameras.main.height
    );

    // Mark scene as ready
    this.sceneReady = true;

    // Show loading text immediately
    this.loading = true;
    this.loadingText = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      'Loading...',
      {
        fontSize: '24px',
        color: '#ffffff',
        align: 'center'
      }
    ).setOrigin(0.5);

    // Start loading groups
    this.loadGroups();
  }

  shutdown() {
    // Clean up resources when scene is shut down
    if (this.title) this.title.destroy();
    if (this.startButton) this.startButton.destroy();
    if (this.loadingText) this.loadingText.destroy();
    this.groupButtons.forEach(button => button.destroy());
    this.groupButtons = [];
  }

  private async loadGroups() {
    try {
      console.log('TitleScene: Starting to fetch groups...');
      const groups = await wordService.fetchGroups();
      console.log('TitleScene: Fetched groups:', groups);
      this.groups = groups;
      this.groupsLoaded = true;
      
      // Only proceed if the scene is ready
      if (this.sceneReady) {
        this.handleGroupsLoaded();
      }
    } catch (error) {
      console.error('TitleScene: Error loading groups:', error);
      if (error instanceof Error) {
        console.error('TitleScene: Error details:', error.message);
      }
      if (this.sceneReady) {
        this.showError();
      }
    } finally {
      this.loading = false;
      console.log('TitleScene: Groups loading complete. Groups count:', this.groups.length);
    }
  }

  private handleGroupsLoaded() {
    // Safety check for scene readiness
    if (!this.sceneReady) {
      console.warn('TitleScene: Attempted to handle groups before scene was ready');
      return;
    }

    // Clean up loading text
    if (this.loadingText) {
      this.loadingText.destroy();
    }

    // Create UI if we have groups
    if (this.groups.length > 0) {
      this.createUI();
    } else {
      this.showError();
    }
  }

  private showError() {
    // Safety check for scene readiness
    if (!this.sceneReady) {
      console.warn('TitleScene: Attempted to show error before scene was ready');
      return;
    }

    if (this.loadingText) {
      this.loadingText.destroy();
    }
    this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      'Error loading groups.\nPlease refresh the page.',
      {
        fontSize: '24px',
        color: '#ef4444',
        align: 'center'
      }
    ).setOrigin(0.5);
  }

  private createUI() {
    // Add title banner
    const banner = this.add.image(
      this.cameras.main.centerX - 140,  // Shifted 100px left
      140,
      'titleBanner'
    ).setOrigin(0.5);

    // Scale banner if needed while maintaining aspect ratio
    const maxWidth = this.cameras.main.width * 0.8; // 80% of screen width
    if (banner.width > maxWidth) {
      const scale = maxWidth / banner.width;
      banner.setScale(scale);
    }

    // Adjust other elements to start below the banner
    const bannerBottom = 140 + (banner.height * (banner.scaleY || 1)) / 2;

    // Calculate layout starting from below the banner
    const startY = bannerBottom + 50;  // 40px gap after banner
    const buttonPadding = { x: 32, y: 16 };  // Padding inside buttons
    const buttonSpacing = 8;  // Space between buttons
    const buttonWidth = 300;
    const buttonTextHeight = 20;  // Font size
    const buttonHeight = buttonTextHeight + (buttonPadding.y * 2);  // Total height including padding

    // Add "All Words" option first
    this.createGroupButton(
      this.cameras.main.centerX - 100,  // Shifted 100px left
      startY,
      'All Words',
      -1,
      buttonWidth
    );

    // Add other groups
    this.groups.forEach((group, index) => {
      this.createGroupButton(
        this.cameras.main.centerX - 100,  // Shifted 100px left
        startY + (index + 1) * (buttonHeight + buttonSpacing),
        `${group.name} (${group.words_count} words)`,
        group.id,
        buttonWidth
      );
    });

    // Calculate position for start button (after all groups)
    const startButtonY = startY + (this.groups.length + 1) * (buttonHeight + buttonSpacing) + 60;

    // Add start button
    const startButtonStyle = {
      fontSize: '32px',
      color: '#4ade80',
      backgroundColor: '#064e3b',
      padding: { x: 40, y: 20 },  // Extra large padding for prominence
      fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    };

    this.startButton = this.add.text(
      this.cameras.main.centerX - 100,  // Shifted 100px left
      startButtonY,
      'Start Game',
      startButtonStyle
    ).setOrigin(0.5);

    // Add a prominent border/background for the Start Game button
    const startBg = this.add.graphics();
    startBg.lineStyle(3, 0x4ade80);  // Thicker border for emphasis
    const startBounds = this.startButton.getBounds();
    startBg.strokeRoundedRect(
      startBounds.x,
      startBounds.y,
      startBounds.width,
      startBounds.height,
      12  // Larger rounded corners
    );

    // Add glow effect
    const glowBg = this.add.graphics();
    glowBg.lineStyle(8, 0x4ade80, 0.2);  // Wider, semi-transparent line for glow
    glowBg.strokeRoundedRect(
      startBounds.x - 2,
      startBounds.y - 2,
      startBounds.width + 4,
      startBounds.height + 4,
      14
    );

    this.startButton
      .setInteractive({ useHandCursor: true })
      .on('pointerover', () => {
        this.startButton?.setStyle({ ...startButtonStyle, backgroundColor: '#065f46' });
        startBg.clear().lineStyle(3, 0x6ee7b7).strokeRoundedRect(
          startBounds.x,
          startBounds.y,
          startBounds.width,
          startBounds.height,
          12
        );
        glowBg.clear().lineStyle(8, 0x6ee7b7, 0.3).strokeRoundedRect(
          startBounds.x - 2,
          startBounds.y - 2,
          startBounds.width + 4,
          startBounds.height + 4,
          14
        );
      })
      .on('pointerout', () => {
        this.startButton?.setStyle(startButtonStyle);
        startBg.clear().lineStyle(3, 0x4ade80).strokeRoundedRect(
          startBounds.x,
          startBounds.y,
          startBounds.width,
          startBounds.height,
          12
        );
        glowBg.clear().lineStyle(8, 0x4ade80, 0.2).strokeRoundedRect(
          startBounds.x - 2,
          startBounds.y - 2,
          startBounds.width + 4,
          startBounds.height + 4,
          14
        );
      })
      .on('pointerdown', () => this.startGame());

    // Add cue type selector below the start button with similar spacing
    const cueTypeY = startButtonY + 60 + 40;  // Doubled spacing from 30 to 60, plus button height
    this.cueTypeButton = this.add.text(
      this.cameras.main.centerX - 100,  // Shifted 100px left
      cueTypeY,
      `Type: ${this.cueType.toUpperCase()}`,
      {
        fontSize: '20px',
        color: '#ffffff',
        backgroundColor: '#374151',
        padding: { x: 32, y: 16 },
        fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }
    ).setOrigin(0.5);

    // Add border for cue type button
    const cueTypeBg = this.add.graphics();
    cueTypeBg.lineStyle(2, 0x4b5563);
    const cueTypeBounds = this.cueTypeButton.getBounds();
    cueTypeBg.strokeRoundedRect(
      cueTypeBounds.x,
      cueTypeBounds.y,
      cueTypeBounds.width,
      cueTypeBounds.height,
      8
    );

    this.cueTypeButton
      .setInteractive({ useHandCursor: true })
      .on('pointerover', () => {
        this.cueTypeButton?.setStyle({ backgroundColor: '#4b5563' });
        cueTypeBg.clear().lineStyle(2, 0x6b7280).strokeRoundedRect(
          cueTypeBounds.x,
          cueTypeBounds.y,
          cueTypeBounds.width,
          cueTypeBounds.height,
          8
        );
      })
      .on('pointerout', () => {
        this.cueTypeButton?.setStyle({ backgroundColor: '#374151' });
        cueTypeBg.clear().lineStyle(2, 0x4b5563).strokeRoundedRect(
          cueTypeBounds.x,
          cueTypeBounds.y,
          cueTypeBounds.width,
          cueTypeBounds.height,
          8
        );
      })
      .on('pointerdown', () => {
        this.toggleCueType();
      });

    // Select "All Words" by default
    this.selectGroup(-1);
  }

  private createGroupButton(x: number, y: number, text: string, groupId: number, width: number) {
    const button = this.add.text(
      x,
      y,
      text,
      {
        fontSize: '20px',
        color: '#ffffff',
        backgroundColor: '#374151',
        padding: { x: 32, y: 16 },
        fixedWidth: width,
        fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }
    ).setOrigin(0.5);

    // Add border for group button
    const buttonBg = this.add.graphics();
    buttonBg.lineStyle(2, 0x4b5563);
    const buttonBounds = button.getBounds();
    buttonBg.strokeRoundedRect(
      buttonBounds.x,
      buttonBounds.y,
      buttonBounds.width,
      buttonBounds.height,
      8
    );

    button
      .setInteractive({ useHandCursor: true })
      .setData('groupId', groupId)
      .on('pointerover', () => {
        if (this.selectedGroupId !== groupId) {
          button.setStyle({ backgroundColor: '#4b5563' });
          buttonBg.clear().lineStyle(2, 0x6b7280).strokeRoundedRect(
            buttonBounds.x,
            buttonBounds.y,
            buttonBounds.width,
            buttonBounds.height,
            8
          );
        }
      })
      .on('pointerout', () => {
        if (this.selectedGroupId !== groupId) {
          button.setStyle({ backgroundColor: '#374151' });
          buttonBg.clear().lineStyle(2, 0x4b5563).strokeRoundedRect(
            buttonBounds.x,
            buttonBounds.y,
            buttonBounds.width,
            buttonBounds.height,
            8
          );
        }
      })
      .on('pointerdown', () => this.selectGroup(groupId));

    this.groupButtons.push(button);
    return button;
  }

  private selectGroup(groupId: number) {
    // Update selected state
    this.selectedGroupId = groupId;
    wordService.setCurrentGroupId(groupId);

    // Update button styles
    this.groupButtons.forEach(button => {
      const isSelected = button.getData('groupId') === groupId;
      const buttonBounds = button.getBounds();
      
      // Clear existing graphics for this button
      const existingBg = button.getData('bg');
      if (existingBg) existingBg.clear();
      
      // Create new graphics for this button
      const buttonBg = this.add.graphics();
      button.setData('bg', buttonBg);
      
      if (isSelected) {
        button.setStyle({
          backgroundColor: '#059669',
          color: '#ffffff'
        });
        buttonBg.lineStyle(2, 0x4ade80);
      } else {
        button.setStyle({
          backgroundColor: '#374151',
          color: '#ffffff'
        });
        buttonBg.lineStyle(2, 0x4b5563);
      }
      
      buttonBg.strokeRoundedRect(
        buttonBounds.x,
        buttonBounds.y,
        buttonBounds.width,
        buttonBounds.height,
        8
      );
    });
  }

  private toggleCueType() {
    this.cueType = this.cueType === 'romaji' ? 'english' : 'romaji';
    if (this.cueTypeButton) {
      this.cueTypeButton.setText(`Type: ${this.cueType.toUpperCase()}`);
    }
  }

  private async startGame() {
    if (this.loading) return;
    this.loading = true;

    try {
      // Start a new session
      const success = await sessionService.startSession();
      if (!success) {
        throw new Error('Failed to create session');
      }

      // Transition to the game scene with cue type preference
      this.scene.start('MainScene', {
        sessionId: sessionService.getCurrentSession()?.id,
        cueType: this.cueType
      });
    } catch (error) {
      console.error('Error starting game:', error);
      // Show error message
      this.add.text(
        this.cameras.main.centerX,
        this.cameras.main.height - 40,
        'Error starting game. Please try again.',
        {
          fontSize: '16px',
          color: '#ef4444'
        }
      ).setOrigin(0.5);
    } finally {
      this.loading = false;
    }
  }
} 