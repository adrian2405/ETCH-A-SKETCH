const container = document.getElementById("container");

const btnClear = document.querySelector('#clear');
btnClear.addEventListener('click', () => { location.reload() });

const btnResize = document.querySelector('#resize');
btnResize.addEventListener('click', () => { resizeGrid() });

const btnErase = document.querySelector('#erase');
btnErase.addEventListener('click', () => { eraseColor() });

const btnDegradedBlack = document.querySelector('#degradedBlack');
btnDegradedBlack.addEventListener('click', () => { degradedToggleColor() });

const btnBlack = document.querySelector('#black');
btnBlack.addEventListener('click', () => { toggleColor() });

const btnRandom = document.querySelector('#random');
btnRandom.addEventListener('click', () => { randomColor() });

newGrid(16);
toggleColor();

function newGrid(divs) {
    const content = document.createElement('div');
    content.classList.add('content');
    container.appendChild(content);

    for (i = 0; i < divs; i++) {
        let columns = document.createElement('div');
        columns.classList.add('columns');
        content.appendChild(columns);

        for (j = 0; j < divs; j++) {
            let rows = document.createElement('div');
            rows.classList.add('rows');
            columns.appendChild(rows);
        }
    }
}

function removeGrid(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function toggleColor() {
    let rows = document.querySelectorAll(".rows");
    rows.forEach(one => {
        one.removeEventListener("mouseover", eraseOver);
        one.removeEventListener("mouseover", degradedBlackOver);
        one.removeEventListener("mouseover", randomColor);
        one.addEventListener("mouseover", blackOver);
    });
}

function eraseColor() {
    let rows = document.querySelectorAll(".rows");
    rows.forEach(one => {
        one.removeEventListener("mouseover", blackOver);
        one.removeEventListener("mouseover", degradedBlackOver);
        one.removeEventListener("mouseover", randomColor);
        one.addEventListener("mouseover", eraseOver);
    });
}

function degradedToggleColor() {
    let rows = document.querySelectorAll(".rows");
    rows.forEach(one => {
        one.removeEventListener("mouseover", blackOver);
        one.removeEventListener("mouseover", eraseOver);
        one.removeEventListener("mouseover", randomColor);
        one.addEventListener("mouseover", degradedBlackOver);
    });
}

function randomColor() {
    let rows = document.querySelectorAll(".rows");
    rows.forEach(one => {
        one.removeEventListener("mouseover", blackOver);
        one.removeEventListener("mouseover", degradedBlackOver);
        one.removeEventListener("mouseover", eraseOver);
        one.addEventListener("mouseover", randomOver);
    });
}

function blackOver(e) {
    e.target.style.cursor = 'pointer';
    e.target.style.filter = 'brightness(1)'
    e.target.style.backgroundColor = 'black';
}

function eraseOver(e) {
    e.target.style.cursor = 'pointer';
    e.target.style.filter = 'brightness(1)'
    e.target.style.backgroundColor = 'white';
}

function degradedBlackOver(e) {
    e.target.style.cursor = 'pointer';
    e.target.style.backgroundColor = 'white';
    var regExp = /\(([^)]+)\)/;
    let brightness = window.getComputedStyle(e.target).getPropertyValue('filter');
    var matches = regExp.exec(brightness);
    let brightnessValue = parseFloat(matches[1]) - 0.1;
    e.target.style.filter = 'brightness(' + brightnessValue + ')';
}

function randomOver(e) {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    e.target.style.cursor = 'pointer';
    e.target.style.backgroundColor = '#' + randomColor;
}

function resizeGrid() {
    removeGrid(container);
    let select = prompt('Select a new grid size (for example 64)', 16);
    if (select != null) {
        newGrid(select);
        toggleColor();
    } else {
        location.reload();
    }
}