/**
 * StudyScene.ts
 * Study scene for the Japanese Language Learning Visual Novel game.
 * This scene allows players to study Japanese phrases encountered during gameplay.
 * It provides educational information about Japanese vocabulary, grammar, 
 * and cultural context in a scrollable interface.
 */

import BaseScene from './BaseScene';
import sceneRegistry from './SceneRegistry';
import { PhraseAnalysis, getTestPhrase } from '../data/study/test-phrase-data';

export interface StudyPhraseData {
  phrase: string;         // Japanese phrase
  romaji: string;         // Romaji reading
  translation: string;    // English translation
  context?: string;       // Optional contextual information
  source?: string;        // Source of the phrase (character, dialogue, etc.)
  testPhraseName?: string; // For testing: name of the test phrase to use
}

export default class StudyScene extends BaseScene {
  // Phrase data
  private phrase: string = '';
  private romaji: string = '';
  private translation: string = '';
  private context: string = '';
  private source: string = '';
  
  // Analysis data
  private phraseAnalysis?: PhraseAnalysis;
  
  // UI Components
  private overlay?: Phaser.GameObjects.Rectangle;
  private contentPanel?: Phaser.GameObjects.Rectangle;
  private backButton?: Phaser.GameObjects.Text;
  private phraseText?: Phaser.GameObjects.Text;
  private romajiText?: Phaser.GameObjects.Text;
  private translationText?: Phaser.GameObjects.Text;
  
  // Scrollable content components
  private contentContainer?: Phaser.GameObjects.Container;
  private contentMask?: Phaser.Display.Masks.GeometryMask;
  private isDragging: boolean = false;
  private lastY: number = 0;
  private contentMinY: number = 0;
  
  /**
   * Constructor for the StudyScene class
   */
  constructor() {
    super({ key: 'StudyScene' });
  }
  
  /**
   * Initialize scene with data passed from VN Scene
   * @param data - Phrase data to study
   */
  init(data: StudyPhraseData): void {
    // Extract phrase data from passed parameters
    this.phrase = data.phrase || '';
    this.romaji = data.romaji || '';
    this.translation = data.translation || '';
    this.context = data.context || '';
    this.source = data.source || '';
    
    // For testing purposes, if a test phrase name is provided, load that test data
    if (data.testPhraseName) {
      this.phraseAnalysis = getTestPhrase(data.testPhraseName);
      
      // Override the scene data with the test data
      this.phrase = this.phraseAnalysis.phrase;
      this.romaji = this.phraseAnalysis.romaji;
      this.translation = this.phraseAnalysis.translation;
    } else if (this.phrase && this.romaji && this.translation) {
      // In the future, this is where we would call the LLM service to get phrase analysis
      // For now, let's use a default test phrase to demonstrate functionality
      this.phraseAnalysis = getTestPhrase('complete');
    }
    
    console.log('StudyScene initialized with phrase:', this.phrase);
  }
  
  /**
   * Preload assets for the scene
   */
  preload(): void {
    // No specific assets to preload for now
    super.preload();
  }
  
  /**
   * Create the scene elements
   */
  create(): void {
    console.log('Creating StudyScene');
    
    // Create the background overlay and content panel
    this.createBackground();
    
    // Create the header section with phrase information
    this.createHeaderSection();
    
    // Create the scrollable content area
    this.createScrollableContentArea();
    
    // Create the back button
    this.createBackButton();
    
    // Add content based on phrase analysis
    if (this.phraseAnalysis) {
      this.addPhraseAnalysisContent(this.phraseAnalysis);
    } else {
      // Add placeholder content if no analysis is available
      this.addPlaceholderContent();
    }
    
    // Set up input handlers for scrolling
    this.setupScrollHandlers();
  }
  
  /**
   * Create the background overlay and content panel
   */
  private createBackground(): void {
    // Semi-transparent overlay covering the entire screen
    this.overlay = this.add.rectangle(
      0, 0,
      this.cameras.main.width,
      this.cameras.main.height,
      0x000000
    );
    this.overlay.setOrigin(0, 0);
    this.overlay.setAlpha(0.8);
    
    // Content panel in the center (85-90% of screen)
    const panelWidth = this.cameras.main.width * 0.9;
    const panelHeight = this.cameras.main.height * 0.9;
    
    this.contentPanel = this.add.rectangle(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      panelWidth,
      panelHeight,
      0x333333
    );
    this.contentPanel.setStrokeStyle(2, 0xffffff);
  }
  
  /**
   * Create the header section with phrase, romaji, and translation
   */
  private createHeaderSection(): void {
    const panelWidth = this.contentPanel!.width;
    const panelX = this.cameras.main.width / 2;
    
    // Calculate positions for header elements
    const headerY = (this.cameras.main.height - this.contentPanel!.height) / 2 + 50;
    
    // Original Japanese phrase
    this.phraseText = this.add.text(
      panelX,
      headerY,
      this.phrase,
      {
        fontFamily: 'Arial',
        fontSize: '32px',
        color: '#ffffff',
        align: 'center',
        wordWrap: { width: panelWidth * 0.8 }
      }
    );
    this.phraseText.setOrigin(0.5, 0);
    
    // Romaji pronunciation
    this.romajiText = this.add.text(
      panelX,
      headerY + this.phraseText.height + 20,
      this.romaji,
      {
        fontFamily: 'Arial',
        fontSize: '22px',
        color: '#ccccff',
        align: 'center',
        wordWrap: { width: panelWidth * 0.8 }
      }
    );
    this.romajiText.setOrigin(0.5, 0);
    
    // English translation
    this.translationText = this.add.text(
      panelX,
      headerY + this.phraseText.height + this.romajiText.height + 40,
      this.translation,
      {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#ffffff',
        fontStyle: 'italic',
        align: 'center',
        wordWrap: { width: panelWidth * 0.8 }
      }
    );
    this.translationText.setOrigin(0.5, 0);
  }
  
  /**
   * Create a container for scrollable content
   */
  private createScrollableContentArea(): void {
    const panelWidth = this.contentPanel!.width;
    const panelHeight = this.contentPanel!.height;
    const panelX = this.cameras.main.width / 2;
    const panelY = this.cameras.main.height / 2;
    
    // Calculate the top of the content area based on header height
    const headerHeight = 200; // Approximate height of all header elements
    const contentY = panelY - panelHeight / 2 + headerHeight;
    const contentWidth = panelWidth * 0.9;
    const contentHeight = panelHeight - headerHeight - 20;
    
    // Create a container for the scrollable content
    this.contentContainer = this.add.container(panelX, contentY);
    
    // Create a mask for the container
    const maskGraphics = this.make.graphics({});
    maskGraphics.fillRect(
      panelX - contentWidth / 2,
      contentY,
      contentWidth,
      contentHeight
    );
    
    this.contentMask = new Phaser.Display.Masks.GeometryMask(this, maskGraphics);
    this.contentContainer.setMask(this.contentMask);
    
    // Store the boundary for scrolling
    this.contentMinY = contentY;
  }
  
  /**
   * Create the back button to return to the VN Scene
   */
  private createBackButton(): void {
    this.backButton = this.add.text(
      (this.cameras.main.width - this.contentPanel!.width) / 2 + 20,
      (this.cameras.main.height - this.contentPanel!.height) / 2 + 20,
      'Back to Game',
      {
        fontFamily: 'Arial',
        fontSize: '18px',
        color: '#ffffff',
        backgroundColor: '#5a1e1e',
        padding: { left: 10, right: 10, top: 5, bottom: 5 }
      }
    );
    
    this.backButton.setInteractive({ useHandCursor: true });
    
    // Add hover effect
    this.backButton.on('pointerover', () => {
      this.backButton?.setStyle({ color: '#ffff00' });
    });
    
    this.backButton.on('pointerout', () => {
      this.backButton?.setStyle({ color: '#ffffff' });
    });
    
    // Handle click event
    this.backButton.on('pointerdown', () => {
      this.returnToVNScene();
    });
  }
  
