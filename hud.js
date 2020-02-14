class Hud {
    constructor(currentLevel = 3,captures=10,checks=8) {
        this.checks = checks
        this.captures = captures
        this.timer = 15
        this.currentLevel = currentLevel
        this.blinkCheckText = false
        this.blinkCaptureText = false
    }
    
    draw() {
        textAlign(CENTER,CENTER)
        this.drawTotalChecks() 
        this.drawTotalCaptures()
        this.drawCurrentLevelAndCountDown() 
        this.drawOldTimes()
    }
    blinkCheck(){
        this.blinkCheckText = true
        setTimeout(() => {
            this.blinkCheckText = false
        }, 300);
    }
    blinkCapture(){
        this.blinkCaptureText = true
        setTimeout(() => {
            this.blinkCaptureText = false
        }, 300);
    }
    drawTotalChecks(){
        if (this.blinkCheckText){
            fill('red')
        } else {
            fill('white')
        }
        textSize(15);
        text(`Checks ${this.checks}`,850, 20);
        fill('white')
    }

    drawTotalCaptures(){
        if (this.blinkCaptureText){
            fill('lime')
        } else {
            fill('white')
        }
        textSize(15);
        text(`Captures ${this.captures}`,950, 20);
        fill('white')
    }

    drawCurrentLevelAndCountDown(){
        textSize(30);
        text(`Level ${this.currentLevel}`,865, 115);
    
        textSize(10);
        text(`Time bonus`,960, 80);
        
        textSize(50);
        text(`${this.timer}`,960, 115);
    
        if (frameCount % 60 == 0 && this.timer > 0) { 
          this.timer -=1;
        }
        /* if (this.timer === 0) {
          textSize(30);
          text("GAME OVER!", 900, 200);
        } */
    }
    drawOldTimes(){
        
        ['5,93','8,16','12,09','8,16','12,09','8,16','12,09','8,16','12,09','8,16','12,09','8,16','12,09','8,16','12,09','8,16','12,09','8,16','12,09','8,16','12,09','8,16','12,09'].forEach((t,i)=>{
            textAlign(LEFT)
            textSize(15);
            text(`Level ${i}: ${t}`,820, 210+(i*25));
        })
    }
}
