const currentDate = new Date();

const lastModified = new Date(document.lastModified); // Parse the lastModified string into a Date object
const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true // Ensure AM/PM formatting
};
document.getElementById("lastModified").innerHTML = lastModified.toLocaleString('en-US', options);



const yearSpan = document.querySelector('#currentYear');

yearSpan.innerText = currentDate.getFullYear();

// Add functionality for the hidden timestamp input
const timestampInput = document.getElementById("timestamp");
if (timestampInput) {
    timestampInput.value = currentDate.toISOString(); // Sets ISO 8601 format
} else {
    console.warn("Hidden timestamp input not found.");
}


const form = document.querySelector('.wf2'); // Select the form by its class

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.wf2'); // Select the form using its class
    if (form) {
        form.addEventListener('submit', function (event) {
            const currentDate = new Date().toISOString(); // Get the timestamp in ISO 8601 format
            sessionStorage.setItem('formTimestamp', currentDate); // Store the timestamp in sessionStorage
        });
    } else {
        console.error("Form element with class 'wf2' not found");
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const formTimestamp = sessionStorage.getItem('formTimestamp'); // Retrieve the timestamp from sessionStorage
    if (formTimestamp) {
        document.getElementById("timestampDisplay").innerHTML = new Date(formTimestamp).toLocaleString(); // Display the timestamp itself
    }
});




const visitMsg = document.querySelector(".visit-msg"); // Target the <span> element

if (visitMsg) {
    const msToDays = 86400000;
    const currentVisitTime = currentDate.getTime();
    const lastVisitTime = localStorage.getItem("lastVisit"); // Retrieve the last visit from localStorage

    if (!lastVisitTime) {
        visitMsg.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const timeDifference = currentVisitTime - lastVisitTime; // Difference in milliseconds
        const daysDifference = Math.floor(timeDifference / msToDays); // Convert to days

        if (timeDifference < msToDays) {
            visitMsg.textContent = "Back so soon! Awesome!";
        } else if (daysDifference === 1) {
            visitMsg.textContent = "You last visited 1 day ago.";
        } else {
            visitMsg.textContent = `You last visited ${daysDifference} days ago.`;
        }
    }

    // Store the current visit date in localStorage
    localStorage.setItem("lastVisit", currentVisitTime);
}

// Get references to the title and email input elements
// Get the Title and Email input elements
const titleInput = document.getElementById("title");
const emailInput = document.getElementById("email");

// Add focusout event listener for Title
if (titleInput) { // Only add the event listener if the element exists
    titleInput.addEventListener("focusout", function() {
        validateTitle(); // Call validateTitle function when focusout happens
    });
}

// Add focusout event listener for Email
if (emailInput) { // Only add the event listener if the element exists
    emailInput.addEventListener("focusout", function() {
        validateEmail(); // Call validateEmail function when focusout happens
    });
}


// Pattern validation function for Title
function validateTitle() {
    const pattern = /^[A-Za-z\- ]{7,}$/; // Title pattern (letters, spaces, hyphens, min 7 chars)
    
    if (titleInput.value.length === 0) {
        return; // Skip validation if the input is empty
    }

    if (!pattern.test(titleInput.value)) {
        alert("Title must be at least 7 characters long and contain only letters, spaces, or hyphens.");
        titleInput.value = ""; // Clear the field
        titleInput.focus(); // Focus back on the title input
    }
}

// Pattern validation function for Email
function validateEmail() {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Email pattern
    const emailValue = emailInput.value;

    if (emailValue.length === 0) {
        return; // Skip validation if the input is empty
    }

    if (!pattern.test(emailValue)) {
        alert("Please enter a valid email address.");
        emailInput.value = ""; // Clear the email field
        emailInput.focus(); // Focus back on the email input
    }
}





// Store the selected elements that are going to be used. 
const mainnav = document.querySelector('.navigation')
const hambutton = document.querySelector('#menu');

const modeButton = document.querySelector("#dMode");
const main = document.querySelector("main");
const modeIcon = document.querySelector("#modeIcon");
const modeText = document.querySelector("#modeText");

// Add a click event listender to the hamburger button and use a callback function that toggles the list element's list of classes.
if (hambutton && mainnav) {
    hambutton.addEventListener('click', () => {
        console.log("Hamburger button clicked!");
        mainnav.classList.toggle('show');
        hambutton.classList.toggle('show');
    });
} else {
    console.warn("Hamburger button or navigation menu not found on this page.");
}

console.log(document.querySelector('#menu')); // Should not be null
console.log(document.querySelector('.navigation')); // Should not be null

