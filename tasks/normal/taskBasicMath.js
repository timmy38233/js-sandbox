const PI = Math.PI

// Cylinder
let rCylinder = 8;
let hCylinder = 9;

let vCylinder = hCylinder * PI * rCylinder ** 2;

console.log(`The volume of a cylinder with a radius of ${rCylinder} and a height of ${hCylinder} is ${vCylinder.toFixed(2)}`);


// Sphere
let rSphere = 8

let vSphere = (4 / 3) * PI * rSphere ** 3;

console.log(`The volume of a sphere with a radius of ${rSphere} is ${vSphere.toFixed(2)}`);


// Point Distance
let x1 = 2;
let y1 = 3;

let x2 = 4;
let y2 = 5;

let dPoints = ((x1 - x2) ** 2 + (y2 - y1) ** 2) ** (1 / 2);

console.log(`The distance between the two points (${x1}, ${y1}) and (${x2}, ${y2}) is ${dPoints.toFixed(2)}`);