const baseURL = "https://e-arndt.github.io/wdd230/";
const linksURL = "https://e-arndt.github.io/wdd230/data/links.json";

async function getLinks() {
    try {
        const response = await fetch(linksURL); // Fetch the JSON data
        if (response.ok) {
            const data = await response.json(); // Parse the JSON
            console.log(data);
            displayLinks(data.weeks); // Pass the weeks data to displayLinks
        } else {
            throw Error(await response.text()); // Handle errors
        }
    } catch (error) {
        console.log(error); // Log errors for debugging
    }
}


const displayLinks = (weeks) => {
    weeks.forEach((week, index) => {
        const listItem = document.querySelector(`.wk0${index + 1}-link`); // Dynamically target <li> elements using classes (wk01-link, wk02-link, etc.)
        if (listItem) {
            // Clear existing content in <li>
            listItem.innerHTML = `<span>${week.week}: </span>`; // Add the week label

            // Append links to the <li>
            week.links.forEach((link, linkIndex) => {
                const anchor = document.createElement('a'); // Create an <a> element
                anchor.href = link.url; // Set the href attribute
                // anchor.target = '_blank'; // Open links in a new tab, might comment this out
                anchor.textContent = link.title; // Add link text
                listItem.appendChild(anchor); // Append the <a> element to <li>

                // Add a comma separator unless it's the last link
                if (linkIndex < week.links.length - 1) {
                    const separator = document.createTextNode(", ");
                    listItem.appendChild(separator);
                }
            });
        }
    });
};





getLinks();