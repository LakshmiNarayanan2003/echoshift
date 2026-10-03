import { Player } from './Player';
import { Ghost } from './Ghost';
import { Coin } from './Coin';
import { GameState } from './types';

export class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  player: Player;
  ghosts: Ghost[];
  coins: Coin[];
  keys: Set<string>;
  state: GameState;
  lastGhostSpawn: number;
  ghostSpawnInterval: number;
  animationId: number | null;
  lastCoinSpawn: number;
  coinSpawnInterval: number;
  startTime: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');
    this.ctx = ctx;

    this.player = new Player(canvas.width / 2, canvas.height / 2);
    this.ghosts = [];
    this.coins = [];
    this.keys = new Set();
    this.state = {
      isRunning: false,
      isGameOver: false,
      score: 0,
      survivalTime: 0
    };
    this.lastGhostSpawn = Date.now();
    this.ghostSpawnInterval = 10000; // 10 seconds
    this.animationId = null;
    this.lastCoinSpawn = Date.now();
    this.coinSpawnInterval = 2000; // 2 seconds
    this.startTime = 0;

    this.setupEventListeners();
  }

  setupEventListeners(): void {
    window.addEventListener('keydown', (e) => {
      this.keys.add(e.code);
    });

    window.addEventListener('keyup', (e) => {
      this.keys.delete(e.code);
    });

    window.addEventListener('resize', () => {
      this.resizeCanvas();
    });
  }

  resizeCanvas(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  start(): void {
    this.state = {
      isRunning: true,
      isGameOver: false,
      score: 0,
      survivalTime: 0
    };
    this.player = new Player(this.canvas.width / 2, this.canvas.height / 2);
    this.ghosts = [];
    this.coins = [];
    this.lastGhostSpawn = Date.now();
    this.lastCoinSpawn = Date.now();
    this.startTime = Date.now();
    this.resizeCanvas();

    // Spawn initial coins
    for (let i = 0; i < 5; i++) {
      this.spawnCoin();
    }

    this.gameLoop();
  }

  stop(): void {
    this.state.isRunning = false;
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  gameLoop(): void {
    if (!this.state.isRunning) return;

    this.update();
    this.render();

    this.animationId = requestAnimationFrame(() => this.gameLoop());
  }

  update(): void {
    const now = Date.now();

    // Update survival time
    this.state.survivalTime = Math.floor((now - this.startTime) / 1000);

    // Update player
    this.player.update(this.keys, this.canvas.width, this.canvas.height);

    // Update ghosts
    this.ghosts.forEach(ghost => ghost.update());

    // Update coins
    this.coins.forEach(coin => coin.update());

    // Check ghost spawn
    if (now - this.lastGhostSpawn >= this.ghostSpawnInterval) {
      this.spawnGhost();
      this.lastGhostSpawn = now;
    }

    // Check coin spawn
    if (now - this.lastCoinSpawn >= this.coinSpawnInterval) {
      this.spawnCoin();
      this.lastCoinSpawn = now;
    }

    // Check collisions
    this.checkCollisions();

    // Remove collected coins
    this.coins = this.coins.filter(coin => !coin.collected);
  }

  spawnGhost(): void {
    const movementHistory = this.player.getMovementHistory();
    if (movementHistory.length > 0) {
      const colors = ['#f0f', '#0f0', '#f00', '#ff0', '#0ff'];
      const color = colors[this.ghosts.length % colors.length];
      const ghost = new Ghost(movementHistory, color);
      this.ghosts.push(ghost);
    }
    this.player.clearMovementHistory();
  }

  spawnCoin(): void {
    const margin = 50;
    const x = margin + Math.random() * (this.canvas.width - margin * 2);
    const y = margin + Math.random() * (this.canvas.height - margin * 2);
    this.coins.push(new Coin(x, y));
  }

  checkCollisions(): void {
    // Player-coin collision
    this.coins.forEach(coin => {
      if (coin.collected) return;
      const dist = Math.hypot(this.player.x - coin.x, this.player.y - coin.y);
      if (dist < this.player.radius + coin.radius) {
        coin.collected = true;
        this.state.score += 10;
      }
    });

    // Player-ghost collision
    for (const ghost of this.ghosts) {
      const dist = Math.hypot(this.player.x - ghost.x, this.player.y - ghost.y);
      if (dist < this.player.radius + ghost.radius) {
        this.gameOver();
        return;
      }
    }
  }

  gameOver(): void {
    this.state.isGameOver = true;
    this.state.isRunning = false;
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  render(): void {
    // Clear canvas with dark background
    this.ctx.fillStyle = '#0a0a0f';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw grid pattern
    this.drawGrid();

    // Draw coins
    this.coins.forEach(coin => coin.draw(this.ctx));

    // Draw ghosts
    this.ghosts.forEach(ghost => ghost.draw(this.ctx));

    // Draw player
    this.player.draw(this.ctx);
  }

  drawGrid(): void {
    this.ctx.strokeStyle = 'rgba(0, 255, 255, 0.05)';
    this.ctx.lineWidth = 1;
    const gridSize = 50;

    for (let x = 0; x < this.canvas.width; x += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
      this.ctx.stroke();
    }

    for (let y = 0; y < this.canvas.height; y += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
      this.ctx.stroke();
    }
  }

  getState(): GameState {
    return { ...this.state };
  }
}
