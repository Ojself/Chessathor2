class Game {
  constructor() {
    this.squares = [];
    this.pieces = [new Rook(225, 425, 'rook'), new Bishop(425, 425, 'bishop'), new Pawn(125, 725, 'Pawn'), new Pawn(725, 125, 'Pawn'), new Pawn(225, 325, 'Pawn'), new Pawn(725, 625, 'Pawn')];
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
    this.pieces.forEach(el => el.setup())


  }
  draw() {

    this.squares.forEach(el => {
      el.draw();
    });
    this.pieces.forEach(el => el.draw())


    this.player.draw();
    this.finishTile.draw();
  }

  handleCollision() {
    // knockback
    // score handle
    this.drawCheck()
  }
  drawCheck() {

    fill('red')
    textSize(40);

    text('CHECK!', game.player.x, game.player.y);
  }
}

