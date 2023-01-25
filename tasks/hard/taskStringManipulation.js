// Duplicates
console.log("\n*** DUPLICATES ***");
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

console.log("\n*** REPLACEMENTS ***");
// Replacements
{
    let string = 'abcdeffghijjklmnooppqrstauvwxyzabbaa';
    let search = 'a';
    let replace = 'X';

    let newstring = '';
    for (let i = 0; i < string.length; i++) {
        newstring += (string.charAt(i) == search ? replace : string.charAt(i));
    }
    string = newstring;

    console.log(string);
}