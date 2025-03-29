const currentDate = new Date();

document.getElementById("lastModified").innerHTML = document.lastModified;


const yearSpan = document.querySelector('#currentYear');

yearSpan.innerText = currentDate.getFullYear();

// Add functionality for the hidden timestamp input
const timestampInput = document.getElementById("timestamp");
if (timestampInput) {
  timestampInput.value = currentDate.toISOString(); // Sets ISO 8601 format (e.g., 2025-03-28T20:04:00Z)
}

const form = document.querySelector('form');

form.addEventListener('submit', function (event) {
    const currentDate = new Date().toISOString(); // Get the timestamp in ISO 8601 format
    sessionStorage.setItem('formTimestamp', currentDate); // Store the timestamp in sessionStorage
});

document.addEventListener('DOMContentLoaded', function () {
    const formTimestamp = sessionStorage.getItem('formTimestamp'); // Retrieve the timestamp from sessionStorage
    if (formTimestamp) {
        const timestampElement = document.getElementById('timestampDisplay');
        timestampElement.innerText = `Form submitted on: ${new Date(formTimestamp).toLocaleString()}`; // Format the timestamp
    }
});



const visitMsg = document.querySelector(".visit-msg"); // Target the <span> element

if (visitMsg) {
    console.log("Visit message element found!");
    const msToDays = 86400000;
    const currentVisitTime = currentDate.getTime();
    const lastVisitTime = localStorage.getItem("lastVisit"); // Retrieve the last visit from localStorage

    if (!lastVisitTime) {
        // First visit
        visitMsg.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const timeDifference = currentVisitTime - lastVisitTime; // Difference in milliseconds
        const daysDifference = Math.floor(timeDifference / msToDays); // Convert to days

        if (timeDifference < msToDays) {
            // Less than a day
            visitMsg.textContent = "Back so soon! Awesome!";
        } else if (daysDifference === 1) {
            // Exactly 1 day
            visitMsg.textContent = "You last visited 1 day ago.";
        } else {
            // More than 1 day
            visitMsg.textContent = `You last visited ${daysDifference} days ago.`;
        }
    }

// Store the current visit date in localStorage
localStorage.setItem("lastVisit", currentVisitTime);
}

// Store the selected elements that are going to be used. 
const mainnav = document.querySelector('.navigation')
const hambutton = document.querySelector('#menu');

const modeButton = document.querySelector("#dMode");
const main = document.querySelector("main");
const modeIcon = document.querySelector("#modeIcon");
const modeText = document.querySelector("#modeText");

// Add a click event listender to the hamburger button and use a callback function that toggles the list element's list of classes.
hambutton.addEventListener('click', () => {
    console.log("Hamburger button clicked!");
	mainnav.classList.toggle('show');
	hambutton.classList.toggle('show');
});

console.log(document.querySelector('#menu')); // Should not be null
console.log(document.querySelector('.navigation')); // Should not be null

