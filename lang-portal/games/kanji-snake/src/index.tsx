import React, { useEffect, useRef } from 'react';
import { GameProps } from '@lang-portal/shared/types';
import Phaser from 'phaser';
import MainScene from './scenes/MainScene';
import TitleScene from './scenes/TitleScene';

/**
 * Base Game Component
 * 
 * This is a template for creating new games. Your game should:
 * 1. Accept and implement the GameProps interface
 * 2. Use the apiClient for backend communication
 * 3. Handle the sessionId for tracking progress
 * 4. Call onGameComplete when the game ends
 */
export function BaseGame({ apiClient, sessionId, onGameComplete, title = 'Kanji Snake' }: GameProps) {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!gameRef.current) {
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 1200,  // 48 * 25
        height: 900,  // 36 * 25
        parent: 'game-container',
        backgroundColor: '#1a1a1a',
        scene: [TitleScene, MainScene],
        pixelArt: false,
      };

      gameRef.current = new Phaser.Game(config);
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [sessionId]);

  return (
    <div className="base-game">
      <h1>{title}</h1>
      <div id="game-container" />
    </div>
  );
}

export default BaseGame; 