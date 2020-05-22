const DIRECTION = {
  up: 1,
  right: 2,
  left: 3,
  down: 4,
}

function Snake(size, initialRow) {
  this.body = []
  for (let i = size - 1; i >= 0; i--) {
    this.body.push({row: initialRow, column: i})
  }

  this.size = size
  this.head = this.body[0]
  this.direction = DIRECTION.right
}

Snake.prototype.add = function(row, column) {
  this.body.unshift({row: row, column: column})
  this.head = this.body[0]
  this.size++
}

Snake.prototype.changeDirection = function(direction) {
  if (this.direction === direction)
    return

  if ((direction === DIRECTION.up && this.direction !== DIRECTION.down) ||
      (direction === DIRECTION.down && this.direction !== DIRECTION.up) ||
      (direction === DIRECTION.left && this.direction !== DIRECTION.right) ||
      (direction === DIRECTION.right && this.direction !== DIRECTION.left)) {
    this.direction = direction
  }
}

Snake.prototype.getNextStep = function() {
  let row = this.head.row
  let column = this.head.column

  switch (this.direction) {
    case DIRECTION.up:
      row--
      break
    case DIRECTION.down:
      row++
      break
    case DIRECTION.left:
      column--
      break
    case DIRECTION.right:
      column++
      break
  }

  return {row: row, column: column}
}

Snake.prototype.move = function(moveTo) {
  let priorLastElement = this.body.pop()

  this.body.unshift(moveTo)
  this.head = this.body[0]

  return priorLastElement
}