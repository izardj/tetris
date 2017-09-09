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
    piece: piece
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
    requestAnimationFrame(update)
}

update()
