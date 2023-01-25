let numberA = 555;
let numberB = 345;

let internalA, internalB;
for (let remainder = numberA % numberB; remainder != 0; remainder = internalA % internalB) {
    internalA = numberB;
    internalB = remainder;
}

console.log(`The GCD for the numbers ${numberA} and ${numberB} is ${internalB}`);