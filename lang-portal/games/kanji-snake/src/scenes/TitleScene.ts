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
    // Set background color
    this.cameras.main.setBackgroundColor('#1a1a1a');
  }

  create() {
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
    // Add title
    this.title = this.add.text(
      this.cameras.main.centerX,
      50,
      'Kanji Snake',
      {
        fontSize: '48px',
        color: '#ffffff',
        fontFamily: '"Noto Sans JP", sans-serif'
      }
    ).setOrigin(0.5);

    // Add subtitle
    this.add.text(
      this.cameras.main.centerX,
      110,
      'Select a word group to begin',
      {
        fontSize: '24px',
        color: '#9ca3af'
      }
    ).setOrigin(0.5);

    // Calculate layout
    const startY = 180;  // Starting Y position for group buttons
    const buttonHeight = 40;
    const buttonSpacing = 10;
    const buttonWidth = 300;

    // Add "All Words" option first
    this.createGroupButton(
      this.cameras.main.centerX,
      startY,
      'All Words',
      -1,
      buttonWidth
    );

    // Add other groups
    this.groups.forEach((group, index) => {
      this.createGroupButton(
        this.cameras.main.centerX,
        startY + (index + 1) * (buttonHeight + buttonSpacing),
        `${group.name} (${group.words_count} words)`,
        group.id,
        buttonWidth
      );
    });

    // Calculate position for start button (after all groups)
    const startButtonY = startY + (this.groups.length + 1) * (buttonHeight + buttonSpacing) + 60;  // Doubled from 30 to 60

    // Add start button
    this.startButton = this.add.text(
      this.cameras.main.centerX,
      startButtonY,
      'Start Game',
      {
        fontSize: '32px',
        color: '#22c55e',
        backgroundColor: '#064e3b',
        padding: { x: 20, y: 10 },
      }
    )
    .setOrigin(0.5)
    .setInteractive({ useHandCursor: true })
    .on('pointerover', () => this.startButton?.setStyle({ color: '#4ade80' }))
    .on('pointerout', () => this.startButton?.setStyle({ color: '#22c55e' }))
    .on('pointerdown', () => this.startGame());

    // Add cue type selector below the start button with similar spacing
    const cueTypeY = startButtonY + 60 + 40;  // Doubled spacing from 30 to 60, plus button height
    this.cueTypeButton = this.add.text(
      this.cameras.main.centerX,
      cueTypeY,
      `Cue Type: ${this.cueType.toUpperCase()}`,
      {
        fontSize: '20px',
        color: '#ffffff',
        backgroundColor: '#374151',
        padding: { x: 15, y: 8 }
      }
    )
    .setOrigin(0.5)
    .setInteractive({ useHandCursor: true })
    .on('pointerover', () => {
      this.cueTypeButton?.setStyle({ backgroundColor: '#4b5563' });
    })
    .on('pointerout', () => {
      this.cueTypeButton?.setStyle({ backgroundColor: '#374151' });
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
        padding: { x: 15, y: 8 },
        fixedWidth: width
      }
    )
    .setOrigin(0.5)
    .setInteractive({ useHandCursor: true })
    .setData('groupId', groupId)  // Store the group ID on the button
    .on('pointerover', () => {
      if (this.selectedGroupId !== groupId) {
        button.setStyle({ backgroundColor: '#4b5563' });
      }
    })
    .on('pointerout', () => {
      if (this.selectedGroupId !== groupId) {
        button.setStyle({ backgroundColor: '#374151' });
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
      button.setStyle({
        backgroundColor: isSelected ? '#059669' : '#374151',
        color: '#ffffff'
      });
    });
  }

  private toggleCueType() {
    this.cueType = this.cueType === 'romaji' ? 'english' : 'romaji';
    if (this.cueTypeButton) {
      this.cueTypeButton.setText(`Cue Type: ${this.cueType.toUpperCase()}`);
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