
// framecount. start game only on response
//
function wakeUpServer() {
    axios.get('http://localhost:3200/wakeup')
        .then((response) => {
            if (response.statusText === "OK") {
                game.menu.serversOnline = true
                game.menu.highScore = response.data.highScore
            }
        })
        .catch((error) => {
            console.error(error)
        });
}

// create instance and save id in clientside
function startGame() {
    axios.post('http://localhost:3200/startGame')
        .then((response) => {
            console.log(response, 'response')
            if (response.statusText === "OK") {
                game.gameStarted = true
                game.playerName = response.data.name
            }
        })
        .catch((error) => {
            console.error(error)
        });
}


function levelComplete(data) {
    axios.put('http://localhost:3200/updateStats', data)
        .then((response) => {
            console.log(response, 'response')
            if (response.statusText === "OK") {
                console.log('OK')
            }
        })
        .catch((error) => {
            console.error(error)
        });
}

function finishGame(playerName, newName) {
    axios.put('http://localhost:3200/endGame', { playerName, newName })
        .then((response) => {
            console.log(response, 'response')
            if (response.statusText === "OK") {
                console.log('OK')
            }
        })
        .catch((error) => {

        });
    setTimeout(() => {
        window.location.href = "http://127.0.0.1:5500/index.html";
    }, 3000);
}

