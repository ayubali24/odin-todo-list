import { projects } from "./projectsTracker.js";
import {getCurrentTodo, updateDisplay } from "./updateDisplay.js";
import { getCurrentView } from "./updateDisplay.js";
import { updateProjectInLocalStorage } from "./localStorageTracker.js";
import { getCurrentFormMode } from "./updateDisplay.js";

class toDo {
    constructor(title, description, dueDate, priority, prevId) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.id = crypto.randomUUID();
        this.prevId = prevId;
    }
};

function addToDoToProject(title, description, dueDate, priority, project, prevId) {
    const toDoItem = new toDo(title, description, dueDate, priority, prevId);
    const respectiveProject = projects.find(item => item.id === project.id);
    respectiveProject.todos.push(toDoItem)
}

const taskFormContainer = document.querySelector(".task-form-container");
const taskForm = document.getElementById("task-form");
const taskCard = document.getElementById("task-card")

taskFormContainer.addEventListener("submit", (e) => {
    if (getCurrentFormMode() == "add") {
        e.preventDefault();
        const data = new FormData(e.target);
        const entries = Object.fromEntries(data.entries());
        const objWithIdIndex = projects.findIndex((obj) => obj.id === entries["project-list"]);

        const prevId = document.querySelector("#prevId");
        prevId.value = projects[objWithIdIndex].id;

        addToDoToProject(entries.title, entries.description, entries.dueDate, entries.priority, projects[objWithIdIndex], projects[objWithIdIndex].id);
        

        if (getCurrentView() == projects[objWithIdIndex]) {
            updateDisplay();
        }
        updateProjectInLocalStorage(projects);
        taskFormContainer.reset();
        taskForm.close();
    }

    if (getCurrentFormMode() == "edit") {
        e.preventDefault();
        const prevId = getCurrentTodo().prevId;

        const data = new FormData(e.target);
        const entries = Object.fromEntries(data.entries());
        entries.prevId = prevId;
        const objWithIdIndex = projects.findIndex((obj) => obj.id === entries["project-list"]);


        if (entries["project-list"] == entries.prevId) {
            const project = projects.find(item => item == getCurrentView());
            const myTodo = project.todos.find(item => item.id == getCurrentTodo().id);

            myTodo.title = entries.title;
            myTodo.description = entries.description;
            myTodo.dueDate = entries.dueDate;
            myTodo.priority = entries.priority;

            updateDisplay();
            updateProjectInLocalStorage(projects);

            taskForm.close();

        } else {
            removeObjectWithId(getCurrentView(), getCurrentTodo().id);
            addToDoToProject(entries.title, entries.description, entries.dueDate, entries.priority, projects[objWithIdIndex], projects[objWithIdIndex].id);

            updateDisplay();
            updateProjectInLocalStorage(projects);

            taskForm.close();
        }
    }
})

export function removeObjectWithId(currProject, id) {
    const project = projects.find(item => item == currProject);

    const objWithIdIndex = project.todos.findIndex((item) => item.id === id);
    if (objWithIdIndex !== -1) {
        project.todos.splice(objWithIdIndex, 1);
    }
    taskCard.close();
}