  /**
   * Add content based on the phrase analysis data
   */
  private addPhraseAnalysisContent(analysis: PhraseAnalysis): void {
    if (!this.contentContainer) return;
    
    let yPosition = 0;
    
    // Word Breakdown Section
    this.addSectionHeader("Word Breakdown", yPosition);
    yPosition += 60;
    yPosition = this.addWordBreakdown(analysis.word_breakdown, yPosition);
    yPosition += 40;
    
    // Grammar Points Section
    if (analysis.grammar_points && analysis.grammar_points.length > 0) {
      this.addSectionHeader("Grammar Points", yPosition);
      yPosition += 60;
      yPosition = this.addGrammarPoints(analysis.grammar_points, yPosition);
      yPosition += 40;
    }
    
    // Example Sentences Section
    if (analysis.example_sentences && analysis.example_sentences.length > 0) {
      this.addSectionHeader("Example Sentences", yPosition);
      yPosition += 60;
      yPosition = this.addExampleSentences(analysis.example_sentences, yPosition);
      yPosition += 40;
    }
    
    // Cultural Notes Section (if available)
    if (analysis.cultural_notes) {
      this.addSectionHeader("Cultural Notes", yPosition);
      yPosition += 60;
      yPosition = this.addTextBlock(analysis.cultural_notes, yPosition);
      yPosition += 40;
    }
    
    // Learning Tips Section
    if (analysis.pronunciation_tips || analysis.common_mistakes) {
      this.addSectionHeader("Learning Tips", yPosition);
      yPosition += 60;
      
      if (analysis.pronunciation_tips) {
        this.addSubsectionHeader("Pronunciation", yPosition);
        yPosition += 30;
        yPosition = this.addTextBlock(analysis.pronunciation_tips, yPosition);
        yPosition += 20;
      }
      
      if (analysis.common_mistakes) {
        this.addSubsectionHeader("Common Mistakes", yPosition);
        yPosition += 30;
        yPosition = this.addTextBlock(analysis.common_mistakes, yPosition);
        yPosition += 20;
      }
    }
    
    // Alternative Expressions Section (if available)
    if (analysis.alternative_expressions && analysis.alternative_expressions.length > 0) {
      this.addSectionHeader("Alternative Expressions", yPosition);
      yPosition += 60;
      yPosition = this.addAlternativeExpressions(analysis.alternative_expressions, yPosition);
      yPosition += 40;
    }
  }
  
  /**
   * Add the word breakdown table to the content
   */
  private addWordBreakdown(words: any[], yPosition: number): number {
    if (!this.contentContainer || words.length === 0) return yPosition;
    
    const contentWidth = this.contentPanel!.width * 0.8;
    const lineHeight = 30;
    let currentY = yPosition;
    
    words.forEach((word, index) => {
      // Word row background (alternating colors for readability)
      const rowBg = this.add.rectangle(
        0,
        currentY + lineHeight / 2,
        contentWidth,
        lineHeight,
        index % 2 === 0 ? 0x2a2a2a : 0x333333
      );
      rowBg.setOrigin(0.5, 0.5);
      this.contentContainer!.add(rowBg);
      
      // Japanese word with reading
      const japaneseText = this.add.text(
        -contentWidth * 0.4,
        currentY,
        `${word.word} (${word.reading})`,
        {
          fontFamily: 'Arial',
          fontSize: '18px',
          color: '#ffffff'
        }
      );
      japaneseText.setOrigin(0, 0);
      
      // Romaji
      const romajiText = this.add.text(
        -contentWidth * 0.05,
        currentY,
        word.romaji,
        {
          fontFamily: 'Arial',
          fontSize: '16px',
          color: '#ccccff'
        }
      );
      romajiText.setOrigin(0, 0);
      
      // Part of speech
      const posText = this.add.text(
        contentWidth * 0.15,
        currentY,
        word.part_of_speech,
        {
          fontFamily: 'Arial',
          fontSize: '16px',
          color: '#aaaaaa',
          fontStyle: 'italic'
        }
      );
      posText.setOrigin(0, 0);
      
      // Meaning
      const meaningText = this.add.text(
        contentWidth * 0.35,
        currentY,
        word.meaning,
        {
          fontFamily: 'Arial',
          fontSize: '16px',
          color: '#ffffff'
        }
      );
      meaningText.setOrigin(0, 0);
      
      this.contentContainer!.add([japaneseText, romajiText, posText, meaningText]);
      
      // Add optional usage notes if present
      if (word.notes) {
        currentY += lineHeight;
        const notesText = this.add.text(
          -contentWidth * 0.4 + 20,
          currentY,
          `Note: ${word.notes}`,
          {
            fontFamily: 'Arial',
            fontSize: '14px',
            color: '#aaaaaa',
            fontStyle: 'italic'
          }
        );
        notesText.setOrigin(0, 0);
        this.contentContainer!.add(notesText);
      }
      
      currentY += lineHeight + 5;
    });
    
    return currentY;
  }
  
