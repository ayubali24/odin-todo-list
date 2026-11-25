// keep track of projects, create new projects, delete projects?
import { updateProjectInLocalStorage } from "./localStorageTracker.js";
export const projects = [
    {
        id: crypto.randomUUID(),
        name: "Default",
        todos: [],
    }
];

class Project {
    constructor(projectName) {
        this.name = projectName;
        this.todos = [];
        this.id = crypto.randomUUID()
    }
}


function addProjectToList(e) {
    const data = new FormData(e.target);
    const entries = Object.fromEntries(data.entries());

    const project = new Project(entries.project);
    projects.push(project)
    updateProjectListDrop();
    updateProjectInLocalStorage(projects);
};

const projectList = document.querySelector("#project-list");
const navBar = document.querySelector("nav");

export function addProjectToNavBar() {
    navBar.replaceChildren();
    projects.forEach((item) => {
        const newButton = document.createElement("button");
        newButton.textContent = item.name;
        newButton.id = item.id;
        navBar.appendChild(newButton);
    })
}

export function updateProjectListDrop() {
    projectList.replaceChildren();
    projects.forEach((item) => {
        projectList.add(new Option(item.name, item.id))
    })
}

const projectFormContainer = document.querySelector(".project-form-container");

projectFormContainer.addEventListener("submit", (e) => {
    e.preventDefault();
    addProjectToList(e);
    addProjectToNavBar();
    projectFormContainer.reset();
})