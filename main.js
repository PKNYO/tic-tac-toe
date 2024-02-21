const GameBoard = (function() {
    const board = 
        [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];

    const positionMarker = function(marker, xPosition, yPosition) {
        if (validMove(xPosition, yPosition)) {
            board[yPosition][xPosition] = marker;
            if (isWinner()) return console.log("last player is the winner");
        } else {
            console.log("Please, position your marker on an empty case.")
        }
    }

    const resetBoard = function() {
        board = 
        [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
    }

    const validMove = function(xPosition, yPosition) {
        return (board[yPosition][xPosition] === "") ? true : false;
    }

    const isWinner = function() {
        let columnResult = "";
        let firstDiagonalResult = "";
        let secondDiagonalResult = "";

        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                if (board[y].join("") === "XXX" || board[y].flat() === "OOO") return true;
                columnResult += board[y][x];
                if (x == y) firstDiagonalResult += board[y][x];
                if (x == 0 && y == 2) secondDiagonalResult += board[y][x];
                if (x == 1 && y == 1) secondDiagonalResult += board[y][x];
                if (x == 2 && y == 0) secondDiagonalResult += board[y][x];
            }
            if (columnResult === "XXX" || columnResult === "OOO") return true;
            if (firstDiagonalResult === "XXX" || firstDiagonalResult === "OOO") return true;
            if (secondDiagonalResult === "XXX" || secondDiagonalResult === "OOO") return true;
        }

        return false;
    }

    return {board, positionMarker, player1, player2};
});

const DisplayController = (function() {
    let turn = 1;                                        //if 1 player one turn, if 2, player 2

    const player = function(name, marker) {
        return {name, marker}
    }

    const createBoard = function() {
        gameContainer.innerHTML = "";
        gameContainer.classList.add("grid-container")

        for (let i = 0; i < 9; i++) {
            const gridCell = document.createElement("div");
            const coord = [];

            gridCell.classList.add("grid-cell");
            gridCell.setAttribute("data", "cell");
            gridCell.dataset.cell = i;
            gameContainer.appendChild(gridCell);

            if (i == 1 || i == 7 || i == 4) gridCell.style.borderLeft = "solid 2px white";
            if (i == 1 || i == 7 || i == 4) gridCell.style.borderRight = "solid 2px white";
            if (i == 3 || i == 4 || i == 5) gridCell.style.borderTop = "solid 2px white";
            if (i == 3 || i == 4 || i == 5) gridCell.style.borderBottom = "solid 2px white";
            
            gridCell.addEventListener("mouseenter", (e) => {
                if (e.target.hasChildNodes()) return

                const marker = document.createElement("div");

                e.target.appendChild(marker);
                marker.classList.add("premarker")

                if (turn == 1) {
                    marker.textContent = "X";
                }
                if (turn == 2) {
                    marker.textContent = "O";
                }
                gridCell.addEventListener("mouseleave", (e) => {
                    e.target.removeChild(marker);
                })
            })
        }
    };

    return {player, createBoard}
})()

// GLOBAL

const playerOneInput = document.querySelector("#player1");
const playerTwoInput = document.querySelector("#player2");
const startButton = document.querySelector("#start-button");
const gameContainer = document.querySelector(".game-container");

startButton.addEventListener("click", () => {
    if (playerOneInput.value === "" || playerTwoInput.value === "") {
        return alert("Enter two players")
    }
    DisplayController.createBoard();
})
