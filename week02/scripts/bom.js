const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');
const message = document.createElement('p'); // Create the message element
message.id = 'message';
document.querySelector('main').appendChild(message); // Append message to main

button.addEventListener('click', () => {
    const chapter = input.value;
    if (chapter !== '') {
        const listItem = document.createElement('li');
        listItem.textContent = chapter;

        // Create the delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.addEventListener('click', () => {
            list.removeChild(listItem);
        });

        // Append the delete button to the list item
        listItem.appendChild(deleteButton);

        // Append the list item to the list
        list.appendChild(listItem);

        input.value = '';
        input.focus();
        message.textContent = ''; // Clear the message
    } else {
        message.textContent = 'Please enter a book and chapter.'; // Display the message
    }
});
