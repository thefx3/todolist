
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
    const taskDetails = task.getTaskDetails();
    console.log(taskDetails); // CONSOLE 
    // ADD THE DOM MODIFICATION 

    const taskElement = document.createElement("div");
    taskElement.classList.add("task"); 
    taskElement.textContent = taskDetails;
    taskElement.setAttribute("data-name", task.getTaskName());
    taskElement.setAttribute("data-description", task.getTaskDescription());
    taskElement.setAttribute("data-dueDate", task.getTaskDueDate());
    taskElement.setAttribute("data-priority", task.getTaskPriority());
    taskElement.setAttribute("data-completed", task.getTaskCompleted());
    taskElement.setAttribute("draggable", "true");

    const taskContainer = document.querySelector("#main_bottom");
}