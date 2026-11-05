import { displayToDoItems } from "./updateDisplay.js";
import { projects } from "./projectsTracker.js";
import { groupToDosByProject } from "./projectsTracker.js";

export const todos = [];

class toDo {
    constructor(title, description, dueDate, priority, project) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
    }
};

function addToDoToList(title, description, dueDate, priority, project) {
    const toDoItem = new toDo(title, description, dueDate, priority, project);
    toDoItem.id = crypto.randomUUID();
    todos.push(toDoItem);
}

const form = document.querySelector(".form-container");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const entries = Object.fromEntries(data.entries());
    const objWithIdIndex = projects.findIndex((obj) => obj.id === entries["project-list"]);

    console.log('hey entries', objWithIdIndex);
    addToDoToList(entries.title, entries.description, entries.date, entries.priority, projects[objWithIdIndex].name);
    displayToDoItems();
    groupToDosByProject(projects);
    console.log(projects);

})

export function removeObjectWithId(arr, id) {
    const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
    if (objWithIdIndex !== -1) {
        arr.splice(objWithIdIndex, 1);
    }
}

