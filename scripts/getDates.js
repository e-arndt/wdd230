document.getElementById("lastModified").innerHTML = document.lastModified;

const currentDate = new Date();
const yearSpan = document.querySelector('#currentYear');

yearSpan.innerText = currentDate.getFullYear();

const displayVisits = document.querySelector(".visits");

let numVisits = Number(window.localStorage.getItem("storedVisits")) || 0;

if (numVisits !== 0) {
	displayVisits.textContent = numVisits;
} else {
	displayVisits.textContent = `🥳 First Visit`;
}

numVisits++;

localStorage.setItem("storedVisits", numVisits);

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