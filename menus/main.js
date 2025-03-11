const game = new Game();

const pressed = new Set();

const directions = {
  37: 'west',
  38: 'north',
  39: 'east',
  40: 'south',
  65: 'west',
  68: 'east',
  83: 'south',
  87: 'north',
  88: 'south',
  69: 'northeast',
  81: 'westnorth',
  90: 'westsouth',
  67: 'eastsouth',
};

const allowedMovementKeys = [
  37, 38, 39, 40, 65, 67, 68, 69, 81, 83, 87, 88, 90,
];

function solveDirection(pressedKeys) {
  let direction = '';
  pressedKeys.forEach((code) => {
    direction += directions[code] || '';
  });
  return direction;
}

function setup() {
  createCanvas(1000, 800);
  game.setup();
}

function draw() {
  game.draw();
}

function keyPressed() {
  if (game.gameOver) {
    game.hud.enterName(key, keyCode);
    if (keyCode === 13) {
      finishGame(game.playerName, game.hud.inputField);
    }
    return false;
  }

  if (allowedMovementKeys.includes(keyCode)) {
    if (!pressed.has(keyCode)) {
      pressed.add(keyCode);

      const direction = solveDirection(pressed);
      game.player.movePlayer(direction);
    }
  }

  if (game.serverOnline && !game.gameStarted) {
    startGame();
  }

  return false;
}

function keyReleased() {
  if (allowedMovementKeys.includes(keyCode)) {
    pressed.delete(keyCode);
  }
  return false;
}

function mouseClicked() {
  if (game.gameOver) {
    if (game.hud.submitHover()) {
      finishGame(game.playerName, game.hud.inputField);
    }
  }
  if (!game.gameStarted) {
    if (game.menu.isMenuHovering()) {
      startGame();
    }
  }
  return false;
}
