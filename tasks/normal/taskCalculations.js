const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Input first number: ', inputA => {

    readline.question('Input second number: ', inputB => {

        readline.question('Input operation [+, -, * or /]: ', inputOperation => {
 
            console.log(`Expression: ${inputA} ${inputOperation} ${inputB}`);
            
            let numberA = parseFloat(inputA);
            let numberB = parseFloat(inputB);

            let operations = {
                '+': (a, b) => {return a + b},
                '-': (a, b) => {return a - b},
                '*': (a, b) => {return a * b},
                '/': (a, b) => {return a / b}
            };

            if (isNaN(numberA) || isNaN(numberB) || !(inputOperation in operations)) {
                console.log('Expression invalid, please try again');
                process.exit(1);
            }

            result = operations[inputOperation](numberA, numberB);

            console.log(`Result: ${result}`);

            readline.close();
        });
    });
});