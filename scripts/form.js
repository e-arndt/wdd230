
document.getElementById("lastModified").innerHTML = document.lastModified;

const currentDate = new Date();
const yearSpan = document.querySelector('#currentYear');

yearSpan.innerText = currentDate.getFullYear();


const pass1 = document.getElementById("pass1");
const pass2 = document.getElementById("pass2");

// Store the selected elements that we are going to use. 
const mainnav = document.querySelector('.navigation')
const hambutton = document.querySelector('#menu');

const modeButton = document.querySelector("#dMode");
const main = document.querySelector("main");
const modeIcon = document.querySelector("#modeIcon");
const modeText = document.querySelector("#modeText");

// Add a click event listender to the hamburger button and use a callback function that toggles the list element's list of classes.
hambutton.addEventListener('click', () => {
	mainnav.classList.toggle('show');
	hambutton.classList.toggle('show');
});

modeButton.addEventListener("click", () => {
	if (modeIcon.getAttribute("src") === "images/dark-reader-icon.png") {
        // Switch to Light Mode
        main.classList.add("dark-mode"); // Add a class for dark mode CSS to main only
        modeIcon.setAttribute("src", "images/bright.png"); // Change the image to the light mode icon
        modeText.textContent = "Go Light"; // Change the span text to Light Mode
    } else {
        // Switch back to Dark Mode
        main.classList.remove("dark-mode"); // Remove the dark mode class from main only
        modeIcon.setAttribute("src", "images/dark-reader-icon.png"); // Change the image back to the dark mode icon
        modeText.textContent = "Go Dark"; // Change the span text back to Dark Mode
    }
});

// Pattern validation function for pass1
function validatePassword() {
    const pattern = /^[a-zA-Z0-9]{8,}$/;

    // Check if pass1.value is empty (length is 0)
    if (pass1.value.length === 0) {
        // Skip pattern validation for empty input
        return;
    }

    // If the value doesn't match the pattern
    if (!pattern.test(pass1.value)) {
        // Remove the focusout listener to prevent looping
        pass1.removeEventListener("focusout", validatePassword);

        // Show alert
        alert("Password must be at least 8 characters long and contain only letters and numbers.");

        // Clear the input field
        pass1.value = "";
        pass1.focus();
    }
}


// Match validation function for pass2
pass2.addEventListener("focusout", function () {
    if (pass1.value !== pass2.value) {
        // Remove the focusout listener to prevent looping
        pass1.removeEventListener("focusout", validatePassword);
        // Show alert
        alert("Passwords do not match! Please try again.");

        // Clear both input fields
        pass1.value = "";
        pass2.value = "";

        // Set focus back to pass1
        pass1.focus();
    }
});

// Only attach pass1 focusout validation when user clicks on it
pass1.addEventListener("click", function () {
    pass1.addEventListener("focusout", validatePassword);
});


const emailInput = document.getElementById("email");

// Define the email validation function
function validateEmail() {
    const emailValue = emailInput.value;

    // Combined pattern: Ensure at least one valid character before @byui.edu
    const emailPattern = /^[a-zA-Z0-9._%+-]+@byui\.edu$/;

    // Additional check: Ensure there's at least one character before @byui.edu
    if (!emailPattern.test(emailValue) || emailValue.startsWith("@byui.edu")) {
        // Show alert
        alert("Email must be a valid byui.edu email address, e.g., 'Me2@byui.edu'.");

        // Clear the field
        emailInput.value = "";

        // Remove the focusout listener temporarily to prevent looping
        emailInput.removeEventListener("focusout", validateEmail);

        // Refocus on the email field for re-entry
        emailInput.focus();
    }
}

// Attach focusout validation only when the user clicks on the email field
emailInput.addEventListener("click", function () {
    emailInput.addEventListener("focusout", validateEmail);
});


const ratingInput = document.getElementById("rating");
    const ratingValue = document.getElementById("rating-value");

    // Set an initial value for the range
    ratingValue.textContent = ratingInput.value;

    // Update the displayed value dynamically as the slider changes
    ratingInput.addEventListener("input", function () {
        ratingValue.textContent = ratingInput.value;
    });
