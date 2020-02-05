class Knight {
    constructor(x, y, id) {
        this.x = x
        this.y = y
        this.width = 50;
        this.height = 50;
        this.name = 'knight'
        this.id = id
    }

    setup() {
        this.knightImage = loadImage('../pics/bn.png');
    }

    draw() {

        image(this.knightImage, this.x, this.y, this.width, this.height);
        if (this.collisionCheck(game.player)) {
            game.handleCheckCollision()
        }
    }

    collisionCheck(player) {
        const downRight = checkCollidingDiagonal(player, this.x, this.y, 1, 1)
        const upRight = checkCollidingDiagonal(player, this.x, this.y, 1, -1)
        const downLeft = checkCollidingDiagonal(player, this.x, this.y, -1, 1)
        const upLeft = checkCollidingDiagonal(player, this.x, this.y, -1, -1)
        if (downRight || upRight || downLeft || upLeft) {
            return true
        }
        return false
    }
}


function checkCollidingDiagonal(player, x, y, dirX, dirY) {

    for (let i = 0; i < 8 && checkCollidingWithBishop(x, y, i, dirX, dirY); i++) {

        const helperX = (100 * dirX) + x + i * 100 * dirX
        const helperY = (100 * dirY) + y + i * 100 * dirY

        if (player.x + player.width > helperX && player.x - player.width < helperX) {
            if (player.y + player.width > helperY && player.y - player.height < helperY) {
                return true
            }
        }
    }
}

function checkCollidingWithBishop(x, y, i, dirX, dirY) {
    const helperX = x + ((i * 100) * dirX)
    const helperY = y + ((i * 100) * dirY)

    const gamePieces = game.pieces.filter(p => p.id !== this.id)
    if (gamePieces.find(p => p.x === helperX && p.y === helperY)) { return false }
    return true
}

