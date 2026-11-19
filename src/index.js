import "./style.css";
import "./todos-tracker.js"
import {displayToDoItems, newDisplay } from "./updateDisplay.js";
import "./projectsTracker.js";
import { addProjectToNavBar, projects } from "./projectsTracker.js";
import { updateProjectListDrop } from "./projectsTracker.js";
import { getData } from "./localStorageTracker.js";
import { setCurrentProject } from "./updateDisplay.js";



// localStorage.clear();

getData();
setCurrentProject(projects[0].id);
updateProjectListDrop();
addProjectToNavBar();
displayToDoItems(projects[0]);
newDisplay();



