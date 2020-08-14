class Menu {
    constructor() {
        this.highScore = null
        this.serversOnline = false
        this.flags = []
    }

    preloadImages() {
        if (this.highScore) {
            this.highScore.forEach((p, i) => {
                this.flags[i] = loadImage(`assets/flags/${p.countryFlag.slice(- 9)}`)
            })
        }
    }
    draw() {
        background('black')
        textAlign(CENTER)
        noStroke()
        this.drawTitle()
        this.drawStartGame()
        this.drawServerStatus()
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
        if (this.serversOnline) {
            fill('white')
            textSize(10)
            text('click to', 500, 250)
            textSize(map(sin(frameCount * 0.01), -10, 1, 100, 50));
        } else {
            fill('grey')
            textSize(50)
        }


        text('START GAME', 500, 300)
    }


    drawServerStatus() {
        let dot = frameCount % 60 > 30 ? '.' : '..'
        fill('white')
        textSize(20)
        text('Server status: ', 100, 250)

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
        line(310, 230, 690, 230);
        line(690, 230, 690, 330);
        line(690, 330, 310, 330);
        line(310, 330, 310, 230);
        noStroke()
    }


    drawHighScore() {
        textSize(40)
        text('HIGHSCORE', 500, 400)
        if (this.highScore) {
            this.drawRealPlayers(this.highScore)
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
            image(this.flags[i], 20, 470 + (35 * i), 30, 15);
            text(i + 1, 70, 485 + (35 * i))
            text(p.name, 100, 485 + (35 * i))
            textAlign(CENTER)
            text(p.score, 250, 485 + (35 * i))
            text(p.timeUsed, 360, 485 + (35 * i))
            text(p.moves, 470, 485 + (35 * i))
            text(p.captures, 570, 485 + (35 * i))
            text(p.dateCompleted.slice(0, -5).replace('T',' - '), 720, 485 + (35 * i))
        })
    }
}


