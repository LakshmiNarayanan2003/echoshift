import { Game } from './Game';

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const startScreen = document.getElementById('start-screen') as HTMLElement;
const gameOverScreen = document.getElementById('game-over-screen') as HTMLElement;
const hud = document.getElementById('hud') as HTMLElement;
const startButton = document.getElementById('start-button') as HTMLButtonElement;
const restartButton = document.getElementById('restart-button') as HTMLButtonElement;
const scoreDisplay = document.getElementById('score-display') as HTMLElement;
const timeDisplay = document.getElementById('time-display') as HTMLElement;
const gameOverScore = document.getElementById('game-over-score') as HTMLElement;
const gameOverTime = document.getElementById('game-over-time') as HTMLElement;

// Set initial canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const game = new Game(canvas);

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function updateHUD(): void {
  const state = game.getState();
  scoreDisplay.textContent = state.score.toString();
  timeDisplay.textContent = formatTime(state.survivalTime);
}

function showStartScreen(): void {
  startScreen.classList.remove('hidden');
  gameOverScreen.classList.add('hidden');
  hud.classList.add('hidden');
}

function showGameOverScreen(): void {
  const state = game.getState();
  gameOverScore.textContent = `Score: ${state.score}`;
  gameOverTime.textContent = `Survived: ${formatTime(state.survivalTime)}`;
  gameOverScreen.classList.remove('hidden');
  hud.classList.add('hidden');
}

function showHUD(): void {
  startScreen.classList.add('hidden');
  gameOverScreen.classList.add('hidden');
  hud.classList.remove('hidden');
}

function startGame(): void {
  showHUD();
  game.start();
  requestAnimationFrame(gameLoop);
}

function gameLoop(): void {
  if (!game.getState().isRunning) {
    if (game.getState().isGameOver) {
      showGameOverScreen();
    }
    return;
  }

  updateHUD();
  requestAnimationFrame(gameLoop);
}

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);

// Initialize
showStartScreen();
