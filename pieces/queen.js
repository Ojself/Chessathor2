class Queen {
  constructor(x, y, id) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;

    this.name = 'queen';
    this.id = id; // chess notation eg. E4

    this.expanding = false;
    this.dead = false;
    this.rng = Math.floor(Math.random() * 255);
  }

  setup() {
    this.queenImg = loadImage('assets/bq.png');
  }

  draw() {
    if (this.dead) {
      // drawns ending hearts
      const squareSize = this.width + this.height;
      const maxX = width - 200;
      const maxY = height;
      for (let x = 0; x < maxX; x += squareSize) {
        for (let y = 0; y < maxY; y += squareSize) {
          fill((x / maxX) * 255, (y / maxY) * 255, this.rng);
          heart(x + squareSize / 2, y + squareSize / 2 - 25, squareSize / 2);
        }
      }
    }
    image(
      this.queenImg,
      this.x - 15,
      this.y - 15,
      this.width + 30,
      this.height + 30
    );
  }

  collisionCheck(player) {
    if (this.dead) {
      return false;
    }

    return false;
  }
  tempExpandImage() {
    this.expanding = true;
    setTimeout(() => {
      this.expanding = false;
    }, 200);
  }

  handleDead() {
    this.dead = true;
  }
}
function heart(x, y, size) {
  beginShape();
  vertex(x, y);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);

  game.stopGame();
}
