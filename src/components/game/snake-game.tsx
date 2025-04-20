'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Import our MVC classes
import { GameState } from './model/GameState';
import { CanvasRenderer } from './view/CanvasRenderer';
import { GameController } from './controller/GameController';

// Game constants
const GRID_SIZE = 20;
const CELL_SIZE = 20;

export function SnakeGame() {
  const [score, setScore] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gameControllerRef = useRef<GameController | null>(null);

  // Initialize the game
  const initGame = useCallback(() => {
    if (!canvasRef.current) return;

    // Create Model: game state
    const gameState = new GameState(GRID_SIZE, GRID_SIZE);
    
    // Create View: renderer
    const renderer = new CanvasRenderer(canvasRef.current, CELL_SIZE);
    
    // Create Controller: game controller
    const controller = new GameController(
      gameState,
      renderer,
      // Score change callback
      (newScore: number) => {
        setScore(newScore);
      },
      // Game over callback
      () => {
        setIsGameOver(true);
        setIsPaused(true);
      }
    );

    // Store controller in ref
    gameControllerRef.current = controller;
    
    // Set initial state
    setScore(0);
    setIsGameOver(false);
    
    // Start game
    controller.start();
    setIsPaused(false);
  }, []);

  // Reset game
  const resetGame = useCallback(() => {
    if (gameControllerRef.current) {
      gameControllerRef.current.restart();
      setIsGameOver(false);
      setIsPaused(false);
    } else {
      initGame();
    }
  }, [initGame]);

  // Toggle pause
  const togglePause = useCallback(() => {
    if (gameControllerRef.current && !isGameOver) {
      gameControllerRef.current.togglePause();
      setIsPaused(gameControllerRef.current.isPaused);
    }
  }, [isGameOver]);

  // Set up canvas and game initialization
  useEffect(() => {
    // Initialize canvas dimensions
    if (canvasRef.current) {
      canvasRef.current.width = GRID_SIZE * CELL_SIZE;
      canvasRef.current.height = GRID_SIZE * CELL_SIZE;

      // Only initialize the game here, don't start it automatically
      const gameState = new GameState(GRID_SIZE, GRID_SIZE);
      const renderer = new CanvasRenderer(canvasRef.current, CELL_SIZE);
      
      // Create the controller but don't start the game loop yet
      const controller = new GameController(
        gameState,
        renderer,
        (newScore: number) => setScore(newScore),
        () => {
          setIsGameOver(true);
          setIsPaused(true);
        }
      );
      
      // Store controller in ref
      gameControllerRef.current = controller;
      
      // Render initial state
      renderer.render(gameState);
    }

    // Cleanup function
    return () => {
      if (gameControllerRef.current) {
        gameControllerRef.current.stop();
      }
    };
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">SnakeByte Game</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="mb-4 text-center">
          <div className="text-2xl font-bold">Score: {score}</div>
          {isGameOver && <div className="text-red-500 mt-2">Game Over!</div>}
          {isPaused && !isGameOver && <div className="text-amber-500 mt-2">Paused</div>}
        </div>
        <div className="relative">
          <canvas 
            ref={canvasRef}
            className="border border-border bg-card"
          />
          {isPaused && !isGameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="text-white text-xl font-bold">PAUSED</div>
            </div>
          )}
        </div>
        <div className="mt-4 text-sm text-center text-muted-foreground">
          Use arrow keys to move, space to pause
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-4">
        <Button onClick={resetGame} variant="default">
          {isGameOver ? 'Restart' : 'Start'} Game
        </Button>
        <Button onClick={togglePause} variant="outline" disabled={isGameOver}>
          {isPaused ? 'Resume' : 'Pause'}
        </Button>
      </CardFooter>
    </Card>
  );
} 