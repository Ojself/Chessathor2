class Hud {
    constructor() {
        this.timer = 15
        this.blinkCheckText = false
        this.blinkCaptureText = false

        this.timeHistory = []
        this.inputField = ''

        this.submitted = false
        this.finalScore = 0
    }

    draw() {
        textAlign(CENTER, CENTER)
        this.drawTotalChecks()
        this.drawTotalMoves()
        this.drawTotalCaptures()
        this.drawCurrentLevelAndCountDown()
        this.drawOldTimes()
        if (game.gameOver) {
            this.drawInputField()
        }
        if (this.submitted) {
            this.drawSubmitted()
        }
    }
    blinkCheck() {
        this.blinkCheckText = true
        setTimeout(() => {
            this.blinkCheckText = false
        }, 200);
    }
    blinkCapture() {
        this.blinkCaptureText = true
        setTimeout(() => {
            this.blinkCaptureText = false
        }, 200);
    }
    drawTotalChecks() {
        if (this.blinkCheckText) {
            textSize(18);
            fill('tomato')
        } else {
            textSize(15);
            fill('white')
        }
        text(`Checks ${game.totalChecks}`, 850, 20);
        fill('white')
    }

    drawTotalMoves() {
        textSize(15);
        fill('white')
        text(`Moves ${game.totalMoveHistory.length}`, 900, 40);
        fill('white')
    }

    drawTotalCaptures() {
        if (this.blinkCaptureText) {
            fill('lime')
        } else {
            fill('white')
        }
        textSize(15);
        text(`Captures ${game.totalCapturedPieces.length}`, 950, 20);
        fill('white')
    }

    drawCurrentLevelAndCountDown() {
        if (game.gameOver) {
            return
        }
        textSize(30);
        text(`Level ${game.currentLevel}`, 865, 115);

        textSize(10);
        text(`Time bonus`, 960, 80);

        textSize(50);
        text(`${this.timer}`, 960, 115);

        if (frameCount % 60 == 0 && this.timer > 0) {
            this.timer -= 1;
        }
    }
    saveTime() {
        const timeFloats = frameCount.toString()
        const twoLastDigits = timeFloats.substr(timeFloats.length - 2)
        this.timeHistory.push(`${this.timer}:${twoLastDigits}`)
    }
    drawOldTimes() {
        this.timeHistory.forEach((t, i) => {
            textAlign(LEFT)
            textSize(15);
            text(`Level ${i}: ${t}`, 820, 210 + (i * 25));
        })
    }

    drawInputField() {
        textAlign(LEFT)
        fill('white')
        textSize(20)
        text('Enter name', 862, 80)

        rect(830, 100, 180, 50)

        fill('black')
        textSize(25)
        text(this.inputField, 840, 125) // max 9
        if (!this.submitted) {
            fill('grey')
            rect(863, 158, 104, 34)

            fill('tomato')
            rect(865, 160, 100, 30)

            textSize(20)
            fill('white')
            text('SUBMIT!', 872, 175)
        }
    }
    enterName(key, keyCode) {
        if (keyCode === 8) { // backspace
            this.inputField = this.inputField.slice(0, -1)
        }
        if (keyCode > 90 || keyCode < 47) {
            return false
        }
        if (this.inputField.length > 9) {
            return false
        }

        this.inputField += key

    }
    submitHover() { // this is only triggered by mouseClick
        if (mouseX > 870 && mouseX < 970) {
            if (mouseY > 160 && mouseY < 190) {
                this.submitted = true
                return this.inputField
            }
        }
        return false
    }
    drawSubmitted() {
        textSize(20)
        fill('white')
        text('Submitted!', 872, 175)
        text(`Score: ${this.finalScore}`, 885, 195)
    }
}


