

export class Coin {
  x: number;
  y: number;
  radius: number;
  collected: boolean;
  spawnTime: number;
  pulsePhase: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.collected = false;
    this.spawnTime = Date.now();
    this.pulsePhase = Math.random() * Math.PI * 2;
  }

  update(): void {
    this.pulsePhase += 0.1;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.collected) return;

    const pulse = Math.sin(this.pulsePhase) * 0.2 + 1;
    const currentRadius = this.radius * pulse;

    // Glow effect
    ctx.shadowBlur = 25;
    ctx.shadowColor = '#ff0';

    // Main body
    ctx.beginPath();
    ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#ff0';
    ctx.fill();
    ctx.closePath();

    // Inner shine
    ctx.beginPath();
    ctx.arc(this.x - currentRadius * 0.3, this.y - currentRadius * 0.3, currentRadius * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();

    ctx.shadowBlur = 0;
  }
}
