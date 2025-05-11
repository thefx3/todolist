
// Main function to create todo lists 
// Function home, today, today, tomorrow, planned, completed 



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