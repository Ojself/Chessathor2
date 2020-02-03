class Rook {
    constructor(x, y, id) {
        this.x = x
        this.y = y
        this.width = 50;
        this.height = 50;
        this.name = 'rook'
        this.id = id
    }

    setup() {
        this.rookImg = loadImage('../pics/br.png');
    }

    draw() {
        image(this.rookImg, this.x, this.y, this.width, this.height);
        if (this.collisionCheck(game.player)) {
            game.handleCollision()
        }
    }


    collisionCheck(player) {
        const up = checkCollidingStraight(player, this.x, this.y, 1, true)
        const down = checkCollidingStraight(player, this.x, this.y, -1, true)
        const left = checkCollidingStraight(player, this.x, this.y, 1, false)
        const right = checkCollidingStraight(player, this.x, this.y, -1, false)
        if (up || down || left || right) {
            return true
        }
        return false
    }
}


function checkCollidingStraight(player, x, y, dir, vertical) {
    for (let i = 0; i < 8 && checkCollidingWithRook(x, y, i, dir, vertical); i++) {
        const verticalValues = [x, y + (100 * dir) + (i * 100 * dir), 50, 50]
        const horizontalValues = [x + (100 * dir) + (i * 100 * dir), y, 50, 50]

        const valueHelper = vertical ? [verticalValues[0], verticalValues[1]] : [horizontalValues[0], horizontalValues[1]]


        if (player.x + player.width > valueHelper[0] && player.x - player.width < valueHelper[0]) {
            if (player.y + player.height > valueHelper[1] && player.y - player.height < valueHelper[1])
                return true
        }
    }
    return false
}

function checkCollidingWithRook(x, y, i, dir, vertical) {
    let gamePieces;
    if (vertical) {

        gamePieces = game.pieces
            .filter(p => p.x === x)
            .filter(p => p.name !== "rook") // change to this.id

        if (gamePieces.find(p => p.y === y + ((i * 100) * dir))) { return false }
    } else {
        gamePieces = game.pieces
            .filter(p => p.y === y)
            .filter(p => p.name !== "rook")

        if (gamePieces.find(p => p.x === x + ((i * 100) * dir))) { return false }
    }

    return true
}

