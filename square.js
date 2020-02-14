class Square {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.color = color;

    this.heartActivated = false
  }
  draw() {
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
    if (this.heartActivated) {
      this.heart()
    }
    /* debug */
    /* textSize(10);
    fill('red');
    text(`x:${this.x / 100} y:${this.y / 100}`, this.x, this.y + 75); */
  }
  heart() {
    const s = 40;
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        fill(2 * x, 127, 0);
        drawHeart(this.x + 50, this.y + 30, s);
      }
    }
  }
}

function drawHeart(x, y, size) {
  beginShape();
  vertex(x, y);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);
}