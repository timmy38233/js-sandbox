console.log('\n*** 1st task ***');
{
    for (let i = 1; i <= 10; i++) {
        console.log(i);
    }
}

console.log('\n*** 2nd task ***');
{
    let i = 10;
    while (i > 0) {
        console.log(i);
        i--;
    }
}

console.log('\n*** 3rd task ***');
{
    let n = 10;
    for (let i = 0; i < n * 2; i += 2) {
        console.log(i);
    }
}

console.log('\n*** 4th task ***');
{
    let sum = 0;
    let i = 1;
    while (i <= 100) {
        sum += i;
        i++;
    }
    console.log(sum);
}

console.log('\n*** 5th task ***');
{
    let n = 10;
    for (let i = 1; i < n * 2; i += 2) {
        console.log(i);
    }
}

console.log('\n*** 6th task ***');
{
    let n = 10;

    let last = 1;
    let current = 1;
    if (n >= 1) {
        console.log(last);
    }
    for (let i = 2; i <= n; i++) {
        console.log(current);

        next = last + current;
        last = current;
        current = next;
    }
}

console.log('\n*** 7th task ***');
{
    let n = 10;
    let primes = '2 3 5 7 11 13 17 19 23 29 31 37 41 43';

    let i = 0;
    let counter = 0;
    while (counter < n && i < primes.length) {
        let output = '';

        let j = 0;
        while (primes.charAt(i + j) != ' ') {
            output += primes.charAt(i + j);
            j++;
        }

        // Skip over the space
        i += j + 1;

        counter++;
        console.log(output);
    }
}

console.log('\n*** 8th task ***');
{
    let n = 10;
    console.log(`The factorial of ${n} is:`);

    let fact = 1;
    while (n > 0) {
        fact *= n;
        n--;
    }

    console.log(fact);
}
