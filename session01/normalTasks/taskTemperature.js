const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const units = ['C', 'F']

readline.question('Input temperature: ', inputTemperature => {
    readline.question('Input unit [C or F]: ', inputUnit => {
        let result = 0;
        if (inputUnit.toUpperCase() === 'C') {
            result = (parseFloat(inputTemperature) * (9 / 5) + 32);
        } else if (inputUnit.toUpperCase() === 'F') {
            result = (parseFloat(inputTemperature) - 32) * (5 / 9);
        }

        console.log(`${inputTemperature}°${inputUnit} equals ${result.toFixed(2)}°${units[(units.indexOf(inputUnit) + 1) % 2]}`);

        readline.close();
    });
});