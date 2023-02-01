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
                        updateBoard(board);
                        currentPlayer = currentPlayer == 1 ? 2 : 1;
                    }

                    console.log(board);
                });

                $row.appendChild($cell);
            }
        }

        document.body.appendChild($board);
    }

    function markCell(board, cell, currentPlayer) {
        if (isCellEmpty(board, cell)) {
            board[cell.row][cell.col] = currentPlayer;
            return true;
        }
        return false;
    }

    function isCellEmpty(board, cell) {
        return !board[cell.row][cell.col];
    }

    function updateBoard(board) {
        for (let rowIndex in board) {
            for (let colIndex in board[rowIndex]) {
                if (board[rowIndex][colIndex]) {
                    let $cell = document.getElementById(`cell-${rowIndex}-${colIndex}`);

                    $cell.classList.add(`board__cell--player${board[rowIndex][colIndex]}`);
                }
            }
        }

        checkWinState(board);
    }

    /*
    TODO:
    - separate checks in individual functions
    - return a state (e.g. an object that contains information, whether someone has won and if so, how they have won)
    - optimize the loops and maybe find a way to use reduce (or use Array.find())
    */
    function checkWinState(board) {
        // Check the rows
        for (let rowIndex in board) {
            let allEqual = true;
            let colIndex;

            for (colIndex = 1; colIndex < board[rowIndex].length && allEqual; colIndex++) {
                allEqual =
                    board[rowIndex][colIndex] != 0 &&
                    board[rowIndex][colIndex] === board[rowIndex][colIndex - 1];
            }

            if (allEqual) {
                // return { winner: board[rowIndex][colIndex - 1], condition: 'row', num: rowIndex };
                console.log(`Winner: ${board[rowIndex][colIndex - 1]} with row ${rowIndex}`);
            }
        }


        // Check the columns
        let row = board[0];

        for (colIndex = 0; colIndex < row.length; colIndex++) {
            let rowIndex = 1;
            let allEqual = true;
            for (; rowIndex < board.length && allEqual; rowIndex++) {
                allEqual =
                    board[rowIndex][colIndex] != 0 &&
                    board[rowIndex][colIndex] === board[rowIndex - 1][colIndex];
            }

            if (allEqual) {
                // return {
                //     winner: board[rowIndex - 1][colIndex],
                //     condition: 'column',
                //     num: colIndex,
                // };
                console.log(`Winner: ${board[rowIndex - 1][colIndex]} with col ${colIndex}`);
            }
        }

        // Check the diagonals
        {
            let allEqual = true;
            for (let i = 1; i < board.length && allEqual; i++) {
                allEqual = board[i][i] != 0 && board[i - 1][i - 1] === board[i][i];
            }

            if (allEqual) {
                console.log('Winner: diagonal 1');
            }
        }

        {
            let allEqual = true;
            for (let i = 1; i < board.length && allEqual; i++) {
                allEqual =
                    board[2 - i][2 - (2 - i)] != 0 &&
                    board[2 - i][2 - (2 - i)] === board[2 - (i - 1)][2 - (2 - (i - 1))];
            }

            // board[2-0][2-2] = board[2][0]
            // board[2-1][2-1] = board[1][1]
            // board[2-2][2-0] = board[0][2]

            if (allEqual) {
                console.log('Winner: diagonal 2');
            }
        }
    }

    window.addEventListener('DOMContentLoaded', () => renderBoard(board, currentPlayer));
})(createBoard(3, 3), 1);
