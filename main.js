const game = new Game();

function preload() {
  //  game.player.preload();
}

function setup() {
  createCanvas(800, 1000);
  game.setup();
}

function draw() {
  game.draw();
}

function keyPressed() {
  if (keyCode < 41 && keyCode > 36) {
    game.player.move()
  }
  return false; // prevent any default behaviour

}
