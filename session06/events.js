window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const todoListContainer = document.getElementById('todo-list');
    const textInput = document.getElementById('todo-text-input');

    // Inline Variant without array

    // form.addEventListener('submit', (e) => {
    //     e.preventDefault();

    //     const textInput = document.getElementById('todo-text-input');

    //     const listItem = document.createElement('li');
    //     listItem.innerText = textInput.value;

    //     const deleteButton = document.createElement('button');
    //     deleteButton.setAttribute('class', 'delete__button');
    //     deleteButton.innerText = "🗑";

    //     deleteButton.addEventListener('click', clickEvent => {
    //         clickEvent.target.parentNode.remove();
    //     });

    //     listItem.appendChild(deleteButton);

    //     todoListContainer.appendChild(listItem);

    //     textInput.value = '';
    // });

    let todoItems = [];

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addItem(todoListContainer, todoItems, textInput.value);
        textInput.value = '';
    });
});

function generateID(container, todoItems, item) {
    return `${container.getAttribute('id')}-todoitem-${item}-${todoItems[item].replaceAll(' ', '-').replaceAll('"', '').replaceAll("'", '')}`;
}

function displayItems(container, todoItems) {
    container.querySelectorAll('.todoitem').forEach((i) => i.remove());

    for (let index in todoItems) {

        const listItem = document.createElement('li');
        listItem.innerText = todoItems[index];
        listItem.setAttribute('class', 'todoitem');
        listItem.setAttribute('id', generateID(container, todoItems, index));

        const deleteButton = document.createElement('button');
        deleteButton.setAttribute('class', 'delete__button');
        deleteButton.innerText = '🗑';

        deleteButton.addEventListener('click', () => deleteItem(container, todoItems, index));

        listItem.appendChild(deleteButton);

        container.appendChild(listItem);
    }
}

function addItem(container, todoItems, item) {
    todoItems.push(item);
    displayItems(container, todoItems);
}

function deleteItem(container, todoItems, index) {
    // todoItems.splice(index, 1);
    // displayItems(container, todoItems);

    let elem = document.getElementById(generateID(container, todoItems, index));
    elem.style.opacity = 0;
    elem.style.setProperty('transform', 'translateX(-25px)');

    setTimeout(() => {
        todoItems.splice(index, 1);
        displayItems(container, todoItems);
    }, 500);
}
