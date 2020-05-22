function getById(id) {
  return document.getElementById(id)
}

let game;
let DEFAULT_ROWS = 15
let DEFAULT_COLUMNS = 15
let difficulty = 150

window.onload = function() {
  game = new Game(DEFAULT_ROWS, DEFAULT_COLUMNS, difficulty)
}

let btnStart = getById("btnStart")
let btnPause = getById("btnPause")
let btnEnd = getById("btnEnd")
let lblScore = getById("lblScore")
let selectDifficulty = getById("selectDifficulty")
let modal = getById("modal")

btnStart.addEventListener("click", function(event) {
  if (game.status === GAME_STATUS.not_started) {
    game.speed = difficulty
    game.start()
  } else if (game.status === GAME_STATUS.paused) {
    game.continue()
  } else if (game.status === GAME_STATUS.end) {
    game = new Game(DEFAULT_ROWS, DEFAULT_COLUMNS, difficulty)
    updateScoreLabel(0)
  }
})

btnPause.addEventListener("click", function(event) {
  game.pause()
})

btnEnd.addEventListener("click", function(event) {
  game.end()
})

selectDifficulty.addEventListener('change', function(event) {
  difficulty = Number(this.value)
})

function updateScoreLabel(newScore) {
  lblScore.textContent = "Score: " + newScore
}

function showModal(message) {
  modal.className = "modal is-active"
  getById("modalMessage").textContent = message
}