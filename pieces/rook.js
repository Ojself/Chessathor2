class Rook {
    constructor(x, y, id) {
        this.x = x
        this.y = y
        this.width = 50;
        this.height = 50;
        this.name = 'rook'
        this.id = id // chess notation eg. E4

        this.expanding = false
        this.dead = false
    }

    setup() {
        this.rookImg = loadImage('./pics/wr.png');
    }

    draw() {

        if (this.expanding) {
            image(this.rookImg, this.x - 10, this.y - 10, this.width + 20, this.height + 20);
        } else {
            image(this.rookImg, this.x - 15, this.y - 15, this.width + 30, this.height + 30);
        }

    }

    tempExpandImage() {
        this.expanding = true
        setTimeout(() => {
            this.expanding = false
        }, 200);
    }

    handleDead() {
        this.dead = true
        let deadIntervalHelper = 1000
        const xRandom = Math.random() >= 0.5 ? -1 : 1
        const yRandom = Math.random() >= 0.5 ? -1 : 1
        const xTilt = Math.random() * 3 + 2
        const yTilt = Math.random() * 3 + 2
        let flyInterval = setInterval(() => {
            this.x -= xTilt * xRandom
            this.y -= yTilt * yRandom
            this.width -= 0.1
            this.height -= 0.1
            deadIntervalHelper -= 1
            if (deadIntervalHelper < 0) {
                clearInterval(flyInterval)
            }
        }, 5);
    }

    collisionCheck(player) {
        if (this.dead === true) { return false }
        const down = checkCollidingStraight(player, this.x, this.y, -1, true, this.id)
        const up = checkCollidingStraight(player, this.x, this.y, 1, true, this.id)
        const left = checkCollidingStraight(player, this.x, this.y, 1, false, this.id)
        const right = checkCollidingStraight(player, this.x, this.y, -1, false, this.id)
        if (up || down || left || right) {
            return true
        }
        return false
    }
}

function checkCollidingStraight(player, x, y, dir, vertical, id) {
    for (let i = 0; i < 8 && checkCollidingWithRook(x, y, i, dir, vertical, id); i++) {
        const verticalValues = [x, y + (100 * dir) + (i * 100 * dir), 50, 50]
        const horizontalValues = [x + (100 * dir) + (i * 100 * dir), y, 50, 50]

        const valueHelper = vertical ? [verticalValues[0], verticalValues[1]] : [horizontalValues[0], horizontalValues[1]]

        if (player.x + player.width > valueHelper[0] && player.x - player.width < valueHelper[0] && player.isMoving === false) {
            if (player.y + player.height >= valueHelper[1] && player.y - player.height <= valueHelper[1]) {
                return true
            }
        }
    }
    return false
}

function checkCollidingWithRook(x, y, i, dir, vertical, id) {
    let gamePieces;
    if (vertical) {
        gamePieces = game.pieces
            .filter(p => p.x === x)
            .filter(p => p.id !== id)
        if (gamePieces.find(p => p.y === y + ((i * 100) * dir))) { return false }
    } else {
        gamePieces = game.pieces
            .filter(p => p.y === y)
            .filter(p => p.id !== id)
        if (gamePieces.find(p => p.x === x + ((i * 100) * dir))) { return false }
    }
    return true
}

