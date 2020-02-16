
const game = new Game();


function setup() {
  createCanvas(1000, 780);
  game.setup();
}

function draw() {
  game.draw();
}

function keyPressed() {
  if (keyCode < 41 && keyCode > 36) {
    game.player.move()
  }
  if (game.gameOver) {
    game.hud.enterName(key, keyCode)
  }
  return false; // prevent any default behaviour
}

function mouseClicked() {

  if (game.gameOver) {
    if (game.hud.submitHover()) {
      console.log('submit')
      finishGame(game.playerName, game.hud.inputField)
    }
  }

  if (!game.gameStarted) {
    if (game.menu.checkMouseHover()) {
      startGame()
    }
  }



  // prevent default
  return false;
}
