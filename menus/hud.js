class Hud {
  constructor() {
    this.timer = 15;
    this.blinkCheckText = false;
    this.blinkCaptureText = false;

    this.timeHistory = [];
    this.inputField = '';

    this.submitted = false;
    this.finalScore = '';
  }

  draw() {
    this.drawTotalChecks();
    this.drawTotalMoves();
    this.drawTotalCaptures();
    this.drawCurrentLevelAndCountDown();
    this.drawOldTimes();
    if (game.gameOver) {
      this.drawInputField();
    }
    if (this.submitted) {
      this.drawFinalScore();
    }
    if ([0, 4, 5].includes(game.currentLevel)) {
      this.drawHotTips(game.currentLevel);
    }
  }
  blinkCheck() {
    this.blinkCheckText = true;
    setTimeout(() => {
      this.blinkCheckText = false;
    }, 200);
  }
  blinkCapture() {
    this.blinkCaptureText = true;
    setTimeout(() => {
      this.blinkCaptureText = false;
    }, 200);
  }
  drawTotalChecks() {
    if (this.blinkCheckText) {
      textSize(18);
      fill('tomato');
    } else {
      textSize(15);
      fill('white');
    }
    text(`Checks ${game.totalChecks}`, 832, 20);
    fill('white');
  }

  drawTotalMoves() {
    textSize(15);
    fill('white');
    text(`Moves ${game.totalMoveHistory.length}`, 875, 40);
    fill('white');
  }

  drawTotalCaptures() {
    if (this.blinkCaptureText) {
      fill('lime');
    } else {
      fill('white');
    }
    textSize(15);
    text(`Captures ${game.totalCapturedPieces.length}`, 918, 20);
    fill('white');
  }

  drawCurrentLevelAndCountDown() {
    if (game.gameOver) {
      return;
    }
    //textSize(30);
    //text(`Level ${game.currentLevel}`, 848, 115);

    textSize(10);
    text(`Time bonus`, 875, 75);

    textSize(50);
    text(`${this.timer}`, 875, 115);

    if (frameCount % 60 == 0 && this.timer > 0) {
      this.timer -= 1;
    }
  }
  saveTime() {
    const timeFloats = frameCount.toString();
    const twoLastDigits = timeFloats.substr(timeFloats.length - 2);
    this.timeHistory.push(`${this.timer}:${twoLastDigits}`);
  }
  drawOldTimes() {
    this.timeHistory.forEach((t, i) => {
      textAlign(LEFT);
      textSize(15);
      text(`Level ${i}: ${t}`, 820, 210 + i * 25);
    });
  }

  drawInputField() {
    textAlign(LEFT);
    fill('white');
    textSize(20);
    text('Enter name', 862, 80);

    rect(830, 100, 180, 50);

    fill('black');
    textSize(25);
    text(this.inputField, 840, 125); // max 9

    if (frameCount % 60 < 30 && this.inputField.length < 1) {
      rect(835, 105, 5, 40);
    }

    if (!this.submitted) {
      fill('grey');
      rect(863, 158, 104, 34);

      fill('tomato');
      rect(865, 160, 100, 30);

      textSize(20);
      fill('white');
      text('SUBMIT!', 872, 185);
    }
  }
  enterName(key, keyCode) {
    if (keyCode === 8) {
      // backspace
      this.inputField = this.inputField.slice(0, -1);
    }
    if (keyCode > 90 || keyCode < 47) {
      return false;
    }
    if (this.inputField.length > 9) {
      return false;
    }

    this.inputField += key;
  }
  submitHover() {
    // this is only triggered by mouseClick
    if (mouseX > 870 && mouseX < 970) {
      if (mouseY > 160 && mouseY < 190) {
        this.submitted = true;
        return this.inputField;
      }
    }
    return false;
  }
  drawFinalScore() {
    textAlign(LEFT);
    textSize(30 - this.finalScore.toString().length);
    fill('white');
    text(`Score: ${this.finalScore}`, 810, 180);
  }
  drawHotTips(level) {
    textAlign(CENTER);

    fill('white');
    if (level === 0) {
      fill('white');
      textSize(10);
      text('Use ', 925, 475);
      fill('tomato');
      textSize(map(sin(frameCount * 0.1), -5, 1, 10, 20));
      text('W - A - S - D', 925, 500);
      fill('white');
      textSize(15);
      text('or', 925, 525);
      fill('tomato');
      textSize(map(sin(frameCount * 0.1), -5, 1, 10, 20));
      text('ARROW KEYS', 925, 550);

      fill('white');
      textSize(15);
      text('to move', 925, 575);
    }
    if (level === 4 && game.capturedPieces.length < 3) {
      fill('tomato');
      textSize(map(sin(frameCount * 0.1), -5, 1, 10, 20));
      text('TRY CAPTURING', 920, 550);
      text('SOME PIECES', 920, 575);
    }
    if (level === 5 && game.player.y > 325) {
      fill('tomato');
      textSize(map(sin(frameCount * 0.1), -5, 1, 10, 20));
      text('TRY MOVING', 920, 550);
      text('DIAGONALLY', 920, 575);
      textSize(15);
      fill('white');
      text(`Hint: 'q' or 'e'`, 920, 625);
      text(`or arrow keys`, 920, 640);
    }
  }
}

const pulseMyText = (textSize = 9, frameCount) => {
  return (frameCount % textSize) + textSize / 2;
};
