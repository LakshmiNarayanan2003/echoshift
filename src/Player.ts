import { MovementRecord } from './types';

export class Player {
  x: number;
  y: number;
  radius: number;
  speed: number;
  velocity: { x: number; y: number };
  movementHistory: MovementRecord[];
  historyStartTime: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.radius = 15;
    this.speed = 5;
    this.velocity = { x: 0, y: 0 };
    this.movementHistory = [];
    this.historyStartTime = Date.now();
  }

  update(keys: Set<string>, canvasWidth: number, canvasHeight: number): void {
    this.velocity = { x: 0, y: 0 };

    if (keys.has('ArrowUp') || keys.has('KeyW')) this.velocity.y = -1;
    if (keys.has('ArrowDown') || keys.has('KeyS')) this.velocity.y = 1;
    if (keys.has('ArrowLeft') || keys.has('KeyA')) this.velocity.x = -1;
    if (keys.has('ArrowRight') || keys.has('KeyD')) this.velocity.x = 1;

    // Normalize diagonal movement
    if (this.velocity.x !== 0 && this.velocity.y !== 0) {
      const magnitude = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
      this.velocity.x /= magnitude;
      this.velocity.y /= magnitude;
    }

    this.x += this.velocity.x * this.speed;
    this.y += this.velocity.y * this.speed;

    // Boundary collision
    this.x = Math.max(this.radius, Math.min(canvasWidth - this.radius, this.x));
    this.y = Math.max(this.radius, Math.min(canvasHeight - this.radius, this.y));

    // Record movement
    this.recordMovement();
  }

  recordMovement(): void {
    const now = Date.now();
    this.movementHistory.push({
      x: this.x,
      y: this.y,
      timestamp: now - this.historyStartTime
    });
  }

  getMovementHistory(): MovementRecord[] {
    return [...this.movementHistory];
  }

  clearMovementHistory(): void {
    this.movementHistory = [];
    this.historyStartTime = Date.now();
  }

  draw(ctx: CanvasRenderingContext2D): void {
    // Glow effect
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#0ff';

    // Main body
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#0ff';
    ctx.fill();
    ctx.closePath();

    // Inner glow
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * 0.6, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();

    ctx.shadowBlur = 0;
  }
}
