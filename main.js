const GameBoard = (function() {
    const board = 
        [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];

    const displayBoard = function() {
        console.table(this.board);
    };

    const positionMarker = function(marker, xPosition, yPosition) {
        board[yPosition][xPosition] = marker;
    }

    return {board, displayBoard, positionMarker};
})();