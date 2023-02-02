(function initGame(WORDS, querySelector) {
    /**
     *
     * @param {Array} words
     * @returns String
     */
    function chooseRandomWord(words) {
        /*
            Builds a new array to choose from, that only contains element with at least one duplicate letter
        */
        const wordsWithDuplicateLetters = words.filter((e) =>
            Array.from(e)
                .map((c) => e.indexOf(c) != e.lastIndexOf(c))
                .includes(true)
        );

        return wordsWithDuplicateLetters[
            Math.floor(Math.random() * wordsWithDuplicateLetters.length)
        ];
    }

    /**
     * Generates the DOM and initializes the gameState-object's properties
     * @param {HTMLElement} $rootElement
     * @param {Object} gameState
     */
    function renderPlayingField($rootElement, gameState) {
        console.log(gameState.wordToGuess);

        gameState.lettersGuessed = [];
        gameState.livesLeft = 6;
        gameState.playingState = 'playing';

        // Build DOM structure
        const $hangmanWrapper = document.createElement('div');
        $hangmanWrapper.classList.add('hangman');

        const $hangmanTitle = document.createElement('h1');
        $hangmanTitle.classList.add('hangman__title');
        $hangmanTitle.appendChild(document.createTextNode('HANGMAN'));
        $hangmanWrapper.appendChild($hangmanTitle);

        const $hangmanForm = document.createElement('form');
        $hangmanForm.setAttribute('action', '');

        const $hangmanFormInput = document.createElement('input');
        $hangmanFormInput.setAttribute('type', 'text');
        $hangmanFormInput.setAttribute('maxlength', 1);
        $hangmanFormInput.setAttribute('pattern', '[A-Za-z]');
        $hangmanFormInput.classList.add('hangman__input');
        $hangmanForm.appendChild($hangmanFormInput);

        $hangmanWrapper.appendChild($hangmanForm);

        const $hangmanAnswerWrapper = document.createElement('div');
        $hangmanAnswerWrapper.classList.add('hangman__word');

        for (let i in gameState.wordToGuess) {
            const $hangmanAnswerLetter = document.createElement('div');
            $hangmanAnswerLetter.classList.add('hangman__letter', `hangman__letter--index${i}`);
            $hangmanAnswerWrapper.appendChild($hangmanAnswerLetter);
        }
        $hangmanWrapper.appendChild($hangmanAnswerWrapper);

        const $hangmanGuessedLetterWrapper = document.createElement('div');
        $hangmanGuessedLetterWrapper.classList.add('hangman__guessedLetters');
        $hangmanWrapper.appendChild($hangmanGuessedLetterWrapper);

        const $hangmanLivesLeftCounter = document.createElement('div');
        $hangmanLivesLeftCounter.classList.add('hangman__livesLeft');
        $hangmanLivesLeftCounter.appendChild(document.createTextNode(gameState.livesLeft));
        $hangmanWrapper.appendChild($hangmanLivesLeftCounter);

        const $hangmanResultWrapper = document.createElement('div');
        $hangmanResultWrapper.classList.add('hangman__result');

        $hangmanWrapper.appendChild($hangmanResultWrapper);

        $rootElement.appendChild($hangmanWrapper);

        // Assign event listener and forcing focus on input
        $hangmanFormInput.addEventListener('input', () =>
            processInput(gameState, $hangmanFormInput.value)
        );

        $hangmanFormInput.addEventListener('blur', () =>
            setTimeout(() => $hangmanFormInput.focus(), 10)
        );
        $hangmanFormInput.focus();

        document.body.addEventListener('click', () => $hangmanFormInput.focus());

        // Filling the gameState object manually since we are not using classes
        gameState.elements = {
            $root: $rootElement,
            $wrapper: $hangmanWrapper,
            $input: $hangmanFormInput,
            $answer: $hangmanAnswerWrapper,
            $guessed: $hangmanGuessedLetterWrapper,
            $counter: $hangmanLivesLeftCounter,
            $result: $hangmanResultWrapper,
        };
    }

    // Call the board rendering function after DOM is loaded
    window.addEventListener('DOMContentLoaded', () => {
        const $rootElement = document.querySelector(querySelector);
        renderPlayingField($rootElement, {
            wordToGuess: chooseRandomWord(WORDS),
        });
    });

    /**
     * Checks whether the game is
     * @param {Object} gameState
     * @returns
     */
    function processInput(gameState, letter) {
        // A bit hacky: Use the placeholder attribute to display the letter and clear the text-element for the next input
        gameState.elements.$input.setAttribute('placeholder', letter);
        gameState.elements.$input.value = '';

        // Check if game is still going on, the input is valid and it has not been played already
        if (
            gameState.playingState !== 'playing' ||
            isInputValid(letter) ||
            gameState.lettersGuessed.includes(letter)
        ) {
            return;
        }

        addGuess(gameState, letter);

        if (gameState.wordToGuess.includes(letter)) {
            revealLetter(gameState, letter);
        } else {
            loseLive(gameState);
        }

        if (isGameFinished(gameState)) {
            endGame(gameState);
        }
    }

    /**
     * Checks whether the input is a valid character from the english alphabet
     * @param {String} letter
     * @returns
     */
    function isInputValid(letter) {
        return !/[a-zA-Z]/g.test(letter);
    }
    /**
     * Adds a guess to the gameState and the board
     * @param {Object} gameState
     * @param {String} letter
     */
    function addGuess(gameState, letter) {
        gameState.lettersGuessed.push(letter);
        const $letter = document.createElement('span');
        $letter.appendChild(document.createTextNode(letter));
        gameState.elements.$guessed.appendChild($letter);
    }

    /**
     * Reveals a letter from the answer
     * @param {Object} gameState
     * @param {String} letter
     */
    function revealLetter(gameState, letter) {
        /*
            Returns an array that contains the indices of all occurences of the given letter in the wordToGuess string
            e.g. [2, 4] with the word 'surprise' and the letter 'r'
        */
        const indicesForLetter = Array.from(gameState.wordToGuess).reduce(
            (acc, curr, i) => (curr === letter ? [...acc, i] : acc),
            []
        );
        console.log(indicesForLetter);

        /*
            Takes the indices and builds a new array with the map function. Result: ['.hangman__letter--index2', .hangman__letter--index2']
            Then joins the array elements and separates them with a comma. Result: '.hangman__letter--index2, .hangman__letter--index2'
            Then uses that as the input for querySelectorAll and iterates over the found elements with the corresponding class
        */
        gameState.elements.$answer
            .querySelectorAll(indicesForLetter.map((i) => `.hangman__letter--index${i}`).join(', '))
            .forEach(($e) => {
                $e.appendChild(document.createTextNode(letter));
                $e.classList.add('hangman__letter--solved');
            });
    }

    /**
     * Substracts a live from the gameState and triggers an animation on the board
     * @param {Object} gameState
     */
    function loseLive(gameState) {
        // Remove a live and set the new counter text
        gameState.elements.$counter.innerText = --gameState.livesLeft;

        gameState.elements.$counter.classList.remove('animate');
        void gameState.elements.$counter.offsetWidth;
        gameState.elements.$counter.classList.add('animate');
    }

    /**
     * Check whether the game is either won or lost
     * @param {Object} gameState
     * @returns true if game has ended, false if game is still going
     */
    function isGameFinished(gameState) {
        /*
            Checks if every letter in the wordToGuess is already included in the lettersGuessed array. If so, the game is won.
        */
        if (
            Array.from(gameState.wordToGuess).reduce(
                (acc, curr) => acc && gameState.lettersGuessed.includes(curr),
                true
            )
        ) {
            gameState.playingState = 'won';
            console.log('won');
        }

        if (gameState.livesLeft == 0) {
            gameState.playingState = 'lost';
            console.log('lost');
        }

        return gameState.playingState !== 'playing';
    }

    /**
     * Disables the input and creates a result info text
     * @param {Object} gameState
     */
    function endGame(gameState) {
        gameState.elements.$wrapper.classList.add(
            'hangman__game-finished',
            `hangman__game-finished--${gameState.playingState}`
        );

        gameState.elements.$input.setAttribute('disabled', 'disabled');

        const $hangmanResultText = document.createElement('div');
        $hangmanResultText.classList.add('result__text');
        $hangmanResultText.appendChild(
            document.createTextNode(`You ${gameState.playingState.toUpperCase()}!`)
        );
        gameState.elements.$result.appendChild($hangmanResultText);

        const $hangmanReplayButton = document.createElement('button');
        $hangmanReplayButton.classList.add('result__playagain');
        $hangmanReplayButton.appendChild(document.createTextNode('PLAY AGAIN'));
        $hangmanReplayButton.addEventListener('click', (e) => {
            e.stopPropagation();
            resetGame(gameState);
        });

        gameState.elements.$result.appendChild($hangmanReplayButton);
    }

    /**
     * Resets the gameState and renders a new board
     * @param {Object} gameState
     */
    function resetGame(gameState) {
        gameState.elements.$wrapper.remove();
        renderPlayingField(gameState.elements.$root, {
            wordToGuess: chooseRandomWord(WORDS),
        });
    }
})(WORDS, '#appWrapper');
