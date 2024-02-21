const GameBoard = (function() {
    const board = 
        [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];

    const resetBoard = function() {
        board = 
        [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
    }

    const positionMarker = function(marker, xPosition, yPosition) {
        if (validMove(xPosition, yPosition)) {
            board[yPosition][xPosition] = marker;
            if (isWinner()) return console.log("last player is the winner");
        } else {
            console.log("Please, position your marker on an empty case.")
        }
    }

    const validMove = function(xPosition, yPosition) {
        return (board[yPosition][xPosition] === "") ? true : false;
    }

    const isWinner = function() {
        let columnResult = "";
        let firstDiagonalResult = "";
        let secondDiagonalResult = "";

        for (let x = 0; x < 3; x++) {
            columnResult = ""
            for (let y = 0; y < 3; y++) {
                if (board[y].join("") === "XXX" || board[y].join("") === "OOO") return true;
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

    return {board, positionMarker, isWinner};
})();

const DisplayController = (function() {
    let turn = null;
    let lastTurn = null;

    const createBoard = function() {
        gameContainer.innerHTML = "";
        gameContainer.classList.add("grid-container")

        for (let i = 0; i < 9; i++) {
            const gridCell = document.createElement("div");
            const markerDiv = document.createElement("div");

            gridCell.classList.add("grid-cell");
            markerDiv.classList.add("marker")
            gridCell.dataset.cell = i;
            gameContainer.appendChild(gridCell);
            gridCell.appendChild(markerDiv);

            if (i == 1 || i == 7 || i == 4) gridCell.style.borderLeft = "solid 2px white";
            if (i == 1 || i == 7 || i == 4) gridCell.style.borderRight = "solid 2px white";
            if (i == 3 || i == 4 || i == 5) gridCell.style.borderTop = "solid 2px white";
            if (i == 3 || i == 4 || i == 5) gridCell.style.borderBottom = "solid 2px white";

            gridCell.addEventListener("click", (e) => {
                if (e.target.firstChild.textContent !== "") return

                let x = 0;
                let y = 0;
                const position = e.target.dataset.cell

                    if (position < 3) y = 0;
                    if (position > 5) y = 2;
                    if (position > 2 && position < 6) y = 1;
                    if (position == 0 || position == 3 || position == 6) x = 0;
                    if (position == 1 || position == 4 || position == 7) x = 1;
                    if (position == 2 || position == 5 || position == 8) x = 2;

                let currentPlayer = (this.turn == "playerOne") ? this.playerOne : this.playerTwo;

                GameBoard.positionMarker(currentPlayer.marker, x, y);
                this.lastTurn = this.turn;
                this.turn = (this.turn == "playerTwo") ? "playerOne" : "playerTwo";
                populateBoard();

                if (GameBoard.isWinner() == true) { displayWinner(this.lastTurn) };
            })
        }
    };

    const populateBoard = function() {
        for (let position = 0; position < 9; position++) {
            const gridCase = document.querySelector(`div[data-cell="${position}"]`)
            let x = 0;
            let y = 0;

            if (position < 3) y = 0;
            if (position > 5) y = 2;
            if (position > 2 && position < 6) y = 1;
            if (position == 0 || position == 3 || position == 6) x = 0;
            if (position == 1 || position == 4 || position == 7) x = 1;
            if (position == 2 || position == 5 || position == 8) x = 2;

            gridCase.firstChild.textContent = GameBoard.board[y][x];
        }
    }

    const displayWinner = function() {
        const winner = (this.lastTurn == "playerOne") ? this.playerOne : this.playerTwo;

        console.log(this.lastTurn)
    }

    return {createBoard, populateBoard}
})()

const player = function(name, marker) {
    return {name, marker}
}

// GLOBAL

const playerOneInput = document.querySelector("#player1");
const playerTwoInput = document.querySelector("#player2");
const startButton = document.querySelector("#start-button");
const gameContainer = document.querySelector(".game-container");

function playRound(player1, player2) {
    let playerTurn = Math.floor(Math.random() * 2 + 1);

    DisplayController.turn = (playerTurn == 1) ? "playerOne" : "playerTwo";

    DisplayController.playerOne = player1;
    DisplayController.playerTwo = player2;
    DisplayController.createBoard();
}

startButton.addEventListener("click", () => {
    if (playerOneInput.value === "" || playerTwoInput.value === "") {
        return alert("Enter two players");
    }
    playRound(player(playerOneInput.value, "X"), player(playerTwoInput.value, "O"));
})
