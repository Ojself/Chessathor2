// if local -> http://localhost:3200/ENDPOINT
// if deployed -> https://chessathorserver.herokuapp.com/ENDPOINT
function wakeUpServer() {
    axios.get('https://chessathorserver.herokuapp.com/wakeup')
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
    axios.post('https://chessathorserver.herokuapp.com/startGame') // todo, change out URL with heroku server
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
    axios.put('https://chessathorserver.herokuapp.com/updateStats', data)
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
    axios.put('https://chessathorserver.herokuapp.com/endGame', { playerName, newName })
        .then((response) => {
            if (response.statusText === "OK") { // todo, display final score for user when submit
                game.hud.finalScore = response.data.player.score || 0
            }
        })
        .catch((error) => {

        });
    setTimeout(() => {
        // todo, send to githubpages or something
        window.location.href = "https://ojself.github.io/Chessathor2/index.html";
    }, 5000);
}


