const game = new Game();
//const menu = new Menu()

function preload() {
  //  game.player.preload();
}

function setup() {
  createCanvas(1000, 780);
  game.setup();
}

function draw() {

  /* if (frameCount % 200 === 0) {
    wakeUpServer()
  } */

  game.draw();
}

function keyPressed() {
  if (keyCode < 41 && keyCode > 36) {
    game.player.move()
  }
  return false; // prevent any default behaviour
}
