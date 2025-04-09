document.addEventListener("DOMContentLoaded", () => {
    

// Function to dynamically generate and display spotlight members
function displaySpotlightMembers() {
    // Clear existing spotlight members
    const row2Container = document.querySelector(".row2");
    row2Container.innerHTML = ""; // Clear the container
  
    fetch("data/members.json")
      .then(response => response.json())
      .then(data => {
        // Step 1: Filter members with Silver or Gold membership levels
        const spotlightCandidates = data.members.filter(
          member => member.membershipLevel === "Silver" || member.membershipLevel === "Gold"
        );
  
        // Step 2: Shuffle the array (Fisher-Yates algorithm)
        for (let i = spotlightCandidates.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [spotlightCandidates[i], spotlightCandidates[j]] = [spotlightCandidates[j], spotlightCandidates[i]];
        }
  
        // Step 3: Pick the first 3 spotlight members
        const spotlightMembers = spotlightCandidates.slice(0, 3);
  
        // Step 4: Dynamically create and append spotlight sections
        spotlightMembers.forEach(member => {
          const section = document.createElement("section");
          section.className = "card";
  
          // Create card header
          const headerDiv = document.createElement("div");
          headerDiv.className = "card-header";
          const h2 = document.createElement("h2");
          h2.textContent = "Member Spotlight";
          headerDiv.appendChild(h2);
  
          // Create card content
          const contentDiv = document.createElement("div");
          contentDiv.className = "card-content";
  
          // Create image container
          const imgDiv = document.createElement("div");
          imgDiv.className = "spot-img";
          const img = document.createElement("img");
          img.src = member.icon;
          img.alt = `${member.name} logo`;
          img.loading = "lazy";
          img.style.width = `${member.width}px`;
          img.style.height = `${member.height}px`;
          imgDiv.appendChild(img);
  
          // Create contact container
          const contactDiv = document.createElement("div");
          contactDiv.className = "spot-contact";
  
          const nameP = document.createElement("p");
          nameP.textContent = member.name;
  
          const phoneP = document.createElement("p");
          phoneP.textContent = `📞 ${member.phone}`;
  
          const emailP = document.createElement("p");
          emailP.textContent = `📧 ${member.email}`;
  
          contactDiv.appendChild(nameP);
          contactDiv.appendChild(phoneP);
          contactDiv.appendChild(emailP);
  
          // Create website link
          const websiteLink = document.createElement("a");
          websiteLink.href = member.website;
          websiteLink.target = "_blank";
          websiteLink.textContent = member.website;
  
          // Append all elements to the content div
          contentDiv.appendChild(imgDiv);
          contentDiv.appendChild(contactDiv);
          contentDiv.appendChild(websiteLink);
  
          // Append header and content to the section
          section.appendChild(headerDiv);
          section.appendChild(contentDiv);
  
          // Append the section to the container
          row2Container.appendChild(section);
        });
      })
      .catch(error => {
        console.error("Error fetching member data:", error);
      });
  }
  
  // Initial call to display spotlight members
  displaySpotlightMembers();
  
  // Set an interval to refresh spotlight members every 90 seconds
  setInterval(displaySpotlightMembers, 90000); // 90 seconds = 90000 milliseconds
});