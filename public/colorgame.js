// game logic
/* selected elemenets */
let header = document.querySelector("h1");
let messageDisplay = document.querySelector("#messagedisplay");
let colorDisplay = document.querySelector("#colordisplay");
let currentMode = document.querySelector("#normal");
let resetButton = document.querySelector("#reset");
let modeButtons = document.querySelectorAll(".mode");
let squares = document.querySelectorAll(".square");

init();
gameReset();

function init() {
    /* use custom attribute to store the number of squares in different modes */
    document.querySelector("#easy").setAttribute("numSquares", "3");
    document.querySelector("#normal").setAttribute("numSquares", "6");
    document.querySelector("#hard").setAttribute("numSquares", "9");

    resetButton.addEventListener("click", gameReset);
    for (let i = 0; i < modeButtons.length; i++) {
        let updateModel = updateModelHandler.bind(modeButtons[i], modeButtons);
        modeButtons[i].addEventListener("click", updateModel);
    }
}

function updateModelHandler(modeButtons) {
    for (let b = 0; b < modeButtons.length; b++) {
        modeButtons[b].classList.remove("selected");
    }
    this.classList.add("selected");
    currentMode = this;
    gameReset();
}

function gameReset() {
    updateSquares();
    colorDisplay.textContent = pickColor();
    resetButton.textContent = "New Colors";
    header.style.backgroundColor = "steelblue";
    messageDisplay.textContent = "";
}

function updateSquares() {
    let numSquares = currentMode.getAttribute("numSquares");
    for (let i = 0; i < squares.length; i++) {
        if (i < numSquares) {
            squares[i].style.backgroundColor = randomColor();
            squares[i].style.display = "block";
        } else {
            squares[i].style.display = "none";
        }

        squares[i].addEventListener("click", function() {
            if (this.style.backgroundColor === colorDisplay.textContent) {
                messageDisplay.textContent = "Correct!";
                resetButton.textContent = "Play again?";
                changeColor(colorDisplay.textContent);
            } else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again";
            }
        });
    }
}

function randomColor() {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    return "rgb(" + red + ", " + green + ", " + blue + ")";
}

function pickColor() {
    return squares[
        Math.floor(Math.random() * currentMode.getAttribute("numSquares"))
    ].style.backgroundColor;
}

function changeColor(c) {
    header.style.backgroundColor = colorDisplay.textContent;
    let squares = document.querySelectorAll(".square");
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = c;
    }
}
