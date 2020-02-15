class Square {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.color = color;

    this.lightGuardedColor = [245, 245, 220] // [245, 245, 220]
    this.darkGuardedColor = [222, 184, 135] // [222, 184, 135]

    this.iAmLightSquared = JSON.stringify(this.color) === JSON.stringify(this.lightGuardedColor)

    this.guardedTile = false


  }
  draw() {
    if (this.guardedTile) {
      if (this.iAmLightSquared) {
        fill(this.lightGuardedColor)
      } else {
        fill(this.darkGuardedColor)
      }
    }
    else {
      fill(this.color);
    }
    rect(this.x, this.y, this.width, this.height);

    /* debug */
    /* textSize(10);
    fill('red');
    text(`x:${this.x / 100} y:${this.y / 100}`, this.x, this.y + 75); */
  }

  blinkSquare() {
    this.guardedTile = true
    this.changeRedColor()
    setTimeout(() => {
      this.guardedTile = false
    }, 500);
  }
  changeRedColor() {
    if (this.iAmLightSquared) {
      let g = 195
      let b = 170
      const lightInterval = setInterval(() => {
        g += 1
        b += 1
        this.lightGuardedColor = [245, g, b]
        if (g >= 220) {
          clearInterval(lightInterval)
          this.lightGuardedColor = [245, 245, 220]
        }
      }, 1);
    } else {
      let g = 134
      let b = 85

      const darkInterval = setInterval(() => {
        g += 1
        b += 1
        this.darkGuardedColor = [222, g, b]
        if (g >= 165) {
          clearInterval(darkInterval)
          this.darkGuardedColor = [222, 184, 135]
        }
      }, 1);
    }
  }
}