  /**
   * Add grammar points to the content
   */
  private addGrammarPoints(grammarPoints: any[], yPosition: number): number {
    if (!this.contentContainer || grammarPoints.length === 0) return yPosition;
    
    const contentWidth = this.contentPanel!.width * 0.8;
    let currentY = yPosition;
    
    grammarPoints.forEach((grammarPoint, index) => {
      // Pattern
      const patternText = this.add.text(
        -contentWidth * 0.4,
        currentY,
        grammarPoint.pattern,
        {
          fontFamily: 'Arial',
          fontSize: '20px',
          color: '#4a90e2',
          fontStyle: 'bold'
        }
      );
      patternText.setOrigin(0, 0);
      this.contentContainer!.add(patternText);
      currentY += 30;
      
      // Difficulty level with color coding
      let difficultyColor: string;
      switch (grammarPoint.difficulty_level.toLowerCase()) {
        case 'beginner':
          difficultyColor = '#4caf50'; // green
          break;
        case 'intermediate':
          difficultyColor = '#ffc107'; // amber
          break;
        case 'advanced':
          difficultyColor = '#f44336'; // red
          break;
        default:
          difficultyColor = '#aaaaaa'; // gray
      }
      
      const difficultyText = this.add.text(
        contentWidth * 0.3,
        currentY - 30,
        grammarPoint.difficulty_level.toUpperCase(),
        {
          fontFamily: 'Arial',
          fontSize: '14px',
          color: difficultyColor,
          fontStyle: 'bold'
        }
      );
      difficultyText.setOrigin(0, 0);
      this.contentContainer!.add(difficultyText);
      
      // Explanation
      const explanationText = this.add.text(
        -contentWidth * 0.38,
        currentY,
        grammarPoint.explanation,
        {
          fontFamily: 'Arial',
          fontSize: '16px',
          color: '#ffffff',
          wordWrap: { width: contentWidth * 0.75 }
        }
      );
      explanationText.setOrigin(0, 0);
      this.contentContainer!.add(explanationText);
      currentY += explanationText.height + 10;
      
      // Usage notes
      const usageText = this.add.text(
        -contentWidth * 0.38,
        currentY,
        `Usage: ${grammarPoint.usage_notes}`,
        {
          fontFamily: 'Arial',
          fontSize: '14px',
          color: '#aaaaaa',
          fontStyle: 'italic',
          wordWrap: { width: contentWidth * 0.75 }
        }
      );
      usageText.setOrigin(0, 0);
      this.contentContainer!.add(usageText);
      currentY += usageText.height + 20;
      
      // Add separator line if not the last item
      if (index < grammarPoints.length - 1) {
        const separator = this.add.line(
          0,
          currentY,
          -contentWidth * 0.4,
          0,
          contentWidth * 0.4,
          0,
          0x555555
        );
        this.contentContainer!.add(separator);
        currentY += 20;
      }
    });
    
    return currentY;
  }
  
