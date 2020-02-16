
// framecount. start game only on response
//
function wakeUpServer() {
    axios.get('http://localhost:3200/wakeup')
        .then(function (response) {
            if (response.statusText === "OK") {
                menu.serversOnline = true
                menu.highScore = response.data.highScore
                console.log(response)
            }
        })
        .catch(function (error) {
            console.log(error)
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

function finishGame(data) {
    fetch('/finishGame', { method: 'POST', body: data })
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

