class Menu {
  constructor() {
    this.highScore = null;
    this.flags = [];
  }

  preloadImages() {
    if (this.highScore) {
      this.highScore.forEach((p, i) => {
        this.flags[i] = loadImage(`assets/flags/${p.countryFlag.slice(-10)}`);
      });
    }
  }
  draw() {
    background('black');
    textAlign(CENTER);
    noStroke();
    this.drawTitle();
    this.drawStartGame();
    this.drawServerStatus();
    this.isMenuHovering();

    if (this.highScore) {
      this.drawHighScore();
    }
  }
  drawTitle() {
    textSize(50);
    fill('white');
    text('CHESSATHOR', 460, 100);
    fill('tomato');
    text('2.0', 690, 100);
  }
  drawStartGame() {
    if (game.serverOnline) {
      fill('white');
      textSize(10);
      text('click to', 500, 250);
      textSize(map(sin(frameCount * 0.01), -10, 1, 100, 50));
    } else {
      fill('grey');
      textSize(50);
    }

    text('START GAME', 500, 300);
  }

  drawServerStatus() {
    const dot = frameCount % 60 > 30 ? '.' : '..';
    fill('white');
    textSize(20);
    text('Server status: ', 100, 250);

    textAlign(LEFT);
    fill('white');
    if (!game.serverOnline) {
      text(`waking up ${dot}`, 50, 280);
      fill('tomato');
      ellipse(185, 245, 20, 20);
    } else {
      text('Online!', 70, 280);
      fill('lime');
      ellipse(185, 245, 20, 20);
    }
    fill('white');
    textAlign(CENTER);
  }

  isMenuHovering() {
    if (!game.serverOnline) {
      return false;
    }
    if (mouseX > 350 && mouseX < 660 && mouseY > 250 && mouseY < 320) {
      this.drawStartGameBorder();
      return true;
    }
  }
  drawStartGameBorder() {
    stroke(500);
    line(310, 230, 690, 230);
    line(690, 230, 690, 330);
    line(690, 330, 310, 330);
    line(310, 330, 310, 230);
    noStroke();
  }

  drawHighScore() {
    textSize(40);
    text('HIGHSCORE', 500, 400);
    if (this.highScore) {
      this.drawRealPlayers(this.highScore);
    }
  }
  drawRealPlayers(players) {
    const tableHeaderY = 450;
    textAlign(LEFT);
    fill('white');
    textSize(20);
    text('NAME', 100, tableHeaderY);
    text('SCORE', 220, tableHeaderY);
    text('TIME', 340, tableHeaderY);
    text('MOVES', 440, tableHeaderY);
    text('CAPTURES', 540, tableHeaderY);
    text('DATE', 680, tableHeaderY);
    players.forEach((p, i) => {
      textSize(15);
      // fade colors here
      let r = 200 - i * 19;
      let g = 255 - i * 24;
      let b = 210 - i * 4;
      fill(r, g, b);
      textAlign(LEFT);
      const y = 485 + 35 * i;
      image(this.flags[i], 20, y - 12, 30, 15);
      text(i + 1, 70, y);
      text(p.name, 100, y);
      textAlign(CENTER);
      text(p.score, 250, y);
      text(p.timeUsed, 360, y);
      text(p.moves, 470, y);
      text(p.captures, 570, y);
      text(p.dateCompleted.slice(0, -5).replace('T', ' - '), 720, y);
    });
  }
}
