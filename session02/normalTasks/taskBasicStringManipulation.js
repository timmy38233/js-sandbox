console.log('\n*** Task1 ***');
{
    let string = 'abcdefg';

    for (let i = 0; i < string.length; i++) {
        console.log(string.charAt(i));
    }
}

console.log('\n*** Task2 ***');
{
    let string = 'abcdefg';

    for (let i = string.length; i > 0; i--) {
        // Substract 1 to compensate string.length
        console.log(string.charAt(i - 1));
    }
}

console.log('\n*** Task3 ***');
{
    let string = 'abcdefg';

    let reverse = '';

    for (let i = string.length; i > 0; i--) {
        // Substract 1 to compensate string.length
        reverse += string.charAt(i - 1);
    }
    console.log(reverse);
}

console.log('\n*** Task4 ***');
{
    let string = 'abcba';

    let isPalindrome = true;
    for (let i = 0; i < string.length / 2; i++) {
        isPalindrome = string.charAt(i) == string.charAt(string.length - (i + 1));
    }

    console.log(`The string '${string}' is a Palindrome: ${isPalindrome}`);
}

console.log('\n*** Task5 ***');
{
    let string = 'abcba';
    let character = 'b';

    let counter = 0;
    for (let i = 0; i < string.length; i++) {
        if (string.charAt(i) == character) {
            counter++;
        }
    }

    console.log(`The character ${character} appears ${counter} times in '${string}'`);
}

console.log('\n*** Task6 ***');
{
    let string = 'abcdefghijklmnop';
    let n = 3;

    let output = '';
    for (let i = 0; i < n; i++) {
        output += string.charAt(i);
    }

    console.log(output);
}

console.log('\n*** Task7 ***');
{
    let string = 'abcdefghijklmnop';
    let n = 3;

    let output = string;
    for (let i = 0; i < n; i++) {
        output += string;
    }

    console.log(output);
}

console.log('\n*** Task8 ***');
{
    let string = 'abcdefghijklmnop';
    let character = 'X';
    let position = 5;

    let newstring = '';
    for (let i = 0; i < string.length; i++) {
        if (i == position) {
            newstring += character;
        }
        newstring += string.charAt(i);
    }

    console.log(newstring);
}