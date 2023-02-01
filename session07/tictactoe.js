/**
 * Generates a playing board as a two-dimensional array (w > h) and fills it with a default value
 * @param {number} rows The width
 * @param {number} cols The height
 * @param {*} d (optional) The default value. Standard is 0
 * @returns A two-dimensional array
 */
function createBoard(rows, cols, d = 0) {
    let board = [];
    for (let x = 0; x < rows; x++) {
        board[x] = new Array(cols).fill(d);
    }
    return board;
}

((board, currentPlayer) => {
    function renderBoard(board, currentPlayer) {
        const $board = document.createElement('div');
        $board.classList.add('board');
        $board.classList.add(`board--player${currentPlayer}`);

        for (let rowIndex in board) {
            let row = board[rowIndex];

            const $row = document.createElement('div');
            $row.classList.add('board__row');
            $board.appendChild($row);

            for (let colIndex in row) {
                const $cell = document.createElement('div');
                $cell.classList.add('board__cell');
                $cell.setAttribute('id', `cell-${rowIndex}-${colIndex}`);

                $cell.addEventListener('click', () => {
                    if (markCell(board, { row: rowIndex, col: colIndex }, currentPlayer)) {
                        updateBoard(board, currentPlayer);
                        $board.classList.toggle(`board--player${currentPlayer}`);
                        currentPlayer = currentPlayer == 1 ? 2 : 1;
                        $board.classList.toggle(`board--player${currentPlayer}`);
                    }
                });

                $row.appendChild($cell);
            }
        }

        const infoTextContainer = document.createElement('span');
        infoTextContainer.setAttribute('id', 'game__infotext');
        infoTextContainer.innerText = ' ';

        document.body.appendChild(infoTextContainer);
        document.body.appendChild($board);
    }

    /**
     * Marks a cell with the value for a given player if it is empty
     * @param {Array} board
     * @param {Object} cell
     * @param {Number} currentPlayer
     * @returns true if cell yould be marked, false if cell was occupied
     */
    function markCell(board, cell, currentPlayer) {
        if (isCellEmpty(board, cell)) {
            board[cell.row][cell.col] = currentPlayer;
            return true;
        }
        return false;
    }

    /**
     * Checks if a cell is empty
     * @param {Array} board
     * @param {Object} cell
     * @returns
     */
    function isCellEmpty(board, cell) {
        return !board[cell.row][cell.col];
    }

    function updateBoard(board, currentPlayer) {
        for (let rowIndex in board) {
            for (let colIndex in board[rowIndex]) {
                if (board[rowIndex][colIndex]) {
                    let $cell = document.getElementById(`cell-${rowIndex}-${colIndex}`);
                    $cell.classList.add(`board__cell--occupied`);
                    $cell.classList.add(`board__cell--player${board[rowIndex][colIndex]}`);
                }
            }
        }

        checkWinState(board, currentPlayer);
    }

    function areAllElementsEqual(arr) {
        return arr[0].value != 0 && typeof arr.find((e) => e.value != arr[0].value) == 'undefined';
    }

    /*
    TODO:
    - separate checks in individual functions
    - return a state (e.g. an object that contains information, whether someone has won and if so, how they have won)
    - optimize the loops and maybe find a way to use reduce (or use Array.find())
    */
    function checkWinState(board, currentPlayer) {
        // Check the rows
        for (let rowIndex in board) {
            let row = board[rowIndex].map((e, colIndex) => {
                return { value: e, id: `${rowIndex}-${colIndex}` };
            });
            if (areAllElementsEqual(row)) {
                // return { winner: board[rowIndex][colIndex - 1], condition: 'row', num: rowIndex };
                console.log(`Winner found: ${currentPlayer}`);
                console.log(row);
            }
        }

        // Check the columns
        let row = board[0];

        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            let column = [];
            for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
                column.push({ value: board[rowIndex][colIndex], id: `${rowIndex}-${colIndex}` });
            }

            if (areAllElementsEqual(column)) {
                // return {
                //     winner: board[rowIndex - 1][colIndex],
                //     condition: 'column',
                //     num: colIndex,
                // };
                console.log(`Winner found: ${currentPlayer}`);
                console.log(column);
            }
        }

        // Check the diagonals

        // Top left to bottom right
        let firstDiagonal = [];
        for (let i = 0; i < board.length; i++) {
            firstDiagonal.push({ value: board[i][i], id: `${i}-${i}` });
        }

        if (areAllElementsEqual(firstDiagonal)) {
            console.log(`Winner found: ${currentPlayer}`);
            console.log(firstDiagonal);
        }

        // Bottom left to top right
        let secondDiagonal = [];
        for (let i = 0; i < board.length; i++) {
            // e.g. for a 3x3 board it builds an array of board[2][0], board[1][1], board[0][2]
            secondDiagonal.push({
                value: board[board.length - 1 - i][i],
                id: `${board.length - 1 - i}-${i}`,
            });
        }

        if (areAllElementsEqual(secondDiagonal)) {
            console.log(`Winner found: ${currentPlayer}`);
            console.log(secondDiagonal);
        }
    }

    window.addEventListener('DOMContentLoaded', () => renderBoard(board, currentPlayer));
})(createBoard(3, 3), 1);
