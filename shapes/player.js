class Player {
  constructor(x, y, name) {
    this.x = x;
    this.y = y;
    this.height = 50;
    this.width = 50;
    this.name = name;
    this.tempMove = [];

    this.isMoving = false;

    this.lastCordinates = [25, 725];
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
    // debug
    /* 
    fill('blue')
    text(`${this.x}, ${this.y}`, this.x, this.y) */
  }

  // knocks back player when walking into 'check'
  knockBack() {
    console.log('Knockback');
    this.x = this.lastCordinates[0];
    this.y = this.lastCordinates[1];
  }

  move() {
    let direction;
    const arrowDirections = {
      38: 'north', // Arrow keys
      40: 'south',
      37: 'west',
      39: 'east',
    };

    const WASDdirections = {
      // WASD QEZCX
      87: 'north',
      65: 'west',
      68: 'east',
      83: 'south', // S
      88: 'south', // X
      69: 'northeast',
      81: 'westnorth',
      90: 'westsouth',
      67: 'eastsouth',
    };
    if (keyCode > 40) {
      direction = WASDdirections[keyCode];
      this.movePlayer(direction);
      return;
    }

    this.tempMove.push(keyCode);
    if (this.tempMove.length === 2) {
      this.tempMove.sort();
      direction = `${arrowDirections[this.tempMove[0]]}${
        arrowDirections[this.tempMove[1]]
      }`;
      this.tempMove = [];
      this.movePlayer(direction);
    } else {
      setTimeout(() => {
        direction = arrowDirections[this.tempMove[0]];
        if (direction) {
          this.movePlayer(direction);
        }
        this.tempMove = [];
      }, 20);
    }
  }

  movePlayer(direction) {
    switch (direction) {
      case 'northeast':
        this.smoothMove(1, -1);
        break;
      case 'eastsouth':
        this.smoothMove(1, 1);
        break;
      case 'westsouth':
        this.smoothMove(-1, 1);
        break;
      case 'westnorth':
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
    }
  }
  smoothMove(x, y) {
    if (this.isMoving || checkBorders(x, y, this.x, this.y)) {
      return;
    }
    this.lastCordinates = [this.x, this.y];
    this.isMoving = true;
    game.moveHistory.push([x, y]);
    game.totalMoveHistory.push([x, y]);
    let moveIntervalHelper = 0;
    aa.play('move'); // audio
    let moveInterval = setInterval(() => {
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

function checkBorders(x, y, playerX, playerY) {
  if (!!y) {
    // if player is moving south or north
    if (y > 0 && playerY + 100 > height) {
      return true;
    }
    if (y < 0 && playerY - 100 < 0) {
      return true;
    }
  }
  if (!!x) {
    // if player is even moving east or west
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
