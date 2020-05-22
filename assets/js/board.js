const CELL_TYPE = {
  empty: 0,
  snake: 1,
  snakeHead: 2,
  feed: 3,
}

function Board(nRows, nCols, el) {
  this.container = document.querySelector(el)
  this.nRows = nRows
  this.nCols = nCols
  this.board = []

  this.cellSize = 35

  for (let i = 0; i < nRows; i++) {
    this.board.push([])
  }
}

Board.prototype.createCell = function() {
  let cell = document.createElement("div")

  cell.className = "cell"

  return cell
}

Board.prototype.createEmptyCell = function() {
  let cell = this.createCell()
  cell.className += " empty-cell"

  return cell
}

Board.prototype.clearBoard = function() {
  while (this.container.hasChildNodes()) {
    this.container.lastChild.remove()
  }
}

Board.prototype.resizeContainer = function(width, height) {
  this.container.style.width = width + "px";
  this.container.style.height = height + "px";
}

Board.prototype.init = function() {
  this.clearBoard()
  this.resizeContainer(this.cellSize * this.nCols + 6,
                       this.cellSize * this.nRows + 6)

  for (let i = 0; i < this.nRows; i++) {
    let rowDiv = document.createElement("div")

    for (let j = 0; j < this.nCols; j++) {
      let cell = this.createEmptyCell()

      rowDiv.append(cell)
      this.board[i].push({element: cell, type: CELL_TYPE.empty})
    }

    this.container.append(rowDiv)
  }
}

Board.prototype.toEmptyCell = function(row, column) {
  let cell = this.board[row][column]

  cell.element.className = "cell empty-cell"
  cell.type = CELL_TYPE.empty
}

Board.prototype.toFeedCell = function(row, column) {
  let cell = this.board[row][column]

  cell.element.className = "cell feed-cell"
  cell.type = CELL_TYPE.feed
}

Board.prototype.toSnakeCell = function(row, column, isHead = false) {
  let cell = this.board[row][column]

  cell.element.className = "cell snake-cell"
  cell.type = CELL_TYPE.snake

  if (isHead) {
    cell.element.className += " snake-head"
    cell.type = CELL_TYPE.snakeHead
  }
}

Board.prototype.updateCell = function(row, column, cellType) {
  if (cellType === CELL_TYPE.empty) {
    this.toEmptyCell(row, column)
  } else if (cellType === CELL_TYPE.feed) {
    this.toFeedCell(row, column)
  } else if (cellType === CELL_TYPE.snake) {
    this.toSnakeCell(row, column)
  } else if (cellType === CELL_TYPE.snakeHead) {
    this.toSnakeCell(row, column, true)
  }
}

Board.prototype.print = function() {
  for (let i = 0; i < this.nRows; i++) {
    let string = "";
    for (let j = 0; j < this.nCols; j++) {
      if (this.board[i][j].type === CELL_TYPE.empty) {
        string += "."
      } else if (this.board[i][j].type === CELL_TYPE.snake) {
        string += "X"
      } else if (this.board[i][j].type === CELL_TYPE.snakeHead) {
        string += "O"
      } else if (this.board[i][j].type === CELL_TYPE.feed) {
        string += "W"
      }
    }

    console.log(string);
  }
}