/**
 * ----------------------------------------------------------------------------
 * 1st Task
 */
function sum(a, b) {
    return a + b;
}

let sumA = 3;
let sumB = 4;

console.log(`The sum of ${sumA} and ${sumB} is ${sum(sumA, sumB)}`);
// Basically is the same as: console.log('The sum of ' + sumA + ' and ' + sumB + ' is ' + sum(sumA, sumB));

/**
 * ----------------------------------------------------------------------------
 * 2nd Task
 */
function countVowels(string) {
    let vowels = 'aeiouäöü';

    let counter = 0;
    for (let i = 0; i < string.length; i++) {
        let c = string.charAt(i);

        for (let j = 0; j < vowels.length; j++) {
            if (c.toLowerCase() === vowels.charAt(j)) {
                counter++;
                break;
            }
        }
    }

    return counter;
}

let vowelString = 'Happy Coding';
console.log(`The string '${vowelString}' contains ${countVowels(vowelString)} vowels`);

/**
 * ----------------------------------------------------------------------------
 * 3rd Task
 */
function toPowerOfThree(num) {
    return num ** 3;
}

let numPowered = 3;
console.log(
    `The number ${numPowered} raised to the power of three is ${toPowerOfThree(numPowered)}`
);

/**
 * ----------------------------------------------------------------------------
 * 4th Task
 */
function isEven(num) {
    return num % 2 == 0;
}

let numEvenOrOdd = 3;
console.log(`The number ${numEvenOrOdd} is even: ${isEven(numEvenOrOdd)}`);

/**
 * ----------------------------------------------------------------------------
 * 5th Task
 */
function reverseString(string) {
    let reversed = '';

    for (let i = string.length; i >= 0; i--) {
        reversed += string.charAt(i - 1);
    }

    return reversed;
}

let stringToReverse = 'abcdefgh';
console.log(`The string '${stringToReverse}' reversed is '${reverseString(stringToReverse)}'`);

/**
 * ----------------------------------------------------------------------------
 * 6th Task
 */
function multiply(a, b) {
    let result = 0;

    for (i = 0; i < b; i++) {
        result += a;
    }
    return result;
}

let multA = 5;
let multB = 9;
console.log(`${multA} * ${multB} = ${multiply(multA, multB)}`);

/**
 * ----------------------------------------------------------------------------
 * 7th Task
 */
function sumToN(n) {
    let result = 0;
    for (let i = 1; i <= n; i++) {
        result += i;
    }

    return result;
}

let sumN = 10;
console.log(`The sum of all natural numbers from 1 to ${sumN} is ${sumToN(sumN)}`);

/**
 * ----------------------------------------------------------------------------
 * 8th Task
 */
function squareRoot(x) {
    return Math.sqrt(x);
}

let squareRootX = 49;
console.log(`The square root of ${squareRootX} is ${squareRoot(squareRootX)}`);

/**
 * ----------------------------------------------------------------------------
 * 9th Task
 */
function isPalindrome(string) {
    let isPalindrome = true;

    for (let i = 0; i < string.length / 2 && isPalindrome; i++) {
        isPalindrome = string.charAt(i) == string.charAt(string.length - i - 1);
    }

    return isPalindrome;
}

let palindromeString = 'aaabcbaaa';
console.log(`The string ${palindromeString} is a palindrome: ${isPalindrome(palindromeString)}`);

/**
 * ----------------------------------------------------------------------------
 * 10th Task
 */
function factorial(n) {
    let result = 1;

    for (let i = 1; i <= n; i++) {
        result *= i;
    }

    return result;
}
let factN = 10;
console.log(`The factorial of ${factN} is ${factorial(factN)}`);

/**
 * ----------------------------------------------------------------------------
 * 11th Task
 */
function fib(n) {
    if (n <= 2) {
        return 1;
    }
    return fib(n - 2) + fib(n - 1);
}

let calcFib = 8;
console.log(`Fibonacci(${calcFib}) = ${fib(calcFib)}`);

/**
 * ----------------------------------------------------------------------------
 * 12th Task
 */
function factorialRecursion(n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorialRecursion(n - 1);
}

let calcFactRec = 5;
console.log(`The factorial of ${calcFactRec} is ${factorialRecursion(calcFactRec)}`);

// factorialRecursion(5) -> return 5 * factorialRecursion(4)
//                                     -> return 4 * factorialRecursion(3)
//                                                 -> return 3 * factorialRecursion(2)
//                                                             -> return 2 * factorialRecursion(1)
//                                                                         -> return 1
//                                                             return 2 * 1
//                                                     return 3 * 2 * 1
//                                         return 4 * 3 * 2 * 1
//                         return 5 * 4 * 3 * 2 * 1

/**
 * ----------------------------------------------------------------------------
 * 13th Task
 */
function first(n, func) {
    return func(n * 2);
}

function second(argument) {
    return 'Second function called with the argument: ' + argument;
}

console.log(first(5, second));

/**
 * ----------------------------------------------------------------------------
 * 1st Hard Task
 */
function factorialRecursionHard(n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorialRecursionHard(n - 1);
}

function countTrailingZeroes(n, counter = 0) {
    if (n % 10 !== 0) {
        return counter;
    }
    return countTrailingZeroes(n / 10, counter + 1);
}

// countTrailingZeroes(15000, 0) -> countTrailingZeroes(15000, 0) 
//                                  -> countTrailingZeroes(1500, 1)
//                                     -> countTrailingZeroes(150, 2)
//                                        -> countTrailingZeroes(15, 3)
//                                        <- 3
//                                     <- 3
//                                  <- 3
//                               <- 3


function trailingZeroesInFactorial(n) {
    let fact = factorialRecursionHard(n);
    return countTrailingZeroes(fact);
}

let trailingZeroesN = 20;
console.log(
    `The factorial of ${trailingZeroesN} is ${factorialRecursionHard(
        trailingZeroesN
    )} and has ${trailingZeroesInFactorial(trailingZeroesN)} trailing zeroes`
);

/**
 * ----------------------------------------------------------------------------
 * 2nd Hard Task
 */
function raiseToPower(n, e) {
    if (e === 0) {
        return 1;
    }
    return n * raiseToPower(n, e - 1);
}

let base = 3;
let exponent = 4;
console.log(`${base}^${exponent} = ${raiseToPower(base, exponent)}`);

/**
 * ----------------------------------------------------------------------------
 * 3rd Hard Task
 */
function squareAndCallCB(n, cb) {
    return cb(n ** 2);
}

function callbackIsEven(param) {
    return ((innerParam) => innerParam % 2 === 0)(param);
}

let cbNum = 7;
console.log(`Output for number ${cbNum}:  ${squareAndCallCB(cbNum, callbackIsEven)}`);

/**
 * ----------------------------------------------------------------------------
 * 4th Hard Task
 */
function reverseAndCallCB(string, cb) {
    return cb(
        ((s) => {
            let r = '';
            for (i in s) r = s.charAt(i) + r; // Not pretty but short
            return r;
        })(string)
    );
}

function callbackCountVowels(string) {
    return (function (s) {
        let vowels = 'aeiouäöü';
        let counter = 0;
        for (i in s) counter += vowels.includes(s.charAt(i).toLowerCase()); // A bit hacky because we add booleans to numbers [true = 1, false = 0]
        return counter;
    })(string);
}

let cbString = 'abcdefghijklmnop';
console.log(`Output for string '${cbString}': ${reverseAndCallCB(cbString, callbackCountVowels)}`);