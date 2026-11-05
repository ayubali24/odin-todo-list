// keep track of projects, create new projects, delete projects?

export const projects = [
    {
        id: crypto.randomUUID(),
        name: "Default",
        // todos: some function that grabs default
    }
];

class Project {
    constructor(projectName, description, dueDate, priority) {
        this.name = projectName;
    }
}


function addProjectToList(projectName) {
    const newProject = document.querySelector("#new-project");

    const project = new Project(newProject.value);
    project.id = crypto.randomUUID();
    projects.push(project)
    updateProjectListDrop();


    // projectList.add(new Option(newProject.value, newProject.value))
    // const newOption = document.createElement("option");
    // newOption.value = newProject.value;
    // newOption.textContent = newProject.value;

    // projectList.appendChild(newOption);
    // newProject.value = "";
};

const projectList = document.querySelector("#project-list");


export function updateProjectListDrop() {
    projectList.replaceChildren();
    projects.forEach((item) => {
        projectList.add(new Option(item.name, item.id))
    })
}

const newProjectButton = document.querySelector("#new-project-button");

newProjectButton.addEventListener("click", addProjectToList)