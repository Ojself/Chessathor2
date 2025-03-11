class Player {
  constructor(x, y, name) {
    this.x = x;
    this.y = y;
    this.height = 50;
    this.width = 50;
    this.name = name;
    this.tempMove = [];
    this.isMoving = false;
    this.lastCoordinates = [25, 725];
  }

  setup() {
    this.playerImg = loadImage('assets/bk.png');
  }

  draw() {
    image(
      this.playerImg,
      this.x - 15,
      this.y - 15,
      this.width + 30,
      this.height + 30
    );
  }

  // Knocks the player back upon collision with 'check'
  knockBack() {
    this.x = this.lastCoordinates[0];
    this.y = this.lastCoordinates[1];
  }

  movePlayer(direction) {
    switch (direction) {
      case 'northeast':
      case 'eastnorth':
        this.smoothMove(1, -1);
        break;
      case 'eastsouth':
      case 'southeast':
        this.smoothMove(1, 1);
        break;
      case 'westsouth':
      case 'southwest':
        this.smoothMove(-1, 1);
        break;
      case 'westnorth':
      case 'northwest':
        this.smoothMove(-1, -1);
        break;
      case 'north':
        this.smoothMove(0, -1);
        break;
      case 'south':
        this.smoothMove(0, 1);
        break;
      case 'west':
        this.smoothMove(-1, 0);
        break;
      case 'east':
        this.smoothMove(1, 0);
        break;
      default:
        break;
    }
  }

  smoothMove(x, y) {
    if (this.isMoving || checkBorders(x, y, this.x, this.y)) {
      return;
    }
    this.isMoving = true;
    this.lastCoordinates = [this.x, this.y];
    game.moveHistory.push([x, y]);
    game.totalMoveHistory.push([x, y]);
    let moveIntervalHelper = 0;
    aa.play('move'); // Play movement sound

    const moveInterval = setInterval(() => {
      this.x += x * 5;
      this.y += y * 5;
      moveIntervalHelper++;
      if (moveIntervalHelper > 19) {
        this.isMoving = false;
        clearInterval(moveInterval);
      }
    }, 1);
  }
}

/**
 * Check if the player’s movement would cross the canvas borders.
 */
function checkBorders(x, y, playerX, playerY) {
  if (y) {
    // Check vertical borders
    if (y > 0 && playerY + 100 > height) {
      return true;
    }
    if (y < 0 && playerY - 100 < 0) {
      return true;
    }
  }
  if (x) {
    // Check horizontal borders (includes buffer for UI elements)
    const rightMenuBuffer = -200;
    if (x > 0 && playerX + 100 > width + rightMenuBuffer) {
      return true;
    }
    if (x < 0 && playerX - 100 < 0) {
      return true;
    }
  }
  return false;
}
