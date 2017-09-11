const canvas = document.getElementById('tetris')
const context = canvas.getContext('2d')

context.scale(20, 20)

const piece = [
    [0, 0, 0, 0],
    [0, 1, 1, 1],
    [0, 0, 1, 0],
    [0, 0, 0, 0]
]

const player = {
    pos: { x: 5, y: 5 },
    piece: piece,
    playground: createMatrix(10, 20)
}

const keycode = {
    ARROW_LEFT: 37,
    ARROW_RIGHT: 39,
    SPACE: 32
}

function collide(piece, offset, playground) {
    for (let y = 0; y < piece.length; ++y) {
        for (let x = 0; x < piece[y].length; ++x) {
            if (piece[y][x] !== 0 && !playground[y + offset.y]) {
                return true
            }
            if (piece[y][x] !== 0 && playground[y + offset.y][x + offset.x] !== 0) {
                return true
            }
        }
    }
    return false
}

function createMatrix(width, height) {
    return Array(height).fill().map(() => Array(width).fill(0))
}

function keyPresses(player) {
    document.addEventListener('keydown', event => {
        if (event.keyCode === keycode.ARROW_LEFT) {
            player.pos.x--
        } else if (event.keyCode === keycode.ARROW_RIGHT) {
            player.pos.x++
        }
    })
}

function render(context, player) {
    context.fillStyle = '#000'
    context.fillRect(0, 0, canvas.width, canvas.height)
    drawMatrix(player.piece, player.pos, context)
}

function drawMatrix(matrix, position, context) {
    piece.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = 'red'
                context.fillRect(
                    x + position.x,
                    y + position.y,
                    1, 1)
            }
        })
    })
}

let dropCounter = 0
const dropInterval = 1000

let lastTime = 0
function update(time = 0) {
    const deltaTime = time - lastTime
    lastTime = time

    dropCounter += deltaTime
    if (dropCounter > dropInterval) {
        player.pos.y++
        dropCounter = 0
    }
    render(context, player)
    window.requestAnimationFrame(update)
}

update()
keyPresses(player)
