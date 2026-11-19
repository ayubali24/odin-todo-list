import { removeObjectWithId } from "./todos-tracker.js";
import { projects } from "./projectsTracker.js";
import { updateProjectInLocalStorage } from "./localStorageTracker.js";

const myTable = document.getElementById("myTable");
const tbody = myTable.createTBody();

let currentProject;
export function setCurrentProject(id) {
    const projectExists = projects.find(project => project.id === id);

    if (!projectExists) return;
    currentProject = projectExists;
}

export const getCurrentView =  () => currentProject;

const navBar = document.querySelector("nav");
navBar.addEventListener("click", (e) => {
    const button = e.target.closest('button');
    if (!button) return;
    currentProject = projects.find(project => project.id === button.id);
    displayToDoItems(currentProject);
    newDisplay();
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
const newTaskPopup = document.getElementById("new-task-popup");
const closeNewTaskPopup = document.querySelector("#close-new-task-popup");

newTaskBtn.addEventListener("click", () => {
    newTaskPopup.showModal();
})

closeNewTaskPopup.addEventListener("click", () => {
    newTaskPopup.close();
})

const newProjectBtn = document.querySelector(".new-project-btn");
const newProjectPopup = document.querySelector("#new-project-popup");
const closeNewProjectPopup = document.querySelector("#close-new-project-popup");



newProjectBtn.addEventListener("click", () => {
    newProjectPopup.showModal();
})

closeNewProjectPopup.addEventListener("click", () => {
    newProjectPopup.close();
})


const displayTaskContainer = document.querySelector(".display-tasks-container");




export function displayToDoItems(project) {
    const todos = project.todos;
    console.log(projects)
    tbody.replaceChildren();

    for (const item of todos) {
        const row = document.createElement("tr");

        const cell1 = document.createElement("td");
        const cell2 = document.createElement("td");
        const cell3 = document.createElement("td");
        const cell4 = document.createElement("td");

        cell1.textContent = item.title;
        cell2.textContent = item.description;
        cell3.textContent = item.dueDate;
        cell4.textContent = item.priority;

        row.append(cell1, cell2, cell3, cell4)
        // row.appendChild(cell1);
        // row.appendChild(cell2);
        // row.appendChild(cell3);
        // row.appendChild(cell4);
        const myDeleteButton = document.createElement('button');

        myDeleteButton.innerText = "Delete Item";

        const cell5 = document.createElement("td");
        cell5.append(myDeleteButton);


        myDeleteButton.addEventListener('click', () => {
            removeObjectWithId(project, item.id)
            displayToDoItems(project);
            updateProjectInLocalStorage(projects);
            newDisplay();
        });

        row.append(cell5);
        tbody.append(row);
    }
}

const displayContainer = document.querySelector(".display-tasks-container")

export function newDisplay() {
    displayContainer.replaceChildren();
    currentProject.todos.forEach(todo => {
        const card = document.createElement("div");
        card.classList = "card-body";

        const title = document.createElement("h5");
        const dueDate = document.createElement("h5");
        title.textContent = todo.title;
        dueDate.textContent = todo.dueDate;
        card.append(title, dueDate);
        console.log("before", card);
        
        console.log("after", card);

        displayContainer.append(card)
    });
}