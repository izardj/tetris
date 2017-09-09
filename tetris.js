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

function render() {
    context.fillStyle = '#000'
    context.fillRect(0, 0, canvas.width, canvas.height)
    drawMatrix(player.piece, player.pos)
}

function drawMatrix(matrix, position) {
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

function update() {
    render()
    requestAnimationFrame(update)
}

update()
