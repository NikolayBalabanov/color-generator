console.log('hello')
const cols = document.querySelectorAll('.col')

function getRandomColor() {
    // RGB
    // #ff0000
    // #00ff00
    // #0000ff
    const hexCodes = '1234567890ABCDEF'
    let color = ''
    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random()* hexCodes.length)]
    }
    return '#' + color
}

function setRandomColors() {
    cols.forEach(col => {
        const text = col.querySelector('.col__text')
        const color = getRandomColor()

        text.textContent = color
        col.style.background = color
    })
}

setRandomColors()