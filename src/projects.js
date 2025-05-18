//projects.js 

import { allTasks } from "./index.js";
import { displayTasks } from "./today.js";
import { getCurrentFilter } from "./index.js";
import { createTask } from "./task.js";
import { displayTaskDetails } from "./task.js";
import { setCurrentFilter } from "./index.js";

export function createProject (name) {
    if (!name || name.trim() === "") {
        throw new Error("Project name can't be empty.");
    }
    name = name.trim();
    let tasks = [];

    return { name, tasks };

}

export function displayProject (project) {
    const container = document.getElementById("nav_bottom");

    const projectButton = document.createElement("button");
    projectButton.innerText = project.name;
    projectButton.classList.add("project-button");
    projectButton.dataset.filter = project.name; 


    projectButton.addEventListener("click", () => {
        setCurrentFilter(project.name);
        displayTasks(project.name);
        const navButtons = document.querySelectorAll("#navigation button");
        navButtons.forEach(btn => btn.classList.remove("active"));
        projectButton.classList.add("active");
    });
    container.appendChild(projectButton);
    const projectTasks = project.tasks;

}

