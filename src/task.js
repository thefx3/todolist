//task.js
import { allTasks } from "./index.js";
import { displayTasks } from "./today.js";
import { getCurrentFilter } from "./index.js";

// Create the logic of the task
export function createTask(name, description, dueDate, priority) {
    const id = Date.now()+ Math.random();
    let _name = name;
    let _description = description;
    let _dueDate = dueDate || null; 
    let _priority = priority;
    let _completed = false;
    let _projectName = null;
  
    return {
      // === Getters
      get id() {
        return id;
      },
      get name() {
        return _name.trim();
      },
      get description() {
        return _description.trim();
      },
      get dueDate() {
        return _dueDate;
      },
      get priority() {
        return _priority;
      },
      get completed() {
        return _completed;
      },
      get projectName() {
        return _projectName;
      },
      isOverdue() {
        if (!_dueDate) return false; // <-- Ne pas considérer comme "en retard"
        return new Date(_dueDate) < new Date();
      },
  
      // === Setters (avec validation)
      set name(newName) {
        if (!newName || newName.trim() === "") {
          throw new Error("Task can't be empty.");
        }
        _name = newName;
      },
      set description(newDescription) {
        _description = newDescription;
      },
      set dueDate(newDate) {
        _dueDate = newDate;
      },
      set priority(newPriority) {
        const allowed = ["Low", "Medium", "High"];
        if (!allowed.includes(newPriority)) {
          throw new Error("Property invalid.");
        }
        _priority = newPriority;
      },
      toggleCompleted() {
        _completed = !_completed;
      },
      set projectName(newProjectName) {
        _projectName = newProjectName;
      }
    };
  }
  


// Display the task details in the DOM
export function displayTaskDetails(task) {

  const taskElement = document.createElement("div");
  taskElement.classList.add("task"); 
  taskElement.setAttribute("data-name", task.name);
  taskElement.setAttribute("data-description", task.description);
  taskElement.setAttribute("data-dueDate", task.dueDate);
  taskElement.setAttribute("data-priority", task.priority);
  taskElement.setAttribute("data-completed", task.completed);
  taskElement.setAttribute("data-projectName", getCurrentFilter());
  taskElement.setAttribute("draggable", "true");
  taskElement.setAttribute("data-id", task.id);

  const subtask1 = document.createElement("div");
  subtask1.classList.add("subtask"); 

  const subtask2 = document.createElement("div");
  subtask2.classList.add("subtask1");
  subtask2.setAttribute("dueDate", task.dueDate);

   // ========== Display the Due Date
  if (task.dueDate) {
    const dueDate = new Date(task.dueDate);
    const isToday = new Date().toDateString() === dueDate.toDateString();
    if (isToday) {
      subtask2.classList.add("subtask-today");
    }
    subtask2.textContent = formatDate(task.dueDate);
  } else {
    subtask2.textContent = "No due date"; // <-- Afficher rien si pas de date
  }


  // ========== Left side (checkbox + label)
  const taskLeft = document.createElement("div");
  taskLeft.classList.add("task-left");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;

  checkbox.addEventListener("change", () => {
      task.toggleCompleted();
      taskElement.setAttribute("data-completed", task.completed);
      checkbox.checked = task.completed;

      displayTasks(getCurrentFilter());
  });

  const label = document.createElement("label");
  label.textContent = task.name;
  label.classList.add("task-label");

  const subtaskLeft = document.createElement("div");
  subtaskLeft.classList.add("subtask-left");
  subtaskLeft.appendChild(checkbox);
  subtaskLeft.appendChild(label);

  taskLeft.appendChild(subtaskLeft);

  // ========== Right side (icons)
  const icons = document.createElement("div");
  icons.classList.add("task-icons");

  const iconData = [
      { class: "edit-date", title: "Edit Date", src: "https://cdn-icons-png.flaticon.com/512/747/747310.png" },
      { class: "edit-task", title: "Edit Task", src: "https://cdn-icons-png.flaticon.com/512/1827/1827933.png" },
      { class: "delete-task", title: "Delete Task", src: "https://cdn-icons-png.flaticon.com/512/1214/1214428.png" }
  ];

  iconData.forEach(({ class: cls, title, src }) => {
      const span = document.createElement("span");
      span.classList.add("task-icon", cls);
      span.title = title;

      const img = document.createElement("img");
      img.src = src;
      img.width = 16;
      img.height = 16;

      span.appendChild(img);

      if (cls === "delete-task") {
        span.addEventListener("click", () => {
          deleteTask(task);
        });
      }

      if (cls === "edit-date") {
        span.addEventListener("click", () => {
          editDueDate(task);
        });
      }
      if (cls === "edit-task") {
        span.addEventListener("click", () => {
          editTask(task);
        });
      }

      icons.appendChild(span);
  });

  // ========== Assemble
  subtask1.appendChild(taskLeft);
  subtask1.appendChild(icons);

  taskElement.appendChild(subtask1);
  taskLeft.appendChild(subtask2);

  const taskContainer = document.querySelector(".taskcontainer");
  taskContainer.appendChild(taskElement);
}

