class Game {
  constructor() {
    this.currentLevel = 10
    this.squares = [];
    this.pieces = [];
    this.capturedPieces = []
    this.background = new Background('olivedrab');
    this.player;

    this.check = {
      checked: false,
      checkX: 200,
      checkY: 200
    }
  }

  setup() {
    this.background.setup();
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const newPiece = getMapPiece(this.currentLevel, i, j)
        if (newPiece) {
          if (newPiece.name === 'player') {
            this.player = newPiece
          } else {
            this.pieces.push(newPiece)
          }
        }
        const squareColor = determineSquareColor(i, j);
        const square = new Square(i * 100, j * 100, squareColor);
        this.squares.push(square);
      }
    }
    this.player.setup()
    this.pieces.forEach(el => el.setup())


  }
  draw() {
    this.squares.forEach(el => {
      el.draw();
    });
    this.pieces.forEach((p, i) => {
      p.draw()
      if (this.captureCheck(p, this.player) && p.name !== 'goal') {
        this.handleCapture(p, i)
      }
    })


    this.player.draw()

    if (this.check.checked) {
      textSize(32)
      fill('red')
      text('CHECK', this.check.checkX, this.check.checkY)
    }

  }

  handleCheckCollision(x, y) {
    this.player.knockBack()
    // score handle
    // shake player
    this.handleCheck(x, y)
  }
  handleCheck(x, y) {
    this.check.checked = true
    let helper = 150
    this.check.checkX = x
    this.check.checkY = y
    let checkInterval = setInterval(() => {
      this.check.checkY -= 0.15
      helper--
      if (helper < 0) {
        clearInterval(checkInterval)
        this.check.checked = false
      }
    }, 1);
  }

  handleNewLevel() {
    this.pieces = []
    this.squares = [];
    this.capturedPieces = []
    this.player = null
    this.currentLevel += 1
    this.setup()
  }

  captureCheck(piece, player) {
    if (player.isMoving) {
      return false
    }
    if (
      player.x + player.width <= piece.x ||
      piece.x + piece.width <= player.x
    ) {
      return false;
    }
    if (
      piece.y >= player.y + player.height ||
      player.y >= piece.y + piece.height
    ) {
      return false;
    }
    console.log(piece.height, player.height)
    return true;
  }
  handleCapture(p, index) {
    const pieceId = p.id
    if (this.capturedPieces.indexOf(pieceId) > -1) {
      return
    }
    this.capturedPieces.push(pieceId)
    //this.pieces.splice(index, 1);
    p.handleDead()
  }
}



function getMapPiece(level, x, y) {
  const determinePiece = maps[level][x][y]
  const yNotation = String.fromCharCode(65 + y)
  const xNotation = 8 - x
  const pieces = {
    G: new FinishTile((y * 100), (x * 100), `${yNotation}${xNotation}`),
    P: new Pawn((y * 100) + 25, (x * 100) + 25, `${yNotation}${xNotation}`),
    R: new Rook((y * 100) + 25, (x * 100) + 25, `${yNotation}${xNotation}`),
    B: new Bishop((y * 100) + 25, (x * 100) + 25, `${yNotation}${xNotation}`),
    S: new Player((y * 100) + 25, (x * 100) + 25, 'player')
  }
  return pieces[determinePiece]
}