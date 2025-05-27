//index.js

// Importing the necessary modules
import {createTask, updateTaskDisplay} from "./task.js";
import { displayTaskDetails} from "./task.js";
import { displayTasks } from "./today.js";
import "./styles.css"; 
import { createProject } from "./projects.js";
import { displayProject } from "./projects.js";
import { addTask } from "./task.js";
import { add } from "date-fns";
import { addProject } from "./projects.js";
// Index.js will import all the functions from the other files

// By default it will be the function home() = Home 
export let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
export const projectList = JSON.parse(localStorage.getItem("projects")) || [];

export function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(allTasks));
}

export function saveProjects() {
  localStorage.setItem("projects", JSON.stringify(projectList));
}

export function deleteProject(projectName) {
  import("./index.js").then(({ projectList, saveProjects }) => {
    const index = projectList.findIndex(p => p.name === projectName);
    if (index !== -1) {
      projectList.splice(index, 1);
      saveProjects();
    }

    // Remove all tasks associated with this project
    allTasks = allTasks.filter(task => task.projectName !== projectName);
    saveTasks();
    
    // Remove the project button from the UI
    const projectButton = document.querySelector(`.project-button[data-filter="${projectName}"]`);
    if (projectButton) {
      projectButton.remove();
    }
  }
  );
}

let currentFilter = "today";
export function setCurrentFilter(value) {
  currentFilter = value;
}
export function getCurrentFilter() {
  return currentFilter;
}



//Navigation bar logic and display
document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll("#navigation button");

  navButtons.forEach(button => {
    button.addEventListener("click", () => {

      const filter = button.dataset.filter;
      setCurrentFilter(filter);
      displayTasks(filter);

      // Mise à jour des classes actives
      navButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      document.querySelectorAll(".project-button").forEach(btn => btn.classList.remove("active"));
      document.getElementById("add_project").classList.remove("active");

    });
  });

  // Default display
  displayTasks("all");
  document.querySelector('[data-filter="all"]').classList.add("active");

});


//Add task logic
document.addEventListener("DOMContentLoaded", () => {
    const addTaskDiv = document.getElementById("addtask");

    addTaskDiv.addEventListener("click", () => {
      // Ne pas dupliquer les champs s'ils existent déjà
      if (document.getElementById("temp-task-box")) return;

      addTaskDiv.style.display = "none";

      const container = document.createElement("div");
      container.id = "temp-task-box";
      container.style.display = "flex";
      container.style.flexDirection = "column";
      container.style.gap = "6px";
      container.style.marginTop = "10px";

      // Input text
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Enter a task...";
      input.style.padding = "6px";
  
      // Add
      const addBtn = document.createElement("button");
      addBtn.classList.add("add-task-button");
      addBtn.textContent = "Add";
      addBtn.style.padding = "6px";

      addBtn.addEventListener("click", () => {
        const taskText = input.value.trim();
        if (taskText !== "") {
          let task;
          if (getCurrentFilter() === "today") {
            task = createTask(taskText, "", new Date(), false);
            task.dueDate = new Date().toDateString();
          } 
          else if (getCurrentFilter () == "tomorrow") {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            task = createTask(taskText, "", new Date(tomorrow), false);
            task.dueDate = tomorrow.toDateString();
          } else {
            task = createTask(taskText, "", null, false);
          }

          task.projectName = getCurrentFilter();
          addTask(task);
          displayTaskDetails(task);
          container.remove();
          addTaskDiv.style.display = "flex";
          displayTasks(getCurrentFilter());
        }
      });
  
      //Cancel
      const cancelBtn = document.createElement("button");
      cancelBtn.classList.add("cancel-task-button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.style.padding = "6px";
      cancelBtn.addEventListener("click", () => {
        container.remove();
        addTaskDiv.style.display = "flex";
      });
  
      // Add elements 
      container.appendChild(input);

      const containerBtn = document.createElement("button");
      containerBtn.classList.add("container-btn");
      container.appendChild(containerBtn);

      containerBtn.appendChild(addBtn);
      containerBtn.appendChild(cancelBtn);
  
      // L'insérer juste après le "Add a task..."
      addTaskDiv.insertAdjacentElement("afterend", container);

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") addBtn.click();
        if (e.key === "Escape") cancelBtn.click();
      });

    });
  });

  //Add Project logic

  document.addEventListener("DOMContentLoaded", () => {
    const addprojectDiv = document.getElementById("add_project");
    const container = document.getElementById("nav_bottom");
  
    addprojectDiv.addEventListener("click", () => {
      // Ne pas dupliquer le champ si déjà ouvert
      if (document.getElementById("temp-project-box")) return;
  
      // === Conteneur temporaire
      const wrapper = document.createElement("div");
      wrapper.id = "temp-project-box";
      wrapper.style.display = "flex";
      wrapper.style.gap = "8px";
      wrapper.style.marginTop = "10px";
  
      // === Input projet
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Untitled Project";
      input.style.padding = "6px";
      input.style.flexGrow = "1";
  
      // === Bouton Ajouter
      const addBtn = document.createElement("button");
      addBtn.textContent = "Add";
      addBtn.style.padding = "6px";
      addBtn.style.display = "none";
  
      // === Bouton Annuler
      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.style.padding = "6px";
      cancelBtn.style.display = "none";
  
      const container2 = document.querySelector(".taskcontainer");
      container2.innerHTML = `<h2>Untitled Project</h2>`;

      // === Ajout logique
      addBtn.addEventListener("click", () => {


        const projectName = input.value.trim();
        if (projectName === "") return;

        const project = createProject(projectName);

        // Ajouter le projet à la liste
        addProject(project);

        displayProject(project);
        wrapper.remove();
        displayTasks(projectName);
      });

  
      // === Annulation
      cancelBtn.addEventListener("click", () => {
        wrapper.remove();
      });
  
      // === Touche clavier
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") addBtn.click();
        if (e.key === "Escape") cancelBtn.click();
      });
  
      // Ajout des éléments au wrapper
      wrapper.appendChild(input);
      wrapper.appendChild(addBtn);
      wrapper.appendChild(cancelBtn);

      addprojectDiv.insertAdjacentElement("afterend", wrapper);
  
      // Ajout au container
      container.appendChild(wrapper);
      input.focus();

    });
  });
  

document.addEventListener("DOMContentLoaded", () => {
    // Recharger les projets sauvegardés
    projectList.forEach(project => {
      if (typeof project === "string") {
        displayProject({ name: project });
      } else if (typeof project === "object" && project.name) {
        displayProject(project);
      }
    });
    document.querySelectorAll(".project-button").forEach(btn => btn.classList.remove("active"));
    document.getElementById("add_project").classList.remove("active");
});
  