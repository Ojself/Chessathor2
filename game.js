// game.js
// (Assuming you import the maps and constants from your refactored maps file)
// import { maps, BOARD_SIZE, SQUARE_SIZE, PieceType } from './maps.js';

class Game {
  constructor() {
    this.currentLevel = 13;
    this.squares = [];
    this.pieces = [];
    this.capturedPieces = [];
    this.totalCapturedPieces = [];
    this.moveHistory = [];
    this.totalMoveHistory = [];
    this.background = new Background('black');
    this.player = null;
    this.playerName = '';
    this.checks = 0;
    this.totalChecks = 0;
    this.hud = new Hud();
    this.menu = new Menu();
    this.check = {
      checked: false,
      checkX: 200,
      checkY: 200,
    };
    this.gameOver = false;
    this.gameStarted = false;
    this.music = new sound('./utils/music2.mp3');
  }

  setup() {
    this.background.setup();
    // Clear arrays if resetting the level.
    this.squares = [];
    this.pieces = [];

    // Generate the 8x8 board for the current level.
    const board = maps[this.currentLevel].generate();

    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        const cellValue = board[i][j];
        // Create a piece based on the board value.
        const newPiece = getMapPiece(cellValue, i, j);
        if (newPiece) {
          if (newPiece.name === 'player') {
            this.player = newPiece;
          } else {
            this.pieces.push(newPiece);
          }
        }
        // Create a square at this grid location.
        const squareColorInfo = determineSquareColor(i, j, this.currentLevel);
        const square = new Square(
          i * SQUARE_SIZE,
          j * SQUARE_SIZE,
          squareColorInfo[0],
          squareColorInfo[1],
          squareColorInfo[2]
        );
        this.squares.push(square);
      }
    }
    if (this.player) {
      this.player.setup();
    }

    this.pieces.forEach((piece) => piece.setup());
  }

  draw() {
    if (!this.gameStarted) {
      this.menu.draw();
    } else {
      this.background.draw();
      this.hud.draw();
      this.squares.forEach((square) => {
        square.draw();
        // For certain levels, reset helper square colors if pieces were captured.
        if (
          [1, 8, 12, 16, 18].includes(this.currentLevel) &&
          this.capturedPieces.length
        ) {
          square.resetColor();
        }
      });
      this.pieces.forEach((piece) => {
        piece.draw();
        if (piece.collisionCheck(this.player)) {
          piece.tempExpandImage();
          this.handleCheckCollision(this.player.x, this.player.y);
        }
        if (this.captureCheck(piece, this.player) && piece.name !== 'goal') {
          this.handleCapture(piece);
        }
      });
      this.pieces.forEach((piece) => {});
      this.player.draw();

      if (this.check.checked) {
        textSize(32);
        fill('tomato');
        text('CHECK', this.check.checkX, this.check.checkY);
      }
    }
  }

  handleCheckCollision(x, y) {
    this.player.knockBack();
    this.hud.blinkCheck();
    this.handleCheck(x, y);
    aa.play('check'); // audio
    this.blinkTile(x, y);
  }

  handleCheck(x, y) {
    this.check.checked = true;
    let helper = 150;
    this.check.checkX = x;
    this.check.checkY = y;
    this.checks += 1;
    this.totalChecks += 1;
    let checkInterval = setInterval(() => {
      this.check.checkY -= 0.15;
      helper--;
      if (helper < 0) {
        clearInterval(checkInterval);
        this.check.checked = false;
      }
    }, 1);
  }

  handleNewLevel() {
    levelComplete({
      capturedPieces: this.capturedPieces.length,
      moveHistory: this.moveHistory,
      checks: this.checks,
      timer: this.hud.timer,
      playerName: this.playerName,
      currentLevel: this.currentLevel,
    });
    this.pieces = [];
    this.squares = [];
    this.capturedPieces = [];
    this.moveHistory = [];
    this.checks = 0;
    this.player = null;
    this.currentLevel += 1;
    this.hud.saveTime();
    this.hud.timer = 15;
    this.setup();
  }

  resetLevel() {
    this.pieces = [];
    this.squares = [];
    this.capturedPieces = [];
    this.moveHistory = [];
    this.checks = 0;
    this.player = null;
    this.hud.timer = 15;
    this.setup();
  }

  captureCheck(piece, player) {
    if (
      player.x + player.width <= piece.x ||
      piece.x + piece.width <= player.x
    ) {
      return false;
    }
    if (
      piece.y >= player.y + piece.height ||
      player.y >= piece.y + piece.height
    ) {
      return false;
    }
    if (player.isMoving) {
      return false;
    }
    return true;
  }

  handleCapture(piece) {
    const pieceId = piece.id;
    if (this.capturedPieces.indexOf(pieceId) > -1) {
      return;
    }
    aa.play('capture');
    this.capturedPieces.push(pieceId);
    this.totalCapturedPieces.push(pieceId);
    piece.handleDead();
    this.hud.blinkCapture();
  }

  blinkTile(x, y) {
    const trueX = x - 25;
    const trueY = y - 25;
    const checkSquare = this.squares.find(
      (s) => s.x === trueX && s.y === trueY
    );
    if (!checkSquare) {
      console.log('yikes');
      this.resetLevel(); // fail-safe
    }
    checkSquare.blinkSquare();
  }

  stopGame() {
    this.gameOver = true;
    this.player.isMoving = true;
    this.music.stop();
    // noLoop();
  }
}

