import {projects } from "./projectsTracker.js";
// import { displayToDoItems } from "./updateDisplay.js";
export function updateProjectInLocalStorage(projects) {
    localStorage.setItem("Projects", JSON.stringify(projects));
}

export function getData() {
    const projectsInLocalStroage = JSON.parse(localStorage.getItem("Projects"));
    if (projectsInLocalStroage == undefined) {
        return;
    }

    projects.pop();
    projectsInLocalStroage.forEach((project) => {
        projects.push(project);
    })
}

