export interface Position {
  x: number;
  y: number;
}

export interface MovementRecord {
  x: number;
  y: number;
  timestamp: number;
}

export interface GameState {
  isRunning: boolean;
  isGameOver: boolean;
  score: number;
  survivalTime: number;
}
