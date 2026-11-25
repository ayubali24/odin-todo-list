import { removeObjectWithId } from "./todos-tracker.js";
import { projects } from "./projectsTracker.js";
import { updateProjectInLocalStorage } from "./localStorageTracker.js";

const formSubmitButton = document.getElementById("task-form-btn");
const formTitle = document.getElementById("task-form-title");



let formMode;
export const getCurrentFormMode = () => formMode;

let currentProject;
export function setCurrentProject(id) {
    const projectExists = projects.find(project => project.id === id);

    if (!projectExists) return;
    currentProject = projectExists;
}

let currentTodo;
export const getCurrentTodo = () => currentTodo;


export const getCurrentView =  () => currentProject;

const navBar = document.querySelector("nav");
navBar.addEventListener("click", (e) => {
    const button = e.target.closest('button');
    if (!button) return;
    currentProject = projects.find(project => project.id === button.id);
    updateDisplay();
})

const dropdownBtn = document.querySelector(".dropbtn");

dropdownBtn.addEventListener("click", () => {
    document.getElementById("myDropdown").classList.toggle("show");
})

window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

const newTaskBtn = document.querySelector(".new-task-btn");
const taskForm = document.getElementById("task-form");
const closeTaskForm = document.querySelector("#close-task-form");

newTaskBtn.addEventListener("click", () => {
    formMode = "add";
    formTitle.textContent = "Add a New Task";
    formSubmitButton.textContent = "Submit";

    taskForm.showModal();
})

closeTaskForm.addEventListener("click", () => {
    taskForm.close();
})

const newProjectBtn = document.querySelector(".new-project-btn");
const projectForm = document.querySelector("#project-form");
const closeProjectForm = document.querySelector("#close-project-form");



newProjectBtn.addEventListener("click", () => {
    projectForm.showModal();
})

closeProjectForm.addEventListener("click", () => {
    projectForm.close();
})

const displayContainer = document.querySelector(".display-tasks-container")

function openFormModal(todo, project, projectId) {
    const dialog = document.getElementById("task-card");
    dialog.replaceChildren();
    const title = document.createElement("h1");
    const projectName = document.createElement("h1");
    const description = document.createElement("p");
    const dueDate = document.createElement("h2");
    const priority = document.createElement("h3");


    title.textContent = "Title:" + todo.title;
    projectName.textContent = "Project: " + project;
    description.textContent = "Description: " + todo.description;
    dueDate.textContent = "Due Date: " + todo.dueDate;
    priority.textContent = "Priority: " + todo.priority;

    const closeTaskButton = document.createElement("button");
    const deleteTaskButton = document.createElement("button");
    const editTaskButton = document.createElement("button");



    closeTaskButton.textContent = "Close";
    closeTaskButton.addEventListener("click", () => {
        dialog.close()
    })

    deleteTaskButton.textContent = "Delete";
    deleteTaskButton.addEventListener("click", () => {
        removeObjectWithId(getCurrentView(), todo.id);
        updateDisplay();
        updateProjectInLocalStorage(projects);
    })

    editTaskButton.textContent = "Edit";
    editTaskButton.addEventListener("click", (e) => {
        currentTodo = todo;
        dialog.close()

        formMode = "edit";
        const titleInput = document.querySelector("#title");
        const descriptionInput = document.querySelector("#description");
        const dateInput = document.querySelector("#dueDate");
        const priorityInput = document.querySelector("#priority")
        const projectInput = document.querySelector("#project-list");
       
        titleInput.value = todo.title;
        descriptionInput.value = todo.description;
        dateInput.value = todo.dueDate;
        priorityInput.value = todo.priority;
        projectInput.value = projectId;
        formTitle.textContent = "Edit Task";

        formSubmitButton.textContent = "Save Changes";

        taskForm.showModal();

    })

    dialog.append(title, projectName, description, dueDate, priority, closeTaskButton, deleteTaskButton, editTaskButton);
    dialog.showModal();

}

export function updateDisplay() {
    displayContainer.replaceChildren();
    currentProject.todos.forEach(todo => {
        const myCardButton = document.createElement("button");
        myCardButton.classList = "card-body"

        const title = document.createElement("h5");
        const dueDate = document.createElement("h5");
        title.textContent = todo.title;
        dueDate.textContent = todo.dueDate;
        myCardButton.append(title, dueDate);
        

        displayContainer.append(myCardButton);

        myCardButton.addEventListener("click", () => {
            openFormModal(todo, currentProject.name, currentProject.id);
        })
    });
}