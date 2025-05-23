//projects.js 

import { allTasks, projectList, saveProjects } from "./index.js";
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

export function addProject(project) {
  projectList.push(project);
  saveProjects();
}

export function displayProject (project) {
    const container = document.getElementById("nav_bottom");

    const projectButton = document.createElement("button");
    projectButton.innerText = project.name;
    projectButton.classList.add("project-button");
    projectButton.classList.add("active");
    projectButton.dataset.filter = project.name; 

    const wrapper = document.createElement("div");
    wrapper.classList.add("project-wrapper");
  
    const span = document.createElement("span");
    span.textContent = project.name;
  
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-project-button");
    deleteBtn.textContent = "✕";
    deleteBtn.style.display = "none";
  
    projectButton.addEventListener("mouseover", () => {
      deleteBtn.style.display = "block";
    });
    projectButton.addEventListener("mouseout", () => {
      deleteBtn.style.display = "none";
    });

    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      projectButton.remove();
    });
    
    wrapper.appendChild(span);
    wrapper.appendChild(deleteBtn);
    projectButton.innerHTML = ""; // reset content
    projectButton.appendChild(wrapper);

    projectButton.addEventListener("click", () => {
        setCurrentFilter(project.name);
        displayTasks(project.name);
        const navButtons = document.querySelectorAll("#navigation button");
        navButtons.forEach(btn => btn.classList.remove("active"));
        projectButton.classList.add("active");
    });
    container.appendChild(projectButton);
}

