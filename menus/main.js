const game = new Game();

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
    game.player.move();
  }
  if (!game.gameStarted && game.menu.serversOnline && keyCode === 13) {
    // hit enter to start game
    startGame();
  }
  return false; // prevent any default behaviour
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
  // prevent default
  return false;
}
