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





// JavaScript to fetch and display JSON data
document.addEventListener("DOMContentLoaded", () => {
    const articleElement = document.querySelector("article.grid");

    // Fetch the JSON data
    fetch("data/members.json")
        .then(response => response.json())
        .then(data => {
            // Iterate through the members array and create sections
            data.members.forEach(member => {
                const section = document.createElement("section");

                const placeholder = document.createElement("div");
                placeholder.className = "placeholder";
                placeholder.style.width = "150px"; // Fixed width for all images
                placeholder.style.aspectRatio = `${member.width} / ${member.height}`; // Dynamic aspect ratio
                placeholder.style.backgroundColor = "#f0f0f0"; // Neutral color placeholder

                const img = document.createElement("img");
                img.src = member.icon;
                img.alt = member.name;
                img.style.width = `${member.width}px`; // Responsive width
                img.style.height = `${member.height}px`; // Prevents oversizing
                img.style.objectFit = "cover"; // Ensures consistent scaling without distortion
                img.loading = "lazy";

                const h3 = document.createElement("h3");
                h3.textContent = member.name;

                const pAddress = document.createElement("p");
                pAddress.textContent = member.address;

                const pMembershipLevel = document.createElement("p");
                pMembershipLevel.textContent = `Membership Level: ${member.membershipLevel}`;

                const pMemberSince = document.createElement("p");
                pMemberSince.textContent = `Member Since: ${new Date(member.memberSince).toLocaleDateString()}`;

                const a = document.createElement("a");
                a.href = member.website;
                a.target = "_blank";
                a.textContent = member.website;

                // Append elements to the section
                section.appendChild(img);
                section.appendChild(h3);
                section.appendChild(pAddress);
                section.appendChild(pMembershipLevel);
                section.appendChild(pMemberSince);
                section.appendChild(a);

                // Append the section to the article
                articleElement.appendChild(section);
            });
        })
        .catch(error => {
            console.error("Error fetching JSON data:", error);
        });
});


// Select the buttons and the article element
const gridButton = document.getElementById("grid");
const listButton = document.getElementById("list");
const articleElement = document.querySelector("article.grid"); // The article element

// Add event listener to the grid button
gridButton.addEventListener("click", () => {
    articleElement.classList.add("grid"); // Apply grid view
    articleElement.classList.remove("list"); // Remove list view
});

// Add event listener to the list button
listButton.addEventListener("click", () => {
    articleElement.classList.add("list"); // Apply list view
    articleElement.classList.remove("grid"); // Remove grid view
});




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


