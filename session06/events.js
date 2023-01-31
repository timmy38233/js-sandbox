window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const todoListContainer = document.getElementById('todo-list');
    const textInput = document.getElementById('todo-text-input');
    const dateInput = document.getElementById('todo-date-input');
    const prioInput = document.getElementById('todo-prio-input');
    let sortState = 0;
    const sortBtn = document.getElementById('sort-btn');
    const sortIndicator = document.getElementById('sort-indicator');

    let todoItems = [];

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addItem(todoListContainer, todoItems, textInput.value, dateInput.value, prioInput.value);
        textInput.value = '';
    });

    sortBtn.addEventListener('click', () => {

        sortItems(todoListContainer, todoItems, 'prio', sortState, sortIndicator);
        sortState = ++sortState % 2;
    });
});

function generateID(container, todoItems, item) {
    return `${container.getAttribute('id')}-todoitem-${item}-${todoItems[item].text
        .replaceAll(' ', '-')
        .replaceAll('"', '')
        .replaceAll("'", '')}`;
}

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

function displayItems(container, todoItems) {
    container.querySelectorAll('.todoitem').forEach((i) => i.remove());

    const priorities = ['low', 'normal', 'high'];

    for (let index in todoItems) {
        const prioText = priorities[todoItems[index].prio];

        const listItem = document.createElement('li');
        listItem.setAttribute('class', `todoitem todoitem--prio-${prioText}`);
        listItem.setAttribute('id', generateID(container, todoItems, index));

        const deleteButton = createItemComponent('span', 'todoitem__delete-btn', '✓');
        deleteButton.addEventListener('click', () => deleteItem(container, todoItems, index));

        listItem.appendChild(deleteButton);

        const title = createItemComponent('span', 'todoitem__title', todoItems[index].text);
        const dueDate = createItemComponent('span', 'todoitem__duedate', todoItems[index].date);
        const prio = createItemComponent('span', 'todoitem__prio', prioText);
        listItem.appendChild(title);
        listItem.appendChild(dueDate);
        listItem.appendChild(prio);

        container.appendChild(listItem);
    }
}

function createItemComponent(type, classes, content) {
    const component = document.createElement(type);
    component.setAttribute('class', classes);
    component.innerText = content;
    return component;
}

function addItem(container, todoItems, itemText, itemDueDate, itemPrio) {
    todoItems.push({
        text: itemText,
        date: itemDueDate,
        prio: itemPrio,
    });
    displayItems(container, todoItems);
}

function deleteItem(container, todoItems, index) {
    let elem = document.getElementById(generateID(container, todoItems, index));
    elem.style.opacity = 0;
    elem.style.setProperty('transform', 'translateX(-25px)');

    setTimeout(() => {
        todoItems.splice(index, 1);
        displayItems(container, todoItems);
    }, 500);
}
