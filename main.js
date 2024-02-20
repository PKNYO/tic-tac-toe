const GameBoard = (function() {
    const board = 
        [
            ["X", "X", "O"],
            ["", "", ""],
            ["O", "X", ""]
        ];

    const displayBoard = function() {
        console.table(this.board);
    };

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

    return {board, displayBoard, positionMarker};
})();