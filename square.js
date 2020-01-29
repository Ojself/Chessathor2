class Square {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.color = color;
  }
  draw() {
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);

    /* debug */
    /* textSize(32);
    fill('red');
    text(`x:${this.x / 100} y:${this.y / 100}`, this.x, this.y + 75); */
  }
}
