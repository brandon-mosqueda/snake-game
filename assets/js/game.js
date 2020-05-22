function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min
}

const GAME_STATUS = {
  not_started: 0,
  playing: 1,
  paused: 2,
  end: 3,
}

function Game(nRows, nCols, speed) {
  this.board = new Board(nCols, nRows, "#board")
  this.board.init()

  let snakeInitialSize = 5
  let snakeInitialRow = 6
  for (let i = 0; i < snakeInitialSize; i++) {
    this.board.updateCell(snakeInitialRow, i, CELL_TYPE.snake)
  }

  this.board.updateCell(snakeInitialRow, snakeInitialSize - 1,
                        CELL_TYPE.snakeHead)

  this.board.updateCell(snakeInitialRow, 10, CELL_TYPE.feed)

  this.snake = new Snake(snakeInitialSize, snakeInitialRow)
  this.points = 0
  this.speed = speed
  this.status = GAME_STATUS.not_started
}

Game.prototype.changeSnakeDirection = function(direction) {
  if (this.status === GAME_STATUS.playing) {
    this.snake.changeDirection(direction)
  }
}

Game.prototype.start = function() {
  if (this.status === GAME_STATUS.not_started) {
    this.status = GAME_STATUS.playing
    this.thread = setInterval(() => {
                    if (this.status === GAME_STATUS.playing) {
                      this.move()
                    }
                  }, this.speed)
  }
}

Game.prototype.continue = function() {
  if (this.status === GAME_STATUS.paused) {
    this.status = GAME_STATUS.playing
    closeModal()
  }
}

Game.prototype.pause = function() {
  let callback = () => {
    this.continue()
  }
  showModal("PAUSED", "Continue", callback)

  this.status = GAME_STATUS.paused
}

Game.prototype.end = function() {
  clearInterval(this.thread)
  this.status = GAME_STATUS.end
}

Game.prototype.lose = function() {
  showModal("You lose with " + this.points + " points", "Acept", closeModal)
  this.end()
}

Game.prototype.isValidMovement = function(snakePosition) {
  return !((snakePosition.row < 0 || snakePosition.row >= this.board.nRows) ||
           (snakePosition.column < 0 ||
            snakePosition.column >= this.board.nCols) ||
           (this.board.board[snakePosition.row][snakePosition.column].type ===
            CELL_TYPE.snake))
}

Game.prototype.generateNewFeed = function() {
  let row
  let column

  do {
    row = random(0, this.board.nRows - 1)
    column = random(0, this.board.nCols - 1)
  } while (this.board.board[row][column].type !== CELL_TYPE.empty);

  this.board.updateCell(row, column, CELL_TYPE.feed)
}

Game.prototype.move = function() {
  let nextStep = this.snake.getNextStep()

  if (!this.isValidMovement(nextStep)) {
    this.lose()
    return
  }

  if (this.board.board[nextStep.row][nextStep.column].type ===
      CELL_TYPE.feed) {
    this.points++
    updateScoreLabel(this.points)
    this.board.updateCell(this.snake.head.row, this.snake.head.column,
                          CELL_TYPE.snake)
    this.snake.add(nextStep.row, nextStep.column)
    this.board.updateCell(nextStep.row, nextStep.column,
                          CELL_TYPE.snakeHead, this.snake.direction)

    this.generateNewFeed()
  } else {
    this.board.updateCell(this.snake.head.row, this.snake.head.column,
                          CELL_TYPE.snake)

    let priorLastElement = this.snake.move(nextStep)

    this.board.updateCell(priorLastElement.row, priorLastElement.column,
                          CELL_TYPE.empty)
    this.board.updateCell(this.snake.head.row, this.snake.head.column,
                          CELL_TYPE.snakeHead, this.snake.direction)
  }
}

document.onkeydown = function(event) {
  switch (event.keyCode) {
    case 38: case 87:
      game.changeSnakeDirection(DIRECTION.up)
      break
    case 40: case 83:
      game.changeSnakeDirection(DIRECTION.down)
      break
    case 37: case 65:
      game.changeSnakeDirection(DIRECTION.left)
      break
    case 39: case 68:
      if (game.status === GAME_STATUS.not_started) {
        game.start()
      } else {
        game.changeSnakeDirection(DIRECTION.right)
      }
      break
  }
}