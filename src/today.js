//today.js
import { createTask, displayTaskDetails } from "./task.js";
import { allTasks } from "./index.js";

export function displayTasks(filter = "today") {
    const container = document.querySelector(".taskcontainer");
    container.innerHTML = `<h2>${filter[0].toUpperCase() + filter.slice(1)}</h2>`;

    const now = new Date();
    let tasksToDisplay = [];

    allTasks.forEach(task => {
        const taskDate = new Date(task.dueDate);

        if (filter === "today" && taskDate.toDateString() === now.toDateString()) {
            tasksToDisplay.push(task);
        } else if (filter === "tomorrow" && taskDate.toDateString() === new Date(now.getTime() + 86400000).toDateString()) {
            tasksToDisplay.push(task);
        } else if (filter === "all") {
            tasksToDisplay.push(task);
        } else if (filter === "planned" && taskDate > now) {
            tasksToDisplay.push(task);
        } else if (filter === "completed" && task.completed) {
            tasksToDisplay.push(task);
        }
    });

    tasksToDisplay.forEach(displayTaskDetails);
}