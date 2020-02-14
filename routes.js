
// framecount. start game only on response
//

function wakeUpServer() {
    fetch('/wakeup', { method: 'GET' })
        .then((response) => {
            console.log(response, 'response')
            if (response.ok) {
                return response.json()
            }
            throw new Error('Request failed.');
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getHighScore() {
    fetch('/highScore', { method: 'GET' })
        .then((response) => {
            if (response.ok) {
                console.log(response, 'response')
                return response.json()
            }
            throw new Error('Request failed.');
        })
        .catch(function (error) {
            console.log(error);
        });
}

// create instance and save id in clientside
function startGame() {
    fetch('/startGame', { method: 'POST' })
        .then((response) => {
            if (response.ok) {
                console.log(response, 'response')
                return response.json()
            }
            throw new Error('Request failed.');
        })
        .catch(function (error) {
            console.log(error);
        });
}

this.capturedPieces = []
this.moveHistory = []
this.checks = 0


function levelComplete(data) {
    fetch('/updateStats', { method: 'PUT', body: data })
        .then((response) => {
            if (response.ok) {
                console.log(response, 'response')
                return response.json()
            }
            throw new Error('Request failed.');
        })
        .catch(function (error) {
            console.log(error);
        });
}

