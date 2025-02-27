const game = new Game();
const pressed = new Set();

const solveDirection = (pressedKeys) => {
  const directions = {
    38: 'north',
    40: 'south',
    37: 'west',
    39: 'east',
    87: 'north',
    65: 'west',
    68: 'east',
    83: 'south',
    88: 'south',
    69: 'northeast',
    81: 'westnorth',
    90: 'westsouth',
    67: 'eastsouth',
  };
  let direction = '';
  pressedKeys.forEach((key) => {
    direction += directions[key];
  });
  return direction;
};

function setup() {
  createCanvas(1000, 800);
  game.setup();
}

function draw() {
  game.draw();
}

const allowedMovementKeys = [
  37, 38, 39, 40, 41, 65, 67, 68, 69, 81, 83, 87, 88, 90,
];

function keyPressed() {
  if (game.gameOver) {
    game.hud.enterName(key, keyCode);
  } else if (allowedMovementKeys.includes(keyCode)) {
    if (!pressed.has(keyCode)) {
      pressed.add(keyCode);
    }
  }

  // Start game on Enter (keyCode 13) if conditions met
  if (!game.gameStarted && game.menu.serversOnline && keyCode === 13) {
    startGame();
  }
  return false; // Prevent any default behaviour
}
function keyReleased() {
  const direction = solveDirection(pressed);
  game.player.movePlayer(direction);
  pressed.clear();
}

function mouseClicked() {
  if (game.gameOver) {
    if (game.hud.submitHover()) {
      finishGame(game.playerName, game.hud.inputField);
    }
  }
  if (!game.gameStarted) {
    if (game.menu.checkMouseHover()) {
      startGame();
    }
  }
  return false; // Prevent default
}