  /**
   * Add example sentences to the content
   */
  private addExampleSentences(examples: any[], yPosition: number): number {
    if (!this.contentContainer || examples.length === 0) return yPosition;
    
    const contentWidth = this.contentPanel!.width * 0.8;
    let currentY = yPosition;
    
    examples.forEach((example, index) => {
      // Japanese text
      const japaneseText = this.add.text(
        -contentWidth * 0.4,
        currentY,
        example.japanese,
        {
          fontFamily: 'Arial',
          fontSize: '18px',
          color: '#ffffff',
          wordWrap: { width: contentWidth * 0.75 }
        }
      );
      japaneseText.setOrigin(0, 0);
      this.contentContainer!.add(japaneseText);
      currentY += japaneseText.height + 5;
      
      // Romaji
      const romajiText = this.add.text(
        -contentWidth * 0.4,
        currentY,
        example.romaji,
        {
          fontFamily: 'Arial',
          fontSize: '16px',
          color: '#ccccff',
          wordWrap: { width: contentWidth * 0.75 }
        }
      );
      romajiText.setOrigin(0, 0);
      this.contentContainer!.add(romajiText);
      currentY += romajiText.height + 5;
      
      // English
      const englishText = this.add.text(
        -contentWidth * 0.4,
        currentY,
        example.english,
        {
          fontFamily: 'Arial',
          fontSize: '16px',
          color: '#aaaaaa',
          fontStyle: 'italic',
          wordWrap: { width: contentWidth * 0.75 }
        }
      );
      englishText.setOrigin(0, 0);
      this.contentContainer!.add(englishText);
      currentY += englishText.height + 20;
      
      // Add separator line if not the last item
      if (index < examples.length - 1) {
        const separator = this.add.line(
          0,
          currentY - 10,
          -contentWidth * 0.4,
          0,
          contentWidth * 0.4,
          0,
          0x555555,
          0.5
        );
        this.contentContainer!.add(separator);
        currentY += 10;
      }
    });
    
    return currentY;
  }
  
  /**
   * Add alternative expressions to the content
   */
  private addAlternativeExpressions(alternatives: any[], yPosition: number): number {
    if (!this.contentContainer || alternatives.length === 0) return yPosition;
    
    const contentWidth = this.contentPanel!.width * 0.8;
    let currentY = yPosition;
    
    alternatives.forEach((alt, index) => {
      // Japanese text
      const japaneseText = this.add.text(
        -contentWidth * 0.4,
        currentY,
        alt.japanese,
        {
          fontFamily: 'Arial',
          fontSize: '18px',
          color: '#ffffff',
          wordWrap: { width: contentWidth * 0.75 }
        }
      );
      japaneseText.setOrigin(0, 0);
      this.contentContainer!.add(japaneseText);
      currentY += japaneseText.height + 5;
      
      // Romaji
      const romajiText = this.add.text(
        -contentWidth * 0.4,
        currentY,
        alt.romaji,
        {
          fontFamily: 'Arial',
          fontSize: '16px',
          color: '#ccccff',
          wordWrap: { width: contentWidth * 0.75 }
        }
      );
      romajiText.setOrigin(0, 0);
      this.contentContainer!.add(romajiText);
      currentY += romajiText.height + 5;
      
      // English
      const englishText = this.add.text(
        -contentWidth * 0.4,
        currentY,
        alt.english,
        {
          fontFamily: 'Arial',
          fontSize: '16px',
          color: '#aaaaaa',
          fontStyle: 'italic',
          wordWrap: { width: contentWidth * 0.75 }
        }
      );
      englishText.setOrigin(0, 0);
      this.contentContainer!.add(englishText);
      currentY += englishText.height + 10;
      
      // Usage context
      const usageText = this.add.text(
        -contentWidth * 0.4,
        currentY,
        `Context: ${alt.usage_context}`,
        {
          fontFamily: 'Arial',
          fontSize: '14px',
          color: '#aaaaaa',
          wordWrap: { width: contentWidth * 0.75 }
        }
      );
      usageText.setOrigin(0, 0);
      this.contentContainer!.add(usageText);
      currentY += usageText.height + 20;
      
      // Add separator line if not the last item
      if (index < alternatives.length - 1) {
        const separator = this.add.line(
          0,
          currentY - 10,
          -contentWidth * 0.4,
          0,
          contentWidth * 0.4,
          0,
          0x555555,
          0.5
        );
        this.contentContainer!.add(separator);
        currentY += 10;
      }
    });
    
    return currentY;
  }
  
