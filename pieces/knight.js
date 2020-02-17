class Knight {
    constructor(x, y, id) {
        this.x = x
        this.y = y
        this.width = 50;
        this.height = 50;
        this.name = 'knight'
        this.id = id

        this.expanding = false
        this.dead = false // for when piece is flying off
    }

    setup() {
        this.knightImage = loadImage('assets//wn.png');
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

    draw() {
        if (this.expanding) {
            image(this.knightImage, this.x - 10, this.y - 10, this.width + 20, this.height + 20);
        } else {
            image(this.knightImage, this.x - 15, this.y - 15, this.width + 30, this.height + 30);
        }
    }

    collisionCheck(player) {
        if (this.dead) { return false }

        const down = this.checkCollidingKnight(player, 1, 'y', 'x')
        const up = this.checkCollidingKnight(player, -1, 'y', 'x')
        const left = this.checkCollidingKnight(player, -1, 'x', 'y')
        const right = this.checkCollidingKnight(player, 1, 'x', 'y')

        if (up || down || left || right) {
            return true
        }
        return false
    }

    checkCollidingKnight(player, dir, twoStep, oneStep) {

        if (player[twoStep] >= this[twoStep] + (200 * dir) && player[twoStep] <= this[twoStep] + (200 * dir) && this.dead === false) {
            if (player[oneStep] >= this[oneStep] + (100 * dir) && player[oneStep] <= this[oneStep] + (100 * dir)) {
                return true
            }
            if (player[oneStep] >= this[oneStep] - (100 * dir) && player[oneStep] <= this[oneStep] - (100 * dir)) {
                return true
            }
        }
        return false

    }
}





