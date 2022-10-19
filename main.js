const cols = document.querySelectorAll('.col')


// hendlers //

document.addEventListener('keydown', (e) => {
    if (e.code.toLowerCase() === 'space') {
        setRandomColors()
    }
})

document.addEventListener('click', (e) => {
    const type = e.target.dataset.type
    copyClickedBoard()
    if (type === 'lock') {
        const node = e.target.tagName.toLowerCase() === 'i'
            ? e.target
            : e.target.chidren[0]

        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    } else if (type === 'copy') {
        copyClickedBoard(e.target.textContent)
    }
})

//tools

function setTextColor(text, color) {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black' : 'white'
}

function setRandomColors(isInitial) {
    let colors = isInitial ? getColorsFromHash() : []
    cols.forEach((col, index) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        const text = col.querySelector('.col__text')
        const color = isInitial 
            ? colors[index]
                ? colors[index]
                : chroma.random()
            : chroma.random()
        const btn = col.querySelector('.col__btn')

        if (isLocked) {
            colors.push(text.textContent)
            return
        }
        if (!isInitial) {
            colors.push(color.hex())
        }
        setTextColor(text, color)
        setTextColor(btn, color)
        col.style.background = color
        text.textContent = color
    })
    updateColorsHash(colors)
}

function copyClickedBoard(text) {
    navigator.clipboard.writeText(text)
}

function updateColorsHash(colors = []) {
    console.log(colors)
    document.location.hash = colors.map((el) => el.slice(1)).join('-')
}

function getColorsFromHash() {
    if (document.location.hash.length > 1) {
       return document.location.hash.slice(1).split('-').map(color => '#' + color)
    }
    return []
}

setRandomColors(true)