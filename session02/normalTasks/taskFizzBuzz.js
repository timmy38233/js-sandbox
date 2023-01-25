let n = 30;

for (let i = 1; i <= n; i++) {
  let output = '';
  let divByThree = i % 3 === 0;
  let divByFive = i % 5 === 0;

  if (divByThree) {
    output += 'Fizz';
  }
  if (divByFive) {
    output += 'Buzz';
  }
  if (!divByThree && !divByFive) {
    output += i;
  }
  
  console.log(output);
}
