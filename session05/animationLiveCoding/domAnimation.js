
const ROWS = 10;
const COLS = 10;

for (let i = 0; i < ROWS; i++) {
    const row = document.createElement('div');
    row.setAttribute('class', 'row');
    document.body.appendChild(row);
    for (let j = 0; j < COLS; j++) {
        const box = document.createElement('div');
        box.setAttribute('class', 'box');
        box.setAttribute('id', `box-${i}-${j}`);
        
        box.style.animationDelay = 0.1 * (i+j) + 's';
        row.appendChild(box);
    }
}