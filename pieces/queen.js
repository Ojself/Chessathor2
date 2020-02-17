class Queen {
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;

        this.name = 'queen'
        this.id = id // chess notation eg. E4

        this.expanding = false
        this.dead = false

        this.s = 100
    }

    setup() {
        this.queenImg = loadImage('assets/bq.png');
    }

    draw() {
        if (this.dead) { // drawns ending hearts
            for (let x = 0; x < width - 200; x += this.s) {
                for (let y = 0; y < height; y += this.s) {
                    fill(800 * x / width, 127, 255);
                    heart(x + this.s / 2, (y + this.s / 2) - 25, this.s / 2);
                }
            }
        }
        image(this.queenImg, this.x - 15, this.y - 15, this.width + 30, this.height + 30);

    }

    collisionCheck(player) {
        if (this.dead === true) { return false }

        if (player.y >= this.y && player.y <= this.y) {

            if (player.x >= this.x && player.x <= this.x) {



            }
            if (player.x >= this.x && player.x <= this.x) {


            }
        }

        return false
    }
    tempExpandImage() {
        this.expanding = true
        setTimeout(() => {
            this.expanding = false
        }, 200);
    }

    handleDead() {
        this.dead = true
    }

    heart() {
        const s = 200;
        for (x = 0; x < width; x += s) {
            for (y = 0; y < height; y += s) {
                fill(310 * x / width, 127, 255);
                heart(x + s / 2, y + s / 2, s / 2);

            }
        }
    }
}
function heart(x, y, size) {
    beginShape();
    vertex(x, y);
    bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
    bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
    endShape(CLOSE);

    game.stopGame()
}
