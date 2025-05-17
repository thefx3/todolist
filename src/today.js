//today.js
import { displayTaskDetails } from "./task.js";
import { allTasks, getCurrentFilter, setCurrentFilter } from "./index.js";


export function displayTasks(filter = "today") {
    if (!filter || typeof filter !== "string") filter = "today";
    setCurrentFilter(filter);
    const container = document.querySelector(".taskcontainer");
    container.innerHTML = `<h2>${filter[0].toUpperCase() + filter.slice(1)}</h2>`;

    const now = new Date();
    let tasksToDisplay = [];

    allTasks.forEach(task => {
        const taskDate = new Date(task.dueDate);

        if (filter === "today" && taskDate.toDateString() === now.toDateString() && !task.completed) {
            tasksToDisplay.push(task);
        } else if (filter === "tomorrow" && taskDate.toDateString() === new Date(now.getTime() + 86400000).toDateString()) {
            tasksToDisplay.push(task);
        } else if (filter === "all" && task.completed === false) {
            tasksToDisplay.push(task);
        } else if (filter === "planned" && taskDate > now && task.completed === false) {
            tasksToDisplay.push(task);
        } else if (filter === "completed" && task.completed) {
            tasksToDisplay.push(task);
        }
    });

    tasksToDisplay.forEach(displayTaskDetails);
}