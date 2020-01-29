class Game {
  constructor() {
    this.squares = [];
    this.pieces = [];
    this.player = new Player();
    this.finishTile = new FinishTile(100, 100);
    this.background = new Background('olivedrab');
    this.map = new Map();
  }
  setup() {
    this.background.setup();
    this.player.setup();
    this.finishTile.setup();
    for (let i = 1; i <= 8; i++) {
      for (let j = 1; j <= 8; j++) {
        const squareColor = determineSquareColor(i, j);
        const square = new Square(i * 100, j * 100, squareColor);
        this.squares.push(square);
      }
    }
  }
  draw() {
    this.squares.forEach(el => {
      el.draw();
    });

    this.player.draw();
    this.finishTile.draw();
  }
}
