class Bishop {
    constructor(x, y, id) {
        this.x = x
        this.y = y
        this.width = 50;
        this.height = 50;
        this.name = 'bishop'
        this.id = id // chess notation eg. E4

        this.expanding = false
        this.dead = false
    }

    setup() {
        this.bishopImg = loadImage('../pics/wb.png');
    }

    draw() {
        if (this.expanding) {
            image(this.bishopImg, this.x - 10, this.y - 10, this.width + 20, this.height + 20);
        } else {
            image(this.bishopImg, this.x, this.y, this.width, this.height);
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

    collisionCheck(player) {
        const downRight = checkCollidingDiagonal(player, this.x, this.y, 1, 1, this.id)
        const upRight = checkCollidingDiagonal(player, this.x, this.y, 1, -1, this.id)

        const downLeft = checkCollidingDiagonal(player, this.x, this.y, -1, 1, this.id)
        const upLeft = checkCollidingDiagonal(player, this.x, this.y, -1, -1, this.id)
        if (downRight || upRight || downLeft || upLeft) {
            return true
        }
        return false
    }
}


function checkCollidingDiagonal(player, x, y, dirX, dirY, id) {

    for (let i = 0; i < 8 && checkCollidingWithBishop(x, y, i, dirX, dirY, id); i++) {

        const helperX = (100 * dirX) + x + i * 100 * dirX
        const helperY = (100 * dirY) + y + i * 100 * dirY

        if (player.x + player.width > helperX && player.x - player.width < helperX) {
            if (player.y + player.width > helperY && player.y - player.height < helperY) {
                return true
            }
        }
    }
}

function checkCollidingWithBishop(x, y, i, dirX, dirY, id) {
    const helperX = x + ((i * 100) * dirX)
    const helperY = y + ((i * 100) * dirY)

    const gamePieces = game.pieces.filter(p => p.id !== id)
    if (gamePieces.find(p => p.x === helperX && p.y === helperY)) { return false }
    return true
}

