let n = 15;
let p = 2;

for (let i = 0; i < n; i++) {
    console.log(p);

    let c = p;

    // Main loop that breaks when a prime is found
    let stillSearching = true;
    while (stillSearching) {
        c++;

        /* Inner loop that checks if the current candidate (c) is divisible by other numbers before
        it (only needs to check half the numbers because of commutative property of multiplication) */
        let j = 2;
        while (j < parseInt(c / 2) && c % j != 0) {
            j++;
        }

        // Check if the preceding while loop exited early because of finding a divisor
        stillSearching = !(c % j != 0);
    }

    // Set the candidate as the new found prime
    p = c;
}
