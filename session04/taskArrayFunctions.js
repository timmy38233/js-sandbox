let exampleArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4];
console.log(exampleArray);
/**
 * Task1: Sum
 */
function sumOfArr(arr) {
    return arr.reduce((acc, curr) => acc + curr, 0);
}
console.log('Sum: ' + sumOfArr(exampleArray));

/**
 * Task2: Largest
 */
function largestNum(arr) {
    let max = -Infinity;
    for (num of arr) {
        if (num > max) {
            max = num;
        }
    }
    return max;
}
console.log('Largest: ' + largestNum(exampleArray));

/**
 * Task3: Smallest
 */
function smallestNum(arr) {
    let min = Infinity;
    for (num of arr) {
        if (num < min) {
            min = num;
        }
    }
    return min;
}
console.log('Smallest: ' + smallestNum(exampleArray));

/**
 * Task4: Average
 */
function average(arr) {
    return arr.reduce((acc, curr) => acc + curr, 0) / arr.length;
}

console.log('Average: ' + average(exampleArray));

/**
 * Task5: Only Even
 */

function onlyEven(arr) {
    let even = [];
    for (num of arr) {
        if (num % 2 === 0) {
            even.push(num);
        }
    }
    return even;
}
console.log('Even Numbers: ' + onlyEven(exampleArray));

/**
 * Task6: Only Odd
 */

function onlyOdd(arr) {
    let odd = [];
    for (num of arr) {
        if (num % 2 !== 0) {
            odd.push(num);
        }
    }
    return odd;
}
console.log('Odd Numbers: ' + onlyOdd(exampleArray));

/**
 * Task7: Search
 */
function searchForNum(needle, haystack) {
    let found = false;
    let i;
    for (i = 0; i < haystack.length && !found; i++) {
        found = haystack[i] === needle;
    }
    return found ? i - 1 : -1;
}

let searchNum = 5;
console.log(`Position of element ${searchNum} is ${searchForNum(searchNum, exampleArray)}`);

/**
 * Task8: Reverse Search
 */

function searchForNumReverse(needle, haystack) {
    let found = false;
    let i;
    for (i = haystack.length; i >= 0 && !found; i--) {
        found = haystack[i - 1] === needle;
    }
    return found ? i : -1;
}

let searchNumRev = 5;

console.log(
    `Position of element ${searchNumRev} from reverse is ${searchForNumReverse(
        searchNumRev,
        exampleArray
    )}`
);

/**
 * Task9: Sort
 * BubbleSort
 */

function sortArr(arr) {
    for (let i = 0; i < arr.length; i++) {

        for (let j = 0; j < arr.length - i - 1; j++) {

            if (arr[j] > arr[j + 1]) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }

        }
    }

    return arr;
}

console.log('Sorted: ' + sortArr(exampleArray));

/**
 * Task9: ReverseSort
 * BubbleSort
 */

function sortArrReverse(arr) {
    for (let i = 0; i < arr.length; i++) {

        for (let j = 0; j < arr.length - i - 1; j++) {

            if (arr[j] < arr[j + 1]) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }

        }
    }

    return arr;
}

console.log('Sorted Reverse: ' + sortArrReverse(exampleArray));