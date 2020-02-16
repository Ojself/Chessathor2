class Menu {
    constructor() {
        this.highScore = null
        this.serversOnline = false
    }

    draw() {
        background('black')
        textAlign(CENTER)
        noStroke()
        this.drawTitle()
        this.drawStartGame()
        this.drawServerStatus()
        this.drawTutorial()
        this.checkMouseHover()

        if (!this.serversOnline && frameCount % 200 === 0) {
            wakeUpServer()
        }
        if (this.highScore) {
            this.drawHighScore()
        }
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
        if (this.serversOnline) {
            fill('white')
        } else {
            fill('grey')
        }
        text('START GAME', 500, 300)
    }


    drawServerStatus() {
        let dot = frameCount % 60 > 30 ? '.' : '..'
        fill('white')
        textSize(20)
        text('Servers status: ', 100, 250)

        textAlign(LEFT)
        fill('white')
        if (!this.serversOnline) {
            text(`waking up ${dot}`, 50, 280)
            fill('tomato')
            ellipse(185, 245, 20, 20)
        } else {
            text('Online!', 70, 280)
            fill('lime')
            ellipse(185, 245, 20, 20)
        }
        fill('white')
        textAlign(CENTER)
    }
    drawTutorial() {
        textSize(15)
        text('When in game:', 880, 240)
        textSize(25)
        text('Use arrow keys', 880, 280)
        text('to move!', 880, 310)
    }

    checkMouseHover() {
        if (!this.serversOnline) { return false }
        if (mouseX > 350 && mouseX < 660) {
            if (mouseY > 250 && mouseY < 320) {
                this.hoverStartGame()
                return true
            }
        }
    }
    hoverStartGame() {
        stroke(500);
        line(320, 230, 680, 230);
        line(680, 230, 680, 330);
        line(680, 330, 320, 330);
        line(320, 330, 320, 230);
        noStroke()
    }

    drawHighScore() {
        textSize(40)
        text('HIGHSCORE', 500, 400)

        if (this.highScore && this.highScore.cheaters.length) {
            //  console.log('cheaters')
        }
        if (this.highScore && this.highScore.realPlayers.length) {
            //   console.log('real')
            this.drawRealPlayers(this.highScore.realPlayers)
        }
    }
    drawRealPlayers(players) {
        textAlign(LEFT)
        fill('white')
        textSize(20)
        text('NAME', 100, 450)
        text('SCORE', 220, 450)
        text('TIME', 340, 450)
        text('MOVES', 440, 450)
        text('CAPTURES', 540, 450)
        text('DATE', 680, 450)
        players.forEach((p, i) => {
            textSize(15)
            // fade colors here
            let r = 200 - (i * 20)
            let g = 255 - (i * 25)
            let b = 210 - (i * 5)
            fill(r, g, b);
            textAlign(LEFT)
            text(i + 1, 70, 500 + (35 * i))
            text(p.name, 100, 500 + (35 * i))
            textAlign(CENTER)
            text(p.score, 250, 500 + (35 * i))
            text(p.timeUsed, 360, 500 + (35 * i))
            text(p.moves, 470, 500 + (35 * i))
            text(p.captures, 570, 500 + (35 * i))
            text(p.dateCompleted.slice(0, -5), 720, 500 + (35 * i))
        })
    }
}


