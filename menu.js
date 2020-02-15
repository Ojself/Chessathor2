class Menu {
    constructor() {
        this.highScore = new HighScore()
        this.serversOnline = false

    }

    draw() {
        background('black')
        textAlign(CENTER)
        this.drawTitle()
        this.drawStartGame()
        this.drawHighScore()
        this.drawServerStatus()

        // if mouse hover
    }
    drawTitle() {
        textSize(50)
        fill('white')
        text('CHESSATHOR', 460, 100)
        fill('tomato')
        text('2.0', 690, 100)
    }
    drawStartGame() {
        textSize(50)
        fill('white')
        text('START GAME', 500, 300)
    }
    drawHighScore() {
        textSize(50)
        fill('white')
        text('HIGHSCORE', 500, 400)
    }

    drawServerStatus() {
        let dot = frameCount % 60 > 30 ? '.' : '..'

        textSize(20)
        text('Servers status: ', 100, 250)

        textAlign(LEFT)
        fill('white')
        if (!this.serversOnline) {
            text(`waking up ${dot}`, 50, 280)
            fill('tomato')
            ellipse(185, 245, 20, 20)
        } else {
            text('Online! ', 50, 280)
            fill('lime')
            ellipse(185, 245, 20, 20)
            fill('white')
        }

        textAlign(CENTER)




    }

}
