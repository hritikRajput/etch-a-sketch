let grid = document.querySelector('.grid');
let sizeButton = document.querySelector('.size');
let blackButton = document.querySelector('.black');
let randomButton = document.querySelector('.random');
let darkerButton = document.querySelector('.darker');

let size = 16;
let blackColor = "rgb(0,0,0)";
let darkerColor = "rgb(255, 255, 255)";

blackButton.classList.add('active');
blackButton.addEventListener('click', () => {
    blackButton.classList.add('active');
    darkerButton.classList.remove('active')
    randomButton.classList.remove('active');
    removeColor()
})
randomButton.addEventListener('click', () => {
    blackButton.classList.remove('active');
    darkerButton.classList.remove('active')
    randomButton.classList.add('active');
    removeColor()
})
darkerButton.addEventListener('click', () => {
    blackButton.classList.remove('active');
    randomButton.classList.remove('active');
    darkerButton.classList.add('active');
    removeColor()
})


function enterSize(e) {
    let enteredVal = prompt("Enter the size less than 100: ")
    size = enteredVal ? parseInt(enteredVal) : 16;
    if (size < 16 || size > 100) {
        alert("Enter size is not in the range 16-100")
        return
    }
    console.log(size)
    clearGrid();
    drawGrid(size);
}

function drawGrid(size) {
    for (let i = 1; i <= size; i++) {
        const newRow = document.createElement('div');
        for (let j = 1; j <= size; j++) {
            const newDiv = document.createElement('div')
            newDiv.classList.add("square");
            newRow.appendChild(newDiv)
        }
        newRow.classList.add("row");
        grid.appendChild(newRow)
    }
    let squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.addEventListener('mouseenter', changeColor);
        square.addEventListener('touchstart', changeColor);
    })
}

function clearGrid() {
    while (grid.firstChild) {
        grid.removeChild(grid.lastChild)
    }
}

function changeColor(e) {
    if (-1 < Array.from(randomButton.classList).indexOf('active')) {
        e.target.style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;
    }
    else if (-1 < Array.from(darkerButton.classList).indexOf('active')) {
        let rgbVal = e.target.style.backgroundColor.replace(/[^\d,]/g, '').split(',')[0];

        if (rgbVal >= 0 && (-1 < Array.from(e.target.classList).indexOf('visited'))) {

            rgbVal = rgbVal - 25.5;
            e.target.style.backgroundColor = `rgb(${rgbVal}, ${rgbVal}, ${rgbVal})`
        }
        else {
            e.target.classList.add('visited')
            e.target.style.backgroundColor = darkerColor;
        }
    }

    else {
        e.target.style.backgroundColor = blackColor;
    }

}

function removeColor() {
    for (const row of grid.children) {
        for (const col of row.children) {
            col.style.backgroundColor = "";
        };
    }
}




drawGrid(size)
sizeButton.addEventListener('click', enterSize);


