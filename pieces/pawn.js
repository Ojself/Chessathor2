class Pawn {
    constructor(x, y, name, id) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;

        this.name = id
        this.id = id
    }

    setup() {
        this.pawnImg = loadImage('../pics/bp.png');
    }

    draw() {
        textSize(10)
        text(`x:${this.x} y:${this.y}`, this.x, this.y)
        image(this.pawnImg, this.x, this.y, this.width, this.height);
        if (this.collisionCheck(game.player)) {
            console.log('pawn')
        }
    }

    collisionCheck(player) {



        // y axis
        if (player.y >= this.y + 100 && player.y <= this.y + 100) {

            // right square
            if (player.x >= this.x + 100 && player.x <= this.x + 100) {

            }
            // left square
            if (player.x >= this.x - 100 && player.x <= this.x - 100) {

            }
        }







        return false
    }
}
