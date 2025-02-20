class FinishTile {
  constructor(x, y, id) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.id = id;
    this.name = 'goal';
  }

  setup() {
    this.goalImg = loadImage('assets/goalTile.png');
  }

  draw() {
    image(this.goalImg, this.x, this.y, this.width, this.height);
  }
  collisionCheck(player) {
    const rx = this.x + 40;
    const ry = this.y + 40;
    if (
      player.y <= ry &&
      player.x <= rx &&
      player.y > this.y &&
      player.x > this.x &&
      player.isMoving === false
    ) {
      return true;
    }
    return false;
  }
}
