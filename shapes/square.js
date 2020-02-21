class Square {
  constructor(x, y, color, shade, helperSquare) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.color = color;

    this.lightGuardedColor = [245, 245, 220]
    this.darkGuardedColor = [222, 184, 135]
    this.helperGuardedColor = [222, 134, 85]
    this.shade = shade
    this.iAmLightSquared = shade === 'light'
    this.guardedTile = false

    this.helperSquare = helperSquare
  }
  draw() {

    if (this.guardedTile) {
      if (this.helperSquare) {
        fill(this.helperGuardedColor)
      } else if (this.iAmLightSquared) {
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

  resetColor() {
    this.color = this.iAmLightSquared ? [245, 245, 220] : [222, 184, 135]
  }

  blinkSquare() {
    this.guardedTile = true
    this.changeRedColor()
    setTimeout(() => {
      this.guardedTile = false
    }, 500);
  }

  // makes tile red for a brief time and fades back to normal
  changeRedColor() {
    if (this.helperSquare) {
      let g = 134
      let b = 85
      const helperInterval = setInterval(() => {
        g += 0.5
        b += 0.5
        this.helperGuardedColor = [222, g, b]
        if (g >= 189) {
          clearInterval(helperInterval)
          this.helperGuardedColor = [222, 134, 85]
        }
      }, 1);
    } else if (this.iAmLightSquared) {
      let g = 195
      let b = 170
      const lightInterval = setInterval(() => {
        g += 0.5
        b += 0.5
        this.lightGuardedColor = [245, g, b]
        if (g >= 245) {
          clearInterval(lightInterval)
          this.lightGuardedColor = [245, 245, 220]
        }
      }, 1);
    } else {
      let g = 134
      let b = 85
      const darkInterval = setInterval(() => {
        g += 0.5
        b += 0.5
        this.darkGuardedColor = [222, g, b]
        if (g >= 196) {
          clearInterval(darkInterval)
          this.darkGuardedColor = [222, 184, 135]
        }
      }, 1);
    }
  }
}

