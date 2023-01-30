/**
 * Generates a random rgb color triplet
 * @returns an object with separate keys for the red, green and blue value of the generated color
 */
function randomColor() {
    let color = { r: 0, g: 0, b: 0 };
    let max = 255;
    for (let k in color) {
        color[k] = Math.floor(Math.random() * max + 1);
    }
    return color;
}

/**
 * Generates N boxes inside a given container
 * @param {*} container the container element to which the boxes are appended
 * @param {*} n the number of the boxes to generate
 */
function generateBoxes(container, n) {
    for (let i = 0; i < n; i++) {
        const box = document.createElement('div');
        box.setAttribute('class', `box box--${i}`);

        let c = randomColor();
        box.style.backgroundColor = `rgb(${c.r}, ${c.g}, ${c.b})`;

        container.appendChild(box);
    }
}

/**
 * Sets or removes the CSS class necessary to display the n boxes
 * @param {*} container The container element which contains the boxes
 * @param {*} n The number of boxes to display
 */
function displayBoxes(container, n) {
    for (let i = 0; i < container.childNodes.length; i++) {
        const box = container.querySelector(`.box--${i}`);
        if (i < n) {
            box.classList.add('box--visible');
        } else {
            box.classList.remove('box--visible');
        }
    }
}


/**
 * Initialize the slider and the boxes
 */
const slider = document.getElementById('slider');
const box_container = document.querySelector('.slide__boxes');

(function init(slider, container) {
    const box_count = slider.getAttribute('max');

    generateBoxes(container, box_count);
    displayBoxes(container, slider.value);

    slider.addEventListener('input', (s) => displayBoxes(container, s.target.value));
})(slider, box_container);
