export type Point = {
  x: number,
  y: number
};

export type Size = {
  width: number,
  height: number
};

export class Bounds {
  constructor (
    public x = 0,
    public y = 0,
    public width = 0,
    public height = 0
  ) {}

  get left () { return this.x; }
  get top () { return this.y; }
  get right () { return this.x + this.width; }
  get bottom () { return this.y + this.height; }

  public static fitRatio (container: Bounds, boxAspectRatio: number) {
    let adjustedWidth = container.width;
    let adjustedHeight = adjustedWidth / boxAspectRatio;
    if (adjustedHeight > container.height) {
      adjustedHeight = container.height;
      adjustedWidth = adjustedHeight * boxAspectRatio;
    }

    const yOffset = (container.height - adjustedHeight) / 2;
    const xOffset = (container.width - adjustedWidth) / 2;
    return new Bounds(xOffset, yOffset, adjustedWidth, adjustedHeight);
  }

  scale (xScale: number, yScale: number = xScale) {
    return new Bounds(
      this.x * xScale, this.y * yScale,
      this.width * xScale, this.height * yScale
    );
  }
}
