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


function addProjectToList() {
    const newProject = document.querySelector("#new-project");
    const project = new Project(newProject.value);
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

const newProjectButton = document.querySelector("#new-project-button");

newProjectButton.addEventListener("click", () => {
    addProjectToList();
    addProjectToNavBar();
    console.log(projects);
})