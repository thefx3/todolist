//today.js
import { displayTaskDetails } from "./task.js";
import { allTasks, getCurrentFilter, setCurrentFilter } from "./index.js";


export function displayTasks(filter = "today") {
    if (!filter || typeof filter !== "string") filter = "";
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

    //   if (["today", "tomorrow", "all", "planned", "completed"].includes(filter)) {
    //     // comportement normal
    //     allTasks.forEach(task => {
    //       const taskDate = new Date(task.dueDate);
    //         if (filter === "today" && taskDate.toDateString() === now.toDateString() && !task.completed) {
    //             tasksToDisplay.push(task);
    //         } else if (filter === "tomorrow" && taskDate.toDateString() === new Date(now.getTime() + 86400000).toDateString()) {
    //             tasksToDisplay.push(task);
    //         } else if (filter === "all" && task.completed === false && task.projectName === null) { \\last condition is shit
    //             tasksToDisplay.push(task);
    //         } else if (filter === "planned" && taskDate > now && task.completed === false) {
    //             tasksToDisplay.push(task);
    //         } else if (filter === "completed" && task.completed) {
    //             tasksToDisplay.push(task);
    //         }
    //     });
    //   } else {
    //     // Si le filtre correspond à un nom de projet
    //     tasksToDisplay = allTasks.filter(task => task.projectName === filter);
    //   } 

    if (filter === "all") {
        tasksToDisplay = allTasks.filter(task => task.completed === false);
    } else if (filter === "today") {
        tasksToDisplay = allTasks.filter(task => task.dueDate === now.toDateString() && task.completed === false);
    } else if (filter === "tomorrow") {
        tasksToDisplay === allTasks.filter(task => task.dueDate === new Date(now.getTime() + 86400000).toDateString() && task.completed === false);
    } else if (filter === "all") {
        tasksToDisplay = allTasks.filter(task => task.completed === false && task.projectName === null);
    } else if (filter === "planned") {
        tasksToDisplay === allTasks.filter(task => task.dueDate > now && task.completed === false);
    } else if (filter === "completed" && task.completed) {
        tasksToDisplay = allTasks.filter(task => task.completed);
    } else {
        tasksToDisplay = allTasks.filter(task => task.projectName === filter);
    }

    let count = tasksToDisplay.length;
    if (count === 0) {
        container.innerHTML = `<h2>${filter[0].toUpperCase() + filter.slice(1)}</h2>`;
        return;
    }
    container.innerHTML = `<h2>${filter[0].toUpperCase() + filter.slice(1) + " " + count}</h2>`;

    tasksToDisplay.forEach(displayTaskDetails);

}
