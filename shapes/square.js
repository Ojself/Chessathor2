const GUARDED_COLOR = [222, 134, 85];
class Square {
  constructor(x, y, options) {
    this.x = x;
    this.y = y;
    this.width = SQUARE_SIZE;
    this.height = SQUARE_SIZE;
    this.color = options.color;

    this.lightGuardedColor = [245, 245, 220];
    this.darkGuardedColor = [222, 184, 135];
    this.helperGuardedColor = [222, 134, 85];

    this.guardedSquare = false;
    this.helperSquare = options.helperSquare;

    this.isLight = options.isLight;
  }
  draw() {
    if (this.guardedSquare) {
      if (this.helperSquare) {
        fill(this.helperGuardedColor);
      } else if (this.isLight) {
        fill(this.lightGuardedColor);
      } else {
        fill(this.darkGuardedColor);
      }
    } else {
      fill(this.color);
    }
    rect(this.x, this.y, this.width, this.height);

    /* debug */
    /* textSize(10);
    fill('red');
    text(`x:${this.x / 100} y:${this.y / 100}`, this.x, this.y + 75); */
  }

  resetColor() {
    this.color = this.isLight
      ? [
          Math.random() * 4 + 245,
          Math.random() * 4 + 245,
          Math.random() * 4 + 220,
        ]
      : [
          Math.random() * 4 + 222,
          Math.random() * 4 + 184,
          Math.random() * 4 + 135,
        ];
  }

  blinkSquare() {
    this.guardedSquare = true;
    this.changeRedColor();
    setTimeout(() => {
      this.guardedSquare = false;
    }, 500);
  }

  // makes square red for a brief time and fades back to normal
  changeRedColor() {
    let ticker = 0;
    let r = 222;
    let g = 134;
    let b = 85;

    const helperInterval = setInterval(() => {
      ticker++;
      if (this.helperSquare) {
        if (this.isLight) {
          this.helperGuardedColor = [r, g, b];
        }
        if (!this.isLight) {
          this.helperGuardedColor = [r, g, b];
        }
      } else {
        if (this.isLight) {
          this.lightGuardedColor = [245, g + 60, b + 75];
        }
        if (!this.isLight) {
          this.darkGuardedColor = [222, g, b];
        }
      }
      if (ticker >= 110) {
        clearInterval(helperInterval);
        this.helperGuardedColor = GUARDED_COLOR;
        this.lightGuardedColor = [245, 245, 220];
        this.darkGuardedColor = [222, 184, 135];
      }
    }, 1);
  }
}
