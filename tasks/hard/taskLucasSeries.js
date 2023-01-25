let n = 5;

let last = 2;
let current = 1;

for (let i = 0; i < n - 2; i++) {
    next = last + current;
    last = current;
    current = next;
}

let output = current;
let suffix = 'th';
switch (n) {
    case 1:
        output = 2;
        suffix = 'st';
        break;
    case 2:
        output = 1;
        suffix = 'nd';
        break;
    case 3:
        suffix = 'rd';
        break;
}
console.log(`The ${n+ suffix} lucas number is ${output}`);
