class FinishTile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
  }

  setup() {
    this.goalImg = loadImage('pics/goalTile.png');
  }

  draw() {
    image(this.goalImg, this.x, this.y, this.width, this.height);
  }
}
