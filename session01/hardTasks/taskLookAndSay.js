let n = 10;

let currentString = '1';

for (let i = 0; i < n; i++) {
    // Output here, so that the first element also gets outputted
    console.log(currentString);

    let nextString = '';

    // Main loop to iterate over the whole string
    for (let mainIterator = 0; mainIterator < currentString.length; mainIterator++) {
        let currentChar = currentString.charAt(mainIterator);

        let counter = 0;

        // Nested loop that only iterates starting from the current character from the main loop until it reaches a different character or the end of the string
        // Define countingIterator in outer scope to be able to add it to the mainIterator
        let countingIterator;
        for (
            countingIterator = 0;
            currentString.charAt(mainIterator + countingIterator) !== '' &&
            currentString.charAt(mainIterator + countingIterator) === currentChar;
            countingIterator++
        ) {
            if (currentString.charAt(mainIterator + countingIterator) == currentChar) {
                counter++;
            }
        }

        nextString += counter + currentChar;

        // Substract 1 from countingIterator because of for-loop logic
        mainIterator += countingIterator - 1;
    }

    currentString = nextString;
}
