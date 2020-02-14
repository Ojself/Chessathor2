class Player {
  constructor(x, y, name) {
    this.x = x;
    this.y = y;
    this.height = 50;
    this.width = 50;
    this.name = name
    this.tempMove = [];

    this.lastMove;
    this.isMoving = false

  }

  setup() {
    this.playerImg = loadImage('pics/bk.png');
  }
  draw() {
    image(this.playerImg, this.x, this.y, this.width, this.height);
    // debug
    /* 
    fill('blue')
    text(`${this.x}, ${this.y}`, this.x, this.y) */

  }

  // knocks back player when walking into 'check'
  knockBack() {
    const knockBackDirection = getOppositeDirection(this.lastMove)
    this.smoothMove(knockBackDirection[0], knockBackDirection[1])
  }

  move() {
    this.tempMove.push(keyCode);
    let direction;
    const directions = {
      38: 'north',
      40: 'south',
      37: 'west',
      39: 'east'
    };

    if (this.tempMove.length === 2) {
      this.tempMove.sort()
      direction = `${directions[this.tempMove[0]]}${directions[this.tempMove[1]]}`
      this.tempMove = [];
      this.movePlayer(direction);
    } else {
      setTimeout(() => {
        direction = directions[this.tempMove[0]];
        if (direction) {
          this.movePlayer(direction);
        }
        this.tempMove = [];
      }, 20);
    }
  }

  movePlayer(direction) {
    this.lastMove = direction
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
      return
    }
    this.isMoving = true
    game.moveHistory.push([x, y])
    let helperCounter = 0;
    let moveMentInterval = setInterval(() => {
      this.x += (x * 5)
      this.y += (y * 5)
      helperCounter++
      if (helperCounter > 19) {
        this.isMoving = false
        clearInterval(moveMentInterval);
      }
    }, 1);
  }
}

function getOppositeDirection(lastDirection) {
  const oppositeDirection = {
    northeast: [-1, 1],
    eastsouth: [-1, -1],
    westsouth: [1, -1],
    westnorth: [1, 1],
    north: [0, 1],
    south: [0, -1],
    west: [1, 0],
    east: [-1, 0]
  }
  const xy = oppositeDirection[lastDirection]
  return xy
}

function checkBorders(x, y, playerX, playerY) {
  if (!!y) { // if player is moving south or north
    if (y > 0 && playerY + 100 > height) {
      return true
    }
    if (y < 0 && playerY - 100 < 0) {
      return true
    }
  }
  if (!!x) { // if player is even moving east or west
    const rightMenuBuffer = -200
    if (x > 0 && playerX + 100 > width+rightMenuBuffer) {
      return true
    }
    if (x < 0 && playerX - 100 < 0) {
      return true
    }
  }
  return false
}
