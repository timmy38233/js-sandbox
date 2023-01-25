let n = 10;

let sum = 0;

// for-loop approach
for (let i = 1; i <= n; i++) {
    sum += i * i;
}

// simple formula approach
sum = (n * (n + 1) * ((2 * n) + 1)) / 6;

console.log(`The sum of the squares of the first ${n} natural numbers is ${sum}`);
