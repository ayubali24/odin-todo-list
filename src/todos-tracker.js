// responsibe

const todos = [];

class toDo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
};

function addToDoToList(title, description, dueDate, priority) {
    todos.push(new toDo(title, description, dueDate, priority));
}

const form = document.querySelector(".form-container");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const entries = Object.fromEntries(data.entries());
    addToDoToList(entries.title, entries.description, entries.dueDate, entries.priority)
    console.log("my new todos: ", todos)
})
