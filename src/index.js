
// Importing the necessary modules
import {createTask} from "./home.js";
import { displayTaskDetails} from "./home.js";
import "./styles.css";

// Index.js will import all the functions from the other files

// By default it will be the fonction home() = Home 

const Task1 = createTask("Groceries with my friends", "Description 1", "2023-10-01", "High");
console.log(Task1.getTaskDetails());

displayTaskDetails(Task1);