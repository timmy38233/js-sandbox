window.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector('form');
    const todoListContainer = document.getElementById('todo-list');
    const textInput = document.getElementById('todo-text-input');
    const dateInput = document.getElementById('todo-date-input');
    const prioInput = document.getElementById('todo-prio-input');

    let sortState = 0;
    const sortBtn = document.getElementById('sort-btn');
    const sortIndicator = document.getElementById('sort-indicator');

    /**
     * basic structure:
     * [
     *  {text,
     *   date,
     *   prio, 
     *  },
     *  ...
     * ]
     */
    let todoItems = [];

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addItem(todoListContainer, todoItems, textInput.value, dateInput.value, prioInput.value);
        
        textInput.value = '';
        dateInput.value = '';
        prioInput.value = 1;

        textInput.focus();
    });

    sortBtn.addEventListener('click', () => {
        sortItems(todoListContainer, todoItems, 'prio', sortState, sortIndicator);
        sortState = ++sortState % 2;
    });
});

/**
 * Generates a unique id for a todo list element
 * @param {HTMLElement} container 
 * @param {Array} todoItems 
 * @param {number} itemIndex 
 * @returns string of new id
 */
function generateID(container, todoItems, itemIndex) {
    return `${container.getAttribute('id')}-todoitem-${itemIndex}-${todoItems[itemIndex].text
        .replaceAll(' ', '-')
        .replaceAll('"', '')
        .replaceAll("'", '')}`;
}

/**
 * Sorts the todoItems list with regard to the current sort state 
 * @param {HTMLElement} container 
 * @param {Array} todoItems 
 * @param {String} key 
 * @param {number} sortState 0 -> ascending, 1 -> descending
 * @param {HTMLElement} sortIndicator 
 */
function sortItems(container, todoItems, key, sortState, sortIndicator) {
    const sortingFunctions = [
        (a, b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0),
        (a, b) => (a[key] < b[key] ? 1 : a[key] > b[key] ? -1 : 0),
    ];

    const arrows = ['↑', '↓'];
    sortIndicator.innerText = arrows[sortState];

    todoItems.sort(sortingFunctions[sortState]);

    displayItems(container, todoItems);
}

/**
 * Generates the elements to display the items inside the given container
 * @param {HTMLElement} container 
 * @param {Array} todoItems 
 */
function displayItems(container, todoItems) {
    container.querySelectorAll('.todoitem').forEach((i) => i.remove());

    // array is used to convert prio-digits to text, so that the appropriate css class can be set
    const priorities = ['low', 'normal', 'high'];

    for (let index in todoItems) {
        const prioText = priorities[todoItems[index].prio];

        const listItem = document.createElement('li');
        listItem.setAttribute('class', `todoitem todoitem--prio-${prioText}`);
        listItem.setAttribute('id', generateID(container, todoItems, index));

        const deleteButton = createItemComponent('span', 'todoitem__delete-btn', '✓');
        deleteButton.addEventListener('click', () => deleteItem(container, todoItems, index));

        listItem.appendChild(deleteButton);

        listItem.appendChild(createItemComponent('span', 'todoitem__title', todoItems[index].text));
        listItem.appendChild(createItemComponent('span', 'todoitem__duedate', todoItems[index].date));
        listItem.appendChild(createItemComponent('span', 'todoitem__prio', prioText));

        container.appendChild(listItem);
    }
}

/**
 * Creates an HTMLElement with given classes and a given innerText
 * @param {String} type 
 * @param {String} classes 
 * @param {String} content 
 * @returns 
 */
function createItemComponent(type, classes, content) {
    const component = document.createElement(type);
    component.setAttribute('class', classes);
    component.innerText = content;
    return component;
}


/**
 * Adds a new item to the todoItems array and displays the updated array afterwards
 * @param {HTMLElement} container 
 * @param {Array} todoItems 
 * @param {String} itemText 
 * @param {String} itemDueDate 
 * @param {Number} itemPrio 
 */
function addItem(container, todoItems, itemText, itemDueDate, itemPrio) {
    todoItems.push({
        text: itemText,
        date: itemDueDate,
        prio: itemPrio,
    });
    displayItems(container, todoItems);
}


/**
 * Removes an element from the todoItems array.
 * Creates a fade out animation and delays the actual array removal.
 * @param {HTMLElement} container 
 * @param {Array} todoItems 
 * @param {Number} index 
 */
function deleteItem(container, todoItems, index) {
    let elem = document.getElementById(generateID(container, todoItems, index));
    elem.style.opacity = 0;
    elem.style.setProperty('transform', 'translateX(-25px)');

    setTimeout(() => {
        todoItems.splice(index, 1);
        displayItems(container, todoItems);
    }, 500);
}