  /**
   * Add a text block to the content
   */
  private addTextBlock(text: string, yPosition: number): number {
    if (!this.contentContainer) return yPosition;
    
    const contentWidth = this.contentPanel!.width * 0.8;
    
    const textBlock = this.add.text(
      -contentWidth * 0.4,
      yPosition,
      text,
      {
        fontFamily: 'Arial',
        fontSize: '16px',
        color: '#ffffff',
        wordWrap: { width: contentWidth * 0.75 }
      }
    );
    textBlock.setOrigin(0, 0);
    this.contentContainer!.add(textBlock);
    
    return yPosition + textBlock.height + 10;
  }
  
  /**
   * Add a section header to the content container
   */
  private addSectionHeader(text: string, yPosition: number): void {
    if (!this.contentContainer) return;
    
    const contentWidth = this.contentPanel!.width * 0.8;
    
    const header = this.add.text(
      0,
      yPosition,
      text,
      {
        fontFamily: 'Arial',
        fontSize: '24px',
        fontStyle: 'bold',
        color: '#4a90e2',
        align: 'left',
      }
    );
    header.setOrigin(0.5, 0);
    
    // Add a line below the header
    const line = this.add.line(
      0,
      yPosition + header.height + 5,
      -contentWidth * 0.4,
      0,
      contentWidth * 0.4,
      0,
      0xcccccc
    );
    
    this.contentContainer!.add([header, line]);
  }
  
  /**
   * Add a subsection header to the content container
   */
  private addSubsectionHeader(text: string, yPosition: number): void {
    if (!this.contentContainer) return;
    
    const contentWidth = this.contentPanel!.width * 0.8;
    
    const header = this.add.text(
      -contentWidth * 0.4,
      yPosition,
      text,
      {
        fontFamily: 'Arial',
        fontSize: '18px',
        fontStyle: 'bold',
        color: '#aaaaff',
        align: 'left',
      }
    );
    header.setOrigin(0, 0);
    
    this.contentContainer!.add(header);
  }
  
  /**
   * Add placeholder content for the scrollable area
   * This will be shown if no phrase analysis is available
   */
  private addPlaceholderContent(): void {
    if (!this.contentContainer) return;
    
    const contentWidth = this.contentPanel!.width * 0.9;
    
    // Add section headers and placeholder content
    this.addSectionHeader("Word Breakdown", 0);
    this.addPlaceholderText(
      "This section will display a breakdown of individual words in the phrase, including readings, parts of speech, and meanings.",
      60
    );
    
    this.addSectionHeader("Grammar Points", 180);
    this.addPlaceholderText(
      "This section will explain the grammar patterns used in the phrase, with explanations and usage notes.",
      240
    );
    
    this.addSectionHeader("Example Sentences", 360);
    this.addPlaceholderText(
      "This section will show example sentences using similar patterns or vocabulary.",
      420
    );
    
    this.addSectionHeader("Learning Tips", 540);
    this.addPlaceholderText(
      "This section will provide pronunciation tips, common mistakes to avoid, and other learning aids.",
      600
    );
  }
  
  /**
   * Add placeholder text to the content container
   */
  private addPlaceholderText(text: string, yPosition: number): void {
    if (!this.contentContainer) return;
    
    const contentWidth = this.contentPanel!.width * 0.8;
    
    const placeholder = this.add.text(
      0,
      yPosition,
      text,
      {
        fontFamily: 'Arial',
        fontSize: '18px',
        color: '#aaaaaa',
        align: 'center',
        wordWrap: { width: contentWidth }
      }
    );
    placeholder.setOrigin(0.5, 0);
    
    this.contentContainer!.add(placeholder);
  }
  
