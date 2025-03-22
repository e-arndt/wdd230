document.getElementById("lastModified").innerHTML = document.lastModified;

const currentDate = new Date();
const yearSpan = document.querySelector('#currentYear');

yearSpan.innerText = currentDate.getFullYear();

const msToDays = 86400000;
const currentVisitTime = currentDate.getTime();

const visitMsg = document.querySelector(".visit-msg"); // Target the <span> element
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


// Store the selected elements that are going to be used. 
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

