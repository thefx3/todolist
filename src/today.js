//today.js
import { displayTaskDetails } from "./task.js";
import { allTasks, getCurrentFilter, setCurrentFilter } from "./index.js";


export function displayTasks(filter = "today") {
    if (!filter || typeof filter !== "string") filter = "today";
    setCurrentFilter(filter);
    const container = document.querySelector(".taskcontainer");
    container.innerHTML = ""; // Clear previous tasks

    const now = new Date();
    let tasksToDisplay = [];

    allTasks.sort((a, b) => {
        const dateA = new Date(a.dueDate || 0);
        const dateB = new Date(b.dueDate || 0);
        return dateA - dateB;
      });

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

    let count = tasksToDisplay.length;
    if (count === 0) {
        container.innerHTML = `<h2>${filter[0].toUpperCase() + filter.slice(1)}</h2>`;
        return;
    }
    container.innerHTML = `<h2>${filter[0].toUpperCase() + filter.slice(1) + " " + count}</h2>`;


    tasksToDisplay.forEach(displayTaskDetails);

}
