class Hud {
    constructor() {
        this.timer = 15
        this.blinkCheckText = false
        this.blinkCaptureText = false

        this.timeHistory = []
    }

    draw() {
        textAlign(CENTER, CENTER)
        this.drawTotalChecks()
        this.drawTotalCaptures()
        this.drawCurrentLevelAndCountDown()
        this.drawOldTimes()
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
        textSize(30);
        text(`Level ${game.currentLevel}`, 865, 115);

        textSize(10);
        text(`Time bonus`, 960, 80);

        textSize(50);
        text(`${this.timer}`, 960, 115);

        if (frameCount % 60 == 0 && this.timer > 0) {
            this.timer -= 1;
        }
        /* if (this.timer === 0) {
          textSize(30);
          text("GAME OVER!", 900, 200);
        } */
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
}
