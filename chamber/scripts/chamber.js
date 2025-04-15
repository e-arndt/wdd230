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
document.addEventListener("DOMContentLoaded", function () {
    // Ensure the logic runs only for join.html
    if (window.location.pathname.endsWith("join.html")) {
        const timestampInput = document.getElementById("timestamp"); // Get the hidden input element
        let formTimestamp = sessionStorage.getItem("formTimestamp"); // Check if the timestamp already exists in sessionStorage

        if (!formTimestamp) {
            // If no timestamp exists, set a new one
            formTimestamp = new Date().toISOString();
            sessionStorage.setItem("formTimestamp", formTimestamp); // Store the timestamp in sessionStorage
        }

        if (timestampInput) {
            timestampInput.value = formTimestamp; // Assign the timestamp to the hidden input field
        }
    } else {
        console.log("Timestamp logic not triggered for this page.");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Check if we are on index.html by examining the current URL
    if (!window.location.pathname.endsWith("index.html")) {
        console.log("Not on index.html, skipping banner logic.");
        return; // Exit the function if we're not on index.html
    }

    // Select the close button and banner
    const closeButton = document.getElementById("close-banner");
    const banner = document.querySelector(".banner");

    // Get the current day of the week
    const currentDay = new Date().getDay();

    // Only display the banner on Mon (1), Tue (2), or Wed (3)
    if (currentDay >= 1 && currentDay <= 3) {
        if (banner) { // Ensure the banner element exists
            const bannerHidden = sessionStorage.getItem("bannerHidden");
            if (bannerHidden === "true") {
                banner.style.display = "none"; // Hide the banner if previously closed
            } else {
                banner.style.display = "block"; // Show the banner
            }

            // Add click event listener to hide the banner and save state
            if (closeButton) { // Ensure the close button exists
                closeButton.addEventListener("click", () => {
                    banner.style.display = "none"; // Hide the banner
                    sessionStorage.setItem("bannerHidden", "true"); // Save the state
                });
            } else {
                console.warn("Close button not found.");
            }
        } else {
            console.warn("Banner element not found.");
        }
    } else {
        // Hide the banner entirely if not Mon, Tue, or Wed
        if (banner) {
            banner.style.display = "none";
        }
    }
});








document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.wf2'); // Select the form using its class
    if (form) {
        form.addEventListener('submit', function (event) {
            // Check if the timestamp already exists in sessionStorage
            if (!sessionStorage.getItem('formTimestamp')) {
                const currentDate = new Date().toISOString(); // Get the timestamp in ISO 8601 format
                sessionStorage.setItem('formTimestamp', currentDate); // Store the timestamp in sessionStorage
            } else {
                console.log("Timestamp already exists in sessionStorage. Skipping save on submit.");
            }
        });
    } else {
        // Replace console.error with console.log
        console.log("Form element with class 'wf2' not found. This page may not use the wf2 class.");
    }
});




document.addEventListener('DOMContentLoaded', function () {
    // Check if we are on thankyou.html by examining the current URL
    if (!window.location.pathname.endsWith("thankyou.html")) {
        console.log("Not on thankyou.html, skipping timestamp logic.");
        return; // Exit the function if we're not on thankyou.html
    }

    // Retrieve the timestamp from sessionStorage
    const formTimestamp = sessionStorage.getItem('formTimestamp');
    const timestampDisplay = document.getElementById("timestampDisplay"); // Get the element

    if (formTimestamp && timestampDisplay) {
        timestampDisplay.innerHTML = new Date(formTimestamp).toLocaleString(); // Display the timestamp
    } else if (!timestampDisplay) {
        console.warn("Element with ID 'timestampDisplay' not found.");
    }
});


document.addEventListener("DOMContentLoaded", function () {
    console.log("Current Path:", window.location.pathname); // Logs the path of the current page
});

console.log("Current Path:", window.location.pathname); // Logs immediately when the script runs



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

const bnameInput = document.getElementById("bname");

if (bnameInput) {
    bnameInput.addEventListener("focusout", validateBName);
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

function validateBName() {
    const bnameInput = document.getElementById("bname"); // Select the business name input field
    const pattern = /^[a-zA-Z0-9\s\+\-\/\(\)!',_]{3,}$/; // Pattern for validation

    // Check if bnameInput is empty (length is 0)
    if (bnameInput.value.length === 0) {
        // Skip pattern validation for empty input
        return;
    }

    // If the value doesn't match the pattern
    if (!pattern.test(bnameInput.value)) {
        // Remove the focusout listener to prevent looping
        bnameInput.removeEventListener("focusout", validateBName);

        // Show alert
        alert("Business name must be at least 3 characters long, may contain alphanumeric characters, spaces, or + - / () ! ' , _.");

        // Clear the input field
        bnameInput.value = "";
        bnameInput.focus();
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



