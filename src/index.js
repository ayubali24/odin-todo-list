import "./style.css";
import "./todos-tracker.js"
// import { displayToDoItems } from "./updateDisplay.js";
import "./projectsTracker.js";
import { updateProjectListDrop } from "./projectsTracker.js";
updateProjectListDrop();
import { getData } from "./localStorageTracker.js";


// localStorage.clear();

getData();