export function updateTaskDisplay(task) {
  const taskElement = document.querySelector(`[data-id="${task.id}"]`);
  if (taskElement) {
    taskElement.remove();
  }
  displayTaskDetails(task);
}


export function deleteTask(task) {
  import("./index.js").then(({ allTasks }) => {
    const index = allTasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      allTasks.splice(index, 1);
    }

    const taskElement = document.querySelector(`.task[data-name="${task.name}"]`);
    if (taskElement) {
      taskElement.remove();
      displayTasks(getCurrentFilter());
    }
  });
}

export function editDueDate(task) {
  const taskElement = document.querySelector(`[data-id="${task.id}"]`);
  if (!taskElement) return;

  const dateSpan = taskElement.querySelector(".edit-date");

  // Crée l'input date
  const dateInput = document.createElement("input");
  dateInput.type = "datetime-local";
  dateInput.value = task.dueDate || "";
  dateInput.classList.add("date-input");
  dateInput.style.marginLeft = "8px";

  dateSpan.replaceWith(dateInput);
  dateInput.focus();

  dateInput.addEventListener("change", () => {
    task.dueDate = dateInput.value;
    updateTaskDisplay(task);
    displayTasks(getCurrentFilter());
  });
}


export function editTask(task) {
  const taskElement = document.querySelector(`[data-id="${task.id}"]`);
  if (!taskElement) return;

  const labelSpan = taskElement.querySelector(".task-label");
  const originalLabel = task.name;

  // Crée un input pour modifier le label
  const input = document.createElement("input");
  input.type = "text";
  input.value = task.name;
  input.classList.add("edit-task-input");
  input.style.marginRight = "8px";

  // Crée boutons valider / annuler
  const confirmBtn = document.createElement("button");
  confirmBtn.textContent = "✅";
  confirmBtn.classList.add("confirm-edit");

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "❌";
  cancelBtn.classList.add("cancel-edit");

  // Conteneur temporaire
  const container = document.createElement("span");
  container.classList.add("edit-task-container");
  container.appendChild(input);
  container.appendChild(confirmBtn);
  container.appendChild(cancelBtn);

  // Remplacement du label par le champ de modification
  labelSpan.replaceWith(container);
  input.focus();

  // Valider
  confirmBtn.addEventListener("click", () => {
    task.name = input.value.trim() || originalLabel;
    updateTaskDisplay(task);
  });

  // Annuler
  cancelBtn.addEventListener("click", () => {
    updateTaskDisplay(task);
  });

  // Enter = valider, Escape = annuler
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") confirmBtn.click();
    if (e.key === "Escape") cancelBtn.click();
  });
}


function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Mois commence à 0
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const isYesterday = new Date(new Date().getTime() - 86400000).toDateString() === date.toDateString();
  const isToday = new Date().toDateString() === date.toDateString();
  const isTomorrow = new Date(new Date().getTime() + 86400000).toDateString() === date.toDateString();


  if (isYesterday) {
    return `Yesterday ${hours}:${minutes}`;
  }
  if (isToday) {
    return `Today ${hours}:${minutes}`;
  }
  if (isTomorrow) {
    return `Tomorrow ${hours}:${minutes}`;
  }
  return `${day}-${month}-${year} ${hours}:${minutes}`;
}




export function serializeTask(task) {
  return {
    id: task.id,
    name: task.name,
    description: task.description,
    dueDate: task.dueDate,
    priority: task.priority,
    completed: task.completed,
    projectName: task.projectName
  };
}


export function deserializeTask(data) {
  const task = createTask(data.name, data.description, data.dueDate, data.priority);
  task.projectName = data.projectName;
  if (data.completed) {
    task.toggleCompleted();
  }
  return task;
}

export function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("allTasks")) || [];
  tasks.push(serializeTask(task));
  localStorage.setItem("allTasks", JSON.stringify(tasks));
}

export function loadTasks() {
  const data = JSON.parse(localStorage.getItem("allTasks")) || [];
  return data.map(deserializeTask);
}

