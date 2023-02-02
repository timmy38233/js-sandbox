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

const SIZE = 3;

((board, currentPlayer) => {
    /**
     * Renders a new game board
     * @param {Array} board Array where the board state is saved
     * @param {Number} currentPlayer The number of the starting player
     */
    function renderBoard(board, currentPlayer) {
        const $board = document.createElement('div');
        $board.classList.add('board');
        $board.classList.add(`board--player${currentPlayer}`);

        // Listen for custom gamestatechange event to update the board and check for a win
        $board.addEventListener('gamestatechange', (gameState) => {
            updateBoard(board);

            let winState = getWinState(board, currentPlayer);
            if (winState.hasSomeoneWon) {
                endGame(gameState.target, winState);
            }

            gameState.target.classList.toggle(`board--player${currentPlayer}`);
            currentPlayer = currentPlayer == 1 ? 2 : 1;
            gameState.target.classList.toggle(`board--player${currentPlayer}`);
        });

        // Generate the board
        for (let rowIndex in board) {
            let row = board[rowIndex];

            const $row = document.createElement('div');
            $row.classList.add('board__row');
            $board.appendChild($row);

            for (let colIndex in row) {
                const $cell = document.createElement('div');
                $cell.classList.add('board__cell');
                $cell.setAttribute('id', `cell-${rowIndex}-${colIndex}`);

                // Make a move
                $cell.addEventListener('click', () => {
                    if (
                        !$board.classList.contains('game-finished') &&
                        markCell(board, { row: rowIndex, col: colIndex }, currentPlayer)
                    ) {
                        const gameStateChangedEvent = new CustomEvent('gamestatechange');
                        $board.dispatchEvent(gameStateChangedEvent);
                    }

                    console.log(board);
                });

                $row.appendChild($cell);
            }
        }

        const infoTextContainer = document.createElement('div');
        infoTextContainer.setAttribute('id', 'game__info');

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

    function updateBoard(board) {
        for (let rowIndex in board) {
            for (let colIndex in board[rowIndex]) {
                if (board[rowIndex][colIndex]) {
                    let $cell = document.getElementById(`cell-${rowIndex}-${colIndex}`);
                    $cell.classList.add(`board__cell--occupied`);
                    $cell.classList.add(`board__cell--player${board[rowIndex][colIndex]}`);
                }
            }
        }
    }


    // [{value: 1, id: '0-0'}, {1, id: '0-1'}]
    function areAllElementsEqual(arr) {
        return arr[0].value != 0 && typeof arr.find((e) => e.value != arr[0].value) == 'undefined';
    }


    function getWinState(board, currentPlayer) {
        // Check the rows
        for (let rowIndex in board) {
            let row = board[rowIndex].map((e, colIndex) => {
                return { value: e, id: `${rowIndex}-${colIndex}` };
            });
            if (areAllElementsEqual(row)) {
                return { hasSomeoneWon: true, winner: currentPlayer, winningCells: row };
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
                return { hasSomeoneWon: true, winner: currentPlayer, winningCells: column };
            }
        }

        // Check the diagonals

        // Top left to bottom right
        let firstDiagonal = [];
        for (let i = 0; i < board.length; i++) {
            firstDiagonal.push({ value: board[i][i], id: `${i}-${i}` });
        }

        if (areAllElementsEqual(firstDiagonal)) {
            return { hasSomeoneWon: true, winner: currentPlayer, winningCells: firstDiagonal };
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
            return { hasSomeoneWon: true, winner: currentPlayer, winningCells: secondDiagonal };
        }

        return { hasSomeoneWon: false };
    }

    /**
     * Ends the game after someone wins
     * @param {HTMLElement} $boardElement the root board element
     * @param {Object} winState contains information about who won and which cells to highlight
     */
    function endGame($boardElement, winState) {
        $boardElement.classList.add('game-finished');

        const $infoContainer = document.getElementById('game__info');
        const $infoTextContainer = document.createElement('div');
        $infoTextContainer.appendChild(
            document.createTextNode(`PLAYER ${winState.winner} HAS WON`)
        );
        $infoContainer.appendChild($infoTextContainer);

        const $playAgainBtn = document.createElement('button');
        $playAgainBtn.addEventListener('click', () => resetGame($boardElement));
        $playAgainBtn.appendChild(document.createTextNode('PLAY AGAIN'));
        $infoContainer.appendChild($playAgainBtn);

        for (let c of winState.winningCells) {
            let $cellElement = document.getElementById(`cell-${c.id}`);
            $cellElement.classList.add('board__cell--winning');
        }
    }

    /**
     * Resets the game and renders a new board
     * @param {HTMLElement} $boardElement the root board element
     */
    function resetGame($boardElement) {
        document.getElementById('game__info').remove();
        $boardElement.remove();
        renderBoard(createBoard(SIZE, SIZE), 1);
    }

    window.addEventListener('DOMContentLoaded', () => renderBoard(board, currentPlayer));
})(createBoard(SIZE, SIZE), 1);
