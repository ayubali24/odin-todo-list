import { projects } from "./projectsTracker.js";
import { displayToDoItems, newDisplay } from "./updateDisplay.js";
import { getCurrentView } from "./updateDisplay.js";
import { updateProjectInLocalStorage } from "./localStorageTracker.js";

class toDo {
    constructor(title, description, dueDate, priority, project) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        // this.project = project;
        this.id = crypto.randomUUID();
    }
};

function addToDoToProject(title, description, dueDate, priority, project) {
    const toDoItem = new toDo(title, description, dueDate, priority);
    const respectiveProject = projects.find(item => item.id === project.id);
    respectiveProject.todos.push(toDoItem)
}

const newTaskFormContainer = document.querySelector(".new-task-form-container");

newTaskFormContainer.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const entries = Object.fromEntries(data.entries());
    const objWithIdIndex = projects.findIndex((obj) => obj.id === entries["project-list"]);

    addToDoToProject(entries.title, entries.description, entries.date, entries.priority, projects[objWithIdIndex]);
    
    if (getCurrentView() == projects[objWithIdIndex]) {
        displayToDoItems(projects[objWithIdIndex]);
        newDisplay();
    }
    updateProjectInLocalStorage(projects);
    newTaskFormContainer.reset();
})

export function removeObjectWithId(currProject, id) {
    const project = projects.find(item => item == currProject);
    const objWithIdIndex = project.todos.findIndex((item) => item.id === id);
    if (objWithIdIndex !== -1) {
        project.todos.splice(objWithIdIndex, 1);
    }
}