  /**
   * Set up input handlers for scrolling the content area
   */
  private setupScrollHandlers(): void {
    if (!this.contentContainer) return;
    
    // Handle pointer down events
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      // Only initiate dragging if pointer is within the content area
      if (this.isInContentArea(pointer)) {
        this.isDragging = true;
        this.lastY = pointer.y;
      }
    });
    
    // Handle pointer move events for scrolling
    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (this.isDragging && this.contentContainer) {
        const deltaY = pointer.y - this.lastY;
        this.contentContainer.y += deltaY;
        
        // Apply constraints to keep content within bounds
        this.applyScrollConstraints();
        
        this.lastY = pointer.y;
      }
    });
    
    // Handle pointer up to end dragging
    this.input.on('pointerup', () => {
      this.isDragging = false;
    });
    
    // Handle mouse wheel for scrolling
    this.input.on('wheel', (pointer: any, gameObjects: any, deltaX: number, deltaY: number) => {
      if (this.contentContainer && this.isInContentArea(pointer)) {
        this.contentContainer.y -= deltaY * 0.5;
        this.applyScrollConstraints();
      }
    });
  }
  
  /**
   * Check if a pointer is within the content area
   */
  private isInContentArea(pointer: Phaser.Input.Pointer): boolean {
    if (!this.contentPanel) return false;
    
    const panelBounds = this.contentPanel.getBounds();
    const headerHeight = 200; // Same as used in createScrollableContentArea
    
    // Create a rectangle representing just the scrollable content area
    const contentArea = new Phaser.Geom.Rectangle(
      panelBounds.x,
      panelBounds.y + headerHeight,
      panelBounds.width,
      panelBounds.height - headerHeight
    );
    
    return contentArea.contains(pointer.x, pointer.y);
  }
  
  /**
   * Apply constraints to keep the scrollable content within bounds
   */
  private applyScrollConstraints(): void {
    if (!this.contentContainer) return;
    
    // Get the total height of content - this will be updated as content is added
    const contentHeight = this.getContentHeight();
    const visibleHeight = this.contentPanel!.height - 250; // Height minus header and some padding
    
    // Only allow scrolling if content is taller than visible area
    if (contentHeight > visibleHeight) {
      // Upper bound (scrolled all the way down)
      const upperBound = this.contentMinY - (contentHeight - visibleHeight);
      
      // Clamp the content position between the upper and lower bounds
      this.contentContainer.y = Phaser.Math.Clamp(
        this.contentContainer.y,
        upperBound,
        this.contentMinY
      );
    } else {
      // If content is shorter than the visible area, reset to top
      this.contentContainer.y = this.contentMinY;
    }
  }
  
  /**
   * Calculate the total height of the content within the container
   */
  private getContentHeight(): number {
    if (!this.contentContainer || this.contentContainer.list.length === 0) {
      return 0;
    }
    
    // Find the bottommost point of all content
    let bottomY = 0;
    this.contentContainer.each((child: Phaser.GameObjects.GameObject) => {
      const gameObject = child as any;
      if (gameObject.y !== undefined && gameObject.height !== undefined) {
        const childBottom = gameObject.y + gameObject.height;
        bottomY = Math.max(bottomY, childBottom);
      }
    });
    
    return bottomY;
  }
  
  /**
   * Return to the VN Scene
   */
  private returnToVNScene(): void {
    console.log('Returning to VN Scene');
    
    // Stop this scene and resume the VN Scene
    this.scene.stop();
    this.scene.resume('VNScene');
  }
  
  /**
   * Serialize scene state - intentionally throws error
   * StudyScene is designed to be ephemeral and should never be serialized
   */
  serializeState(): any {
    throw new Error('StudyScene.serializeState() should never be called - StudyScene is ephemeral');
  }
  
  /**
   * Deserialize scene state - intentionally throws error
   * StudyScene is designed to be ephemeral and should never be restored
   */
  deserializeState(_state: any): void {
    throw new Error('StudyScene.deserializeState() should never be called - StudyScene is ephemeral');
  }
}

// Register the scene with the registry
sceneRegistry.register('StudyScene', StudyScene); 