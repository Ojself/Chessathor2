const baseurl = window.location.href.includes("chessathor2.flesjoe.com")
  ? "https://chessathorserver.cyclic.app"
  : "http://localhost:3200";

function wakeUpServer() {
  axios
    .get(`${baseurl}/wakeup`)
    .then((response) => {
      if (response.status === 200) {
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
    .post(`${baseurl}/startGame`) // todo, change out URL with heroku server
    .then((response) => {
      if (response.status === 200) {
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
      if (response.status === 200) {
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
      if (response.status === 200) {
        // todo, display final score for user when submit
        game.hud.finalScore = response.data.score || 0;
      }
    })
    .catch((error) => {});
  goBackToHomePage();
}

const goBackToHomePage = () => {
  setTimeout(() => {
    window.location.href = "http://chessathor2.flesjoe.com/";
  }, 5000);
};
