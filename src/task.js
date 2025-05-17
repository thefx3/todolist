//task.js
import { allTasks } from "./index.js";

// Create the logic of the task
export function createTask(name, description, dueDate, priority) {
    const id = Date.now()+ Math.random();
    let _name = name;
    let _description = description;
    let _dueDate = dueDate;
    let _priority = priority;
    let _completed = false;
  
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
      isOverdue() {
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
        if (isNaN(Date.parse(newDate))) {
          throw new Error("Date invalid.");
        }
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
    taskElement.setAttribute("draggable", "true");

    const subtask1 = document.createElement("div");
    subtask1.classList.add("subtask"); 

    const subtask2 = document.createElement("div");
    subtask2.classList.add("subtask1");

        // ========== Display the Due Date
        subtask2.textContent = task.dueDate;


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
        });
    
        const label = document.createElement("label");
        label.textContent = task.name;
    
        taskLeft.appendChild(checkbox);
        taskLeft.appendChild(label);
    
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
                // Appel de la fonction de suppression
                deleteTask(task);
              });
            }

            icons.appendChild(span);
        });
    
        // ========== Assemble
        subtask1.appendChild(taskLeft);
        subtask1.appendChild(icons);

        taskElement.appendChild(subtask1);
        taskElement.appendChild(subtask2);
    
        const taskContainer = document.querySelector(".taskcontainer");
        taskContainer.appendChild(taskElement);
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
    }
  });
}
