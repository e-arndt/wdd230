// Declare the array, try to get list data from function, if first visit or
// if no localStorage, return empty array
const chaptersArray = getChapterList() || []



const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');
const message = document.createElement('p'); // Create the message element
message.id = 'message';
document.querySelector('main').appendChild(message); // Append message to main

button.addEventListener('click', () => {
    const chapter = input.value;
    if (chapter !== '') {
        // Call the displayList function with the chapter
        displayList(chapter);
        chaptersArray.push(chapter);

        // Push the chapter into the chaptersArray
        chaptersArray.push(chapter);

        // Clear the input field and reset focus
        input.value = '';
        input.focus();
        message.textContent = ''; // Clear the message
    } else {
        message.textContent = 'Please enter a book and chapter.'; // Display the message
    }
});

function deleteChapter(chapter) {
    chapter = chapter.slice(0, chapter.length - 1);
    chaptersArray = chaptersArray.filter(item => item !== chapter);
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

    deleteButton.addEventListener('click', () => {
    list.removeChild(listItem);
    deleteChapter(listItem.textContent); // Remove from chaptersArray and localStorage
    input.focus(); // Refocus on the input field
    });
 

    // Append the delete button to the list item 
    listItem.appendChild(deleteButton); 

    // Append the list item to the list
    list.appendChild(listItem); 

    input.value = '';
    input.focus();
    message.textContent = '';
}
