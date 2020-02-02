class Player {
  constructor() {
    this.x = 525;
    this.y = 825;
    this.height = 50;
    this.width = 50;
    this.currentMoves = [];
  }

  setup() {
    this.playerImg = loadImage('pics/bk.png');
  }
  draw() {

    image(this.playerImg, this.x, this.y, this.width, this.height);
  }

  move() {
    this.currentMoves.push(keyCode);
    let direction;
    const directions = {
      38: 'north',
      40: 'south',
      37: 'west',
      39: 'east'
    };

    // takes care of double keys
    if (this.currentMoves.length === 2) {
      if (this.currentMoves.every(i => [38, 39].includes(i))) {
        direction = 'northEast';
      }
      if (this.currentMoves.every(i => [40, 39].includes(i))) {
        direction = 'southEast';
      }
      if (this.currentMoves.every(i => [40, 37].includes(i))) {
        direction = 'southWest';
      }
      if (this.currentMoves.every(i => [38, 37].includes(i))) {
        direction = 'northWest';
      }
      this.currentMoves = [];
      this.movePlayer(direction);
    } else {
      // check legal action
      setTimeout(() => {
        direction = directions[this.currentMoves[0]];
        this.movePlayer(direction);
        this.currentMoves = [];
      }, 20);
    }
  }

  movePlayer(direction) {
    switch (direction) {
      case 'northEast':
        this.smoothMove('y', -100);
        this.smoothMove('x', +100);
        break;
      case 'southEast':
        this.smoothMove('y', 100);
        this.smoothMove('x', 100);
        break;
      case 'southWest':
        this.smoothMove('y', 100);
        this.smoothMove('x', -100);
        break;
      case 'northWest':
        this.smoothMove('y', -100);
        this.smoothMove('x', -100);
        break;
      case 'north':
        this.smoothMove('y', -100);
        break;
      case 'south':
        this.smoothMove('y', 100);
        break;
      case 'west':
        this.smoothMove('x', -100);
        break;
      case 'east':
        this.smoothMove('x', 100);
        break;
    }
  }
  smoothMove(axis, value) {
    const schrödingerValue = Math.sign(value) * 5;
    let helperCounter = 0;
    let moveMentInterval = setInterval(() => {
      this[axis] += schrödingerValue;
      helperCounter++;
      if (helperCounter > 19) {
        clearInterval(moveMentInterval);
      }
    }, 1);
  }
}
