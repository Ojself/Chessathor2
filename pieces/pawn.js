class Pawn {
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;

        this.name = 'pawn'
        this.id = id
        this.expanding = false
    }

    setup() {
        this.pawnImg = loadImage('../pics/bp.png');
    }

    draw() {
        fill('red')
        textSize(10)
        text(`x:${this.x} y:${this.y}`, this.x, this.y)
        text(this.id, this.x, this.y + 20)

        if (this.expanding) {
            image(this.pawnImg, this.x - 10, this.y - 10, this.width + 20, this.height + 20);
        }
        image(this.pawnImg, this.x, this.y, this.width, this.height);

        if (this.collisionCheck(game.player)) {
            this.tempExpandImage()
            game.handleCollision(game.player.x, game.player.y)
        }
    }

    collisionCheck(player) {
        // y axis
        if (player.y >= this.y + 100 && player.y <= this.y + 100) {
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
}
