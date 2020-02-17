class Pawn {
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;

        this.name = 'pawn'
        this.id = id // chess notation eg. E4

        this.expanding = false
        this.dead = false // for when piece is flying off
    }

    setup() {
        this.pawnImg = loadImage('./../pics/wp.png');
    }

    draw() {
        // debug helper
        /* fill('red')
        textSize(10)
        text(`x:${this.x} y:${this.y}`, this.x, this.y)
        text(this.id, this.x, this.y + 20) */

        if (this.expanding) {
            image(this.pawnImg, this.x - 10, this.y - 10, this.width + 20, this.height + 20);
        } else {
            image(this.pawnImg, this.x - 15, this.y - 15, this.width + 30, this.height + 30);
        }

    }

    collisionCheck(player) {

        // y axis
        if (player.y >= this.y + 100 && player.y <= this.y + 100 && this.dead === false) {

            // right square
            if (player.x >= this.x + 100 && player.x <= this.x + 100) {
                return true
            }
            // left square
            if (player.x >= this.x - 100 && player.x <= this.x - 100) {
                return true
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
        let deadHelper = 1000
        const xRandom = Math.random() > 0.5 ? -1 : 1
        const yRandom = Math.random() > 0.5 ? -1 : 1
        let flyInterval = setInterval(() => {
            this.x -= 5 * xRandom
            this.y -= 5 * yRandom
            this.width -= 0.2
            this.height -= 0.2
            deadHelper -= 1
            if (deadHelper < 0) {
                clearInterval(flyInterval)
            }
        }, 5);
    }
}
