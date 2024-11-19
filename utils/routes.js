const baseurl = window.location.href.includes("ojself.github.io/Chessathor2")
  ? "https://chessathorserver.fly.dev"
  : "http://localhost:3200";

function wakeUpServer() {
  axios
    .get(`${baseurl}/wakeup`)
    .then((response) => {
      if ([204, 201, 200].includes(response.status)) {
        game.menu.serversOnline = true;
        game.menu.highScore = response.data.highScore;
        game.menu.preloadImages();
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

// create player instance and save id in clientside
function startGame() {
  axios
    .post(`${baseurl}/startGame`)
    .then((response) => {
      if ([204, 201, 200].includes(response.status)) {
        game.gameStarted = true;
        game.music.play();
        game.playerName = response.data.name;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function levelComplete(data) {
  axios
    .put(`${baseurl}/updateStats`, data)
    .then((response) => {
      if ([204, 201, 200].includes(response.status)) {
        /* if (response.data.cheater === true) {
                    return goBackToHomePage()
                } */
        // trigger new level here?
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function finishGame(playerName, newName) {
  axios
    .put(`${baseurl}/endGame`, { playerName, newName })
    .then((response) => {
      if ([204, 201, 200].includes(response.status)) {
        // todo, display final score for user when submit
        game.hud.finalScore = response.data.score || 0;
      }
    })
    .catch((error) => {
      console.error(error);
    });
  goBackToHomePage();
}

const goBackToHomePage = () => {
  setTimeout(() => {
    window.location.href = "https://ojself.github.io/Chessathor2/";
  }, 5000);
};
