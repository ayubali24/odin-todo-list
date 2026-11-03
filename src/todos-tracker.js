import { displayToDoItems } from "./updateDisplay.js";

export const todos = [];

class toDo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
};

function addToDoToList(title, description, dueDate, priority) {
    const toDoItem = new toDo(title, description, dueDate, priority);
    toDoItem.id = crypto.randomUUID();
    todos.push(toDoItem);
}

const form = document.querySelector(".form-container");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const entries = Object.fromEntries(data.entries());
    console.log('hey entries', entries);
    addToDoToList(entries.title, entries.description, entries.date, entries.priority);
    displayToDoItems();
})

export function removeObjectWithId(arr, id) {
    const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
    if (objWithIdIndex !== -1) {
        arr.splice(objWithIdIndex, 1);
    }
}
