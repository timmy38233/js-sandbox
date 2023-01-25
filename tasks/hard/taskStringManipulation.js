
console.log('\n*** DUPLICATES ***');
{
    let string = 'abcdeffghijjklmnooppqrstauvwxyzabbaa';

    // Loop backwards to compensate for character deletion
    for (let i = string.length - 1; i >= 0; ) {
        let c = string.charAt(i);
        let counter = 1;
        let newstring = '';

        // Iterate over the string and check for duplicates. Create a new string without the current character
        for (let j = 0; j < i; j++) {
            if (string.charAt(j) === c) {
                counter++;
            } else {
                newstring += string.charAt(j);
            }
        }

        if (counter > 1) {
            console.log(`'${c}' occured ${counter} times`);
        }

        // Newstring has all characters from variable c removed
        string = newstring;
        // Account for now shortened string
        i -= counter;
    }
}

console.log('\n*** REPLACEMENTS ***');
{
    let string = 'abcdeffghijjklmnooppqrstauvwxyzabbaa';
    let search = 'a';
    let replace = 'X';

    let newstring = '';
    for (let i = 0; i < string.length; i++) {
        newstring += string.charAt(i) == search ? replace : string.charAt(i);
    }
    string = newstring;

    console.log(string);
}

console.log('\n*** VOWELS ***');
{
    let string = 'abcdeffghijjklmnooppqrstauvwxyzabbaa';

    let vowels = 'aeiouüöä';
    let newstring = '';

    for (let i = 0; i < string.length; i++) {
        let c = string.charAt(i);
        let isVowel = false;

        for (let j = 0; j < vowels.length && !isVowel; j++) {
            isVowel = vowels.charAt(j) == c;
        }
        newstring += isVowel ? '' : string.charAt(i);
    }
    string = newstring;

    console.log(string);
}

console.log('\n*** PANGRAM ***');
{
    let string = 'abcdeffghijjklmnooppqrstauvwxyzabbaa'

    let alphabet = 'abcdefghijklmnopqrstuvwxyz';

    let isPangram = true;
    // Outer loop iterates over the alphabet
    for (let i = 0; i < alphabet.length && isPangram; i++) {
        let containsLetter = false;
        // Inner loop until it finds a matching letter
        for (let j = 0; j < string.length && !containsLetter; j++) {
            containsLetter = alphabet.charAt(i) == string.charAt(j).toLowerCase();
        }

        // If the inner loop did not find the letter, the string is not a pangram and therefore the outer loop exits early
        isPangram = containsLetter;
    }

    console.log(`The string '${string}' is${isPangram ? ' ' : ' not '}a pangram`);
}