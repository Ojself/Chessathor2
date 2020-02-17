// if local -> http://localhost:3200/ENDPOINT
// if deployed -> http://chessathorserver.herokuapp.com/ENDPOINT
function wakeUpServer() {
    axios.get('http://chessathorserver.herokuapp.com/wakeup')
        .then((response) => {
            if (response.statusText === "OK") {
                game.menu.serversOnline = true
                game.menu.highScore = response.data.highScore
                game.menu.preloadImages()
            }
        })
        .catch((error) => {
            console.error(error)
        });
}

// create player instance and save id in clientside
function startGame() {
    axios.post('http://chessathorserver.herokuapp.com/startGame') // todo, change out URL with heroku server
        .then((response) => {
            if (response.statusText === "OK") {
                game.gameStarted = true
                game.music.play()
                game.playerName = response.data.name
            }
        })
        .catch((error) => {
            console.error(error)
        });
}


function levelComplete(data) {
    axios.put('http://chessathorserver.herokuapp.com/updateStats', data)
        .then((response) => {
            if (response.statusText === "OK") {
                console.log('OK')
            }
        })
        .catch((error) => {
            console.error(error)
        });
}

function finishGame(playerName, newName) {
    axios.put('http://chessathorserver.herokuapp.com/endGame', { playerName, newName })
        .then((response) => {
            if (response.statusText === "OK") { // todo, display final score for user when submit
                game.hud.finalScore = response.data.player.score || 0
            }
        })
        .catch((error) => {

        });
    setTimeout(() => {
        window.location.href = "http://chessathor2.flesjoe.com/";
    }, 5000);
}


