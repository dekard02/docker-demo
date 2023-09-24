export interface GameComponent {
  x: number;
  y: number;
  width: number;
  height: number;
  render(canvasCxt: CanvasRenderingContext2D): void;
}

export class GameImageComponent implements GameComponent {
  constructor(
    public x: number,
    public y: number,
    public imagePath: string,
    public width: number,
    public height: number
  ) {}

  render(canvasCxt: CanvasRenderingContext2D): void {
    const image: CanvasImageSource = new Image(this.width, this.height);
    image.src = this.imagePath;

    canvasCxt.drawImage(image, this.x, this.y, this.width, this.height);
  }
}

export class GameRectShapeComponent implements GameComponent {
  constructor(
    public x: number,
    public y: number,
    public color: string,
    public width: number,
    public height: number
  ) {}

  render(canvasCxt: CanvasRenderingContext2D): void {
    canvasCxt.fillStyle = this.color;
    canvasCxt.fillRect(this.x, this.y, this.width, this.height);
  }
}
