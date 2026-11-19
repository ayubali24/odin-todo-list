import { addProjectToNavBar, projects } from "./projectsTracker.js";
// import { displayToDoItems } from "./updateDisplay.js";
import { updateProjectListDrop } from "./projectsTracker.js";
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
    // displayToDoItems(projects[0]);
    // addProjectToNavBar();
    // updateProjectListDrop();
}