// -----------------------------------------------------------------
// Modified getMapPiece to work with the new board format.
//
// Here, the function accepts the piece identifier (from the board)
// and uses the grid coordinates (i, j) to compute pixel positions and chess notation.
function getMapPiece(pieceIdentifier, i, j) {
  // Return nothing for an empty cell.
  if (pieceIdentifier === ' ') return null;

  const yNotation = String.fromCharCode(65 + j);
  const xNotation = 8 - i;
  const posX = j * SQUARE_SIZE; // x position based on column
  const posY = i * SQUARE_SIZE; // y position based on row
  const offset = 25; // offset to center the piece within the square

  const pieces = {
    G: new FinishTile(posX, posY, `${yNotation}${xNotation}`),
    P: new Pawn(posX + offset, posY + offset, `${yNotation}${xNotation}`),
    R: new Rook(posX + offset, posY + offset, `${yNotation}${xNotation}`),
    B: new Bishop(posX + offset, posY + offset, `${yNotation}${xNotation}`),
    N: new Knight(posX + offset, posY + offset, `${yNotation}${xNotation}`),
    S: new Spikes(posX + offset, posY + offset, `${yNotation}${xNotation}`),
    Q: new Queen(posX + offset, posY + offset, `${yNotation}${xNotation}`),
    A: new Player(posX + offset, posY + offset, 'player'),
  };

  return pieces[pieceIdentifier];
}

// -----------------------------------------------------------------
// The determineSquareColor, sound, and helperLevelShowGuardedTile functions remain unchanged.

function determineSquareColor(row, col, level) {
  let color;
  let shade;
  let helperTile = false;

  if ((row % 2 === 0 && col % 2 === 0) || (row % 2 === 1 && col % 2 === 1)) {
    let r = Math.random() * 4 + 245;
    let g = Math.random() * 4 + 245;
    let b = Math.random() * 4 + 220;
    shade = 'light';
    if (helperLevelShowGuardedTile(row, col, level)) {
      r = 222;
      g = 134;
      b = 85;
      helperTile = true;
    }
    color = [r, g, b];
  } else {
    let r = Math.random() * 4 + 222;
    let g = Math.random() * 4 + 184;
    let b = Math.random() * 4 + 135;
    shade = 'dark';
    if (helperLevelShowGuardedTile(row, col, level)) {
      r = 222;
      g = 134;
      b = 85;
      helperTile = true;
    }
    color = [r, g, b];
  }
  return [color, shade, helperTile];
}

/* https://www.w3schools.com/graphics/game_sound.asp */
function sound(src) {
  this.sound = document.createElement('audio');
  this.sound.src = src;
  this.sound.setAttribute('preload', 'auto');
  this.sound.setAttribute('controls', 'none');
  this.sound.style.display = 'none';
  document.body.appendChild(this.sound);

  this.play = function () {
    this.sound.play();
  };

  this.stop = function () {
    this.sound.pause();
  };
}

function helperLevelShowGuardedTile(row, col, level) {
  const showHelperLevels = {
    1: { 2: [3], 4: [3] },
    8: { 1: [3], 2: [3], 3: [1, 2, 4, 5], 4: [3], 5: [3], 6: [3] },
    12: { 0: [7], 1: [6], 2: [1, 5], 3: [2, 4], 5: [2, 4], 6: [1], 7: [0] },
    16: { 2: [2, 4], 3: [1, 5], 5: [1, 5], 6: [2, 4] },
    18: { 4: [3] },
  };

  if (showHelperLevels[level] && showHelperLevels[level][row]) {
    return showHelperLevels[level][row].includes(col);
  }
  return false;
}
