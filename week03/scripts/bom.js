// Declare the array, try to get list data from function, if first visit or
// if no localStorage, return empty array
let chaptersArray = getChapterList() || []



const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');
const message = document.createElement('p'); // Create the message element
message.id = 'message';
document.querySelector('main').appendChild(message); // Append message to main

button.addEventListener('click', () => {
    const chapter = input.value.trim(); // Trim whitespace around input
    if (chapter !== '') {
        // Check if the chapter already exists in the array
        if (!chaptersArray.includes(chapter)) {
            // Call the displayList function with the chapter
            displayList(chapter);
            chaptersArray.push(chapter);

            // Update localStorage with the new array
            setChapterList();
        } else {
            // Show error message
            message.textContent = 'This chapter is already in your list.';
            
            // Delay clearing the error message
            setTimeout(() => {
                message.textContent = '';
            }, 3000); // Clear after 3 seconds
        }

        // Clear the input field and reset focus
        input.value = '';
        input.focus();
    } else {
        // Display the message if input is empty
        message.textContent = 'Please enter a book and chapter.';
        
        // Delay clearing the error message
        setTimeout(() => {
            message.textContent = '';
        }, 3000); // Clear after 3 seconds
    }
});



function deleteChapter(chapter) {
    // Remove the ❌ and trim any extra whitespace
    const trimmedChapter = chapter.replace('❌', '').trim();

    // Remove the chapter from chaptersArray
    chaptersArray = chaptersArray.filter(item => item !== trimmedChapter);

    // Update localStorage
    setChapterList();
}


function getChapterList() {
    return JSON.parse(localStorage.getItem('favBOMchapters'));
}


function setChapterList() {
    // Convert chaptersArray to a JSON string and save it in localStorage
    localStorage.setItem('favBOMchapters', JSON.stringify(chaptersArray));
}

function displayList(item) {
    const listItem = document.createElement('li'); listItem.textContent = item; 

    // Create the delete button 
    const deleteButton = document.createElement('button'); 
    deleteButton.textContent = '❌';
    deleteButton.setAttribute('aria-label', `Delete ${item}`);


    deleteButton.addEventListener('click', () => {
    list.removeChild(listItem);
    deleteChapter(listItem.textContent); // Remove from chaptersArray and localStorage
    input.focus(); // Refocus on the input field
    });
 

    // Append the delete button to the list item 
    listItem.appendChild(deleteButton); 

    // Append the list item to the list
    list.appendChild(listItem); 

}


// Ensure chapters from localStorage are displayed on page load
document.addEventListener("DOMContentLoaded", () => {
    // Load chapters from localStorage and display them
    const chapters = getChapterList();
    chapters.forEach(chapter => displayList(chapter)); // Display each chapter from localStorage
});
