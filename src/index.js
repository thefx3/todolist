//index.js
// Importing the necessary modules
import {createTask} from "./task.js";
import { displayTaskDetails} from "./task.js";
import { displayTasks } from "./today.js";
import "./styles.css";

// Index.js will import all the functions from the other files

// By default it will be the function home() = Home 
export const allTasks = [];

let currentFilter = "today";
export function setCurrentFilter(value) {
  currentFilter = value;
}
export function getCurrentFilter() {
  return currentFilter;
}


//Navigation bar logic and display
document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll("#nav_top button");

  navButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      displayTasks(filter);

      // Mise à jour des classes actives
      navButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });

  // Default display
  displayTasks("today");
  document.querySelector('[data-filter="today"]').classList.add("active");

});


//Add task logic
document.addEventListener("DOMContentLoaded", () => {
    const addTaskDiv = document.getElementById("addtask");

    addTaskDiv.addEventListener("click", () => {
      // Ne pas dupliquer les champs s'ils existent déjà
      if (document.getElementById("temp-task-box")) return;

      addTaskDiv.style.display = "none";
  
      // Créer un conteneur simple
      const container = document.createElement("div");
      container.id = "temp-task-box";
      container.style.display = "flex";
      container.style.flexDirection = "column";
      container.style.gap = "6px";
      container.style.marginTop = "10px";

      // Champ texte
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Enter a task...";
      input.style.padding = "6px";
  
      // Bouton Add
      const addBtn = document.createElement("button");
      addBtn.classList.add("add-task-button");
      addBtn.textContent = "Add";
      addBtn.style.padding = "6px";

      addBtn.addEventListener("click", () => {
        const taskText = input.value.trim();
        if (taskText !== "") {
          const task = createTask(taskText, "", new Date().toISOString(), "Low");
          allTasks.push(task);
          displayTaskDetails(task);
          container.remove();
          addTaskDiv.style.display = "flex";
        }
      });
  
      // Bouton Cancel
      const cancelBtn = document.createElement("button");
      cancelBtn.classList.add("cancel-task-button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.style.padding = "6px";
      cancelBtn.addEventListener("click", () => {
        container.remove();
        addTaskDiv.style.display = "flex";
      });
  
      // Ajouter les éléments
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