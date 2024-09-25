// Import necessary functions from Firebase libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

// Firebase configuration settings
const appSettings = {
  databaseURL: "https://playground-514f2-default-rtdb.firebaseio.com/", // Add Your Firebase Database URL
};

// Initialize Firebase application
const app = initializeApp(appSettings);

// Get a reference to the database
const database = getDatabase(app);

// Reference to the "books" node in the database
const booksInDB = ref(database, "books");

// Reference to the HTML element where the books will be displayed
const booksEl = document.getElementById("books");

// Listen for changes in the "books" data in the database
onValue(booksInDB, function (snapshot) {
  // Convert the snapshot of books into an array
  let booksArray = Object.values(snapshot.val());

  // Clear the current list of books in the HTML element
  clearBooksListEl();

  // Loop through each book in the array and append it to the list
  for (let i = 0; i < booksArray.length; i++) {
    let currentBook = booksArray[i];
    appendItemToBooksListEl(currentBook);
  }
});

// Function to clear the displayed list of books
function clearBooksListEl() {
  booksEl.innerHTML = ""; // Set the inner HTML of the books element to an empty string
}

// Function to append a book to the list in the HTML
function appendItemToBooksListEl(bookValue) {
  booksEl.innerHTML += `<li> ${bookValue} </li>`; // Add a new list item with the book value
}
