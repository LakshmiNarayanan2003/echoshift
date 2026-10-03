import { MovementRecord } from './types';

export class Ghost {
  x: number;
  y: number;
  radius: number;
  movementRecords: MovementRecord[];
  currentIndex: number;
  spawnTime: number;
  color: string;

  constructor(movementRecords: MovementRecord[], color: string = '#f0f') {
    this.movementRecords = movementRecords;
    this.currentIndex = 0;
    this.spawnTime = Date.now();
    this.color = color;
    this.radius = 15;

    // Start at first recorded position
    if (movementRecords.length > 0) {
      this.x = movementRecords[0].x;
      this.y = movementRecords[0].y;
    } else {
      this.x = 0;
      this.y = 0;
    }
  }

  update(): void {
    if (this.movementRecords.length === 0) return;

    const now = Date.now() - this.spawnTime;
    
    // Find the appropriate position based on elapsed time
    while (
      this.currentIndex < this.movementRecords.length &&
      this.movementRecords[this.currentIndex].timestamp <= now
    ) {
      this.x = this.movementRecords[this.currentIndex].x;
      this.y = this.movementRecords[this.currentIndex].y;
      this.currentIndex++;
    }

    // Loop the movement
    if (this.currentIndex >= this.movementRecords.length) {
      this.currentIndex = 0;
      this.spawnTime = Date.now();
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    // Glow effect
    ctx.shadowBlur = 20;
    ctx.shadowColor = this.color;

    // Main body with transparency
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = 0.7;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.closePath();

    // Inner glow
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.globalAlpha = 0.5;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.closePath();

    ctx.shadowBlur = 0;
  }
}
