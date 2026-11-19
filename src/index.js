import "./style.css";
import "./todos-tracker.js"
import {displayToDoItems } from "./updateDisplay.js";
import "./projectsTracker.js";
import { addProjectToNavBar, projects } from "./projectsTracker.js";
import { updateProjectListDrop } from "./projectsTracker.js";
import { getData } from "./localStorageTracker.js";
import { setCurrentView } from "./updateDisplay.js";



// localStorage.clear();

getData();
setCurrentView(projects[0].id);
updateProjectListDrop();
addProjectToNavBar();
displayToDoItems(projects[0]);



