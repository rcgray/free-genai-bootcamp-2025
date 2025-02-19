import Phaser from 'phaser';
import { wordService } from '../services/WordService';
import { sessionService } from '../services/SessionService';

export class GroupSelectScene extends Phaser.Scene {
  private groups: Array<{ id: number; name: string; text: Phaser.GameObjects.Text }> = [];
  private selectedGroupIndex: number = -1;
  private startButton!: Phaser.GameObjects.Text;
  private titleText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'GroupSelectScene' });
  }

  create(): void {
    console.log('Creating GroupSelectScene...');
    this.cameras.main.setBackgroundColor('#1a1a1a');

    // Add title
    this.titleText = this.add.text(
      this.cameras.main.centerX,
      50,
      'Select Word Group',
      {
        fontSize: '32px',
        color: '#ffffff'
      }
    ).setOrigin(0.5);

    // Load and display groups
    this.loadGroups();

    // Add start button (initially disabled)
    this.startButton = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.height - 100,
      'Start Game',
      {
        fontSize: '24px',
        color: '#666666'
      }
    )
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        console.log('Start button clicked');
        this.startGame();
      })
      .on('pointerover', () => {
        console.log('Start button hover, selectedGroupIndex:', this.selectedGroupIndex);
        if (this.selectedGroupIndex !== -1) {
          this.startButton.setStyle({ color: '#4ade80' });
        }
      })
      .on('pointerout', () => {
        if (this.selectedGroupIndex !== -1) {
          this.startButton.setStyle({ color: '#ffffff' });
        }
      });

    console.log('GroupSelectScene created');
  }

  private async loadGroups(): Promise<void> {
    console.log('Loading groups...');
    const groups = await wordService.fetchGroups();
    console.log('Fetched groups:', groups);

    const startY = 150;
    const spacing = 50;

    // Add "All Words" option first
    const allWordsText = this.add.text(
      this.cameras.main.centerX,
      startY,
      'All Words',
      {
        fontSize: '24px',
        color: '#ffffff'
      }
    )
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        console.log('All Words option clicked');
        this.selectGroup(0);
      })
      .on('pointerover', () => {
        allWordsText.setStyle({ color: '#4ade80' });
      })
      .on('pointerout', () => {
        allWordsText.setStyle({
          color: this.selectedGroupIndex === 0 ? '#4ade80' : '#ffffff'
        });
      });

    this.groups.push({
      id: -1, // Special ID for "All Words"
      name: 'All Words',
      text: allWordsText
    });

    // Add other groups with offset
    groups.forEach((group, index) => {
      console.log(`Creating text for group ${group.name}`);
      const text = this.add.text(
        this.cameras.main.centerX,
        startY + (index + 1) * spacing,
        `${group.name} (${group.words_count} words)`,
        {
          fontSize: '24px',
          color: '#ffffff'
        }
      )
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
          console.log(`Group ${group.name} clicked`);
          this.selectGroup(index + 1);
        })
        .on('pointerover', () => {
          text.setStyle({ color: '#4ade80' });
        })
        .on('pointerout', () => {
          text.setStyle({
            color: this.selectedGroupIndex === (index + 1) ? '#4ade80' : '#ffffff'
          });
        });

      this.groups.push({
        id: group.id,
        name: group.name,
        text
      });
    });

    console.log('Groups loaded:', this.groups);
  }

  private selectGroup(index: number): void {
    console.log(`Selecting group at index ${index}`);
    // Reset previous selection
    if (this.selectedGroupIndex !== -1) {
      this.groups[this.selectedGroupIndex].text.setStyle({ color: '#ffffff' });
    }

    // Set new selection
    this.selectedGroupIndex = index;
    this.groups[index].text.setStyle({ color: '#4ade80' });
    wordService.setCurrentGroupId(this.groups[index].id);

    // Enable start button
    this.startButton.setStyle({ color: '#ffffff' });
    console.log('Group selected:', this.groups[index]);
  }

  private async startGame(): Promise<void> {
    console.log('Starting game...');
    if (this.selectedGroupIndex === -1) {
      console.log('No group selected, cannot start game');
      return;
    }

    // Start a new session
    console.log('Creating session...');
    const success = await sessionService.startSession();
    if (!success) {
      console.error('Failed to start session');
      return;
    }

    console.log('Session created, transitioning to game scene');
    // Transition to the game scene
    this.scene.start('GameScene');
  }
} 