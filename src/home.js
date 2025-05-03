
// Main function to create todo lists 
// Function home, today, today, tomorrow, planned, completed 


// Create a function to create todo list classes
//Create task function
export function createTask(name, description, dueDate, priority) {
    return {
        name,
        description,
        dueDate,
        priority,
        completed: false,
        toggleCompleted() {
            this.completed = !this.completed;
        },
        
        //GETTERS
        getTaskDetails() {
            return `${this.name} - ${this.description} - ${this.dueDate} - ${this.priority} - ${this.completed}`;
        },
        getTaskName() {
            return this.name;
        },
        getTaskDescription() {
            return this.description;
        },
        getTaskDueDate() {
            return this.dueDate;
        },
        getTaskPriority() {
            return this.priority;
        },
        getTaskCompleted() {
            return this.completed;
        },

        //SETTERS
        setTaskName(name) {
            this.name = name;
        },
        setTaskDescription(description) {
            this.description = description;
        },
        setTaskDueDate(dueDate) {
            this.dueDate = dueDate;
        },
        setTaskPriority(priority) {
            this.priority = priority;
        },
        setTaskCompleted(completed) {
            this.completed = completed;
        },
    };
}

// Display the task details
export function displayTaskDetails(task) {

    const taskElement = document.createElement("div");
    taskElement.classList.add("task"); 
    taskElement.setAttribute("data-name", task.getTaskName());
    taskElement.setAttribute("data-description", task.getTaskDescription());
    taskElement.setAttribute("data-dueDate", task.getTaskDueDate());
    taskElement.setAttribute("data-priority", task.getTaskPriority());
    taskElement.setAttribute("data-completed", task.getTaskCompleted());
    taskElement.setAttribute("draggable", "true");

        // ========== Left side (checkbox + label)
        const taskLeft = document.createElement("div");
        taskLeft.classList.add("task-left");
    
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.getTaskCompleted() === "true";
    
        const label = document.createElement("label");
        label.textContent = task.getTaskName();
    
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
            icons.appendChild(span);
        });
    
        // ========== Assemble
        taskElement.appendChild(taskLeft);
        taskElement.appendChild(icons);
    
        const taskContainer = document.querySelector(".taskcontainer");
        taskContainer.appendChild(taskElement);

}

// Default display : home page - My Day

export function displayMyDay() {

    const taskContainer = document.querySelector(".taskcontainer");
    taskContainer.innerHTML = ""; // Clear the container before displaying tasks

    const myDayTitle = document.createElement("h2");
    myDayTitle.textContent = "My Day";
    taskContainer.appendChild(myDayTitle);

    // Here you would typically fetch and display tasks for "My Day"
    // For demonstration, we'll just create a sample task
    const sampleTask = createTask("Sample Task", "This is a sample task", "2023-10-01", "High");
    displayTaskDetails(sampleTask);
}