let notesApp = [];

// loads note from local storage
window.addEventListener('load', () => {
    displayNote();
});

// clears away the error message when user has typed something in both input fields
const noteInputElement = document.getElementById('note-input');
noteInputElement.addEventListener('input', function() {
    document.getElementById('error-message').innerHTML = '';
});

// attaches an eventListener to addBtn to trigger the addNote function 
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (event) {
    event.preventDefault(); // prevents page from reloading 
    addNote();
    console.log(notesApp);
})

// this functions checks for errors, ensures titles are unique,
// creates note object, stores note in localStorage
// updates display to show newly added note 
function addNote() {

    // retrieves html elements with IDs and extracts the values in the fields (user input)
    const titleInputElement = document.getElementById('title-input');
    const noteInputElement = document.getElementById('note-input');
    const titleInput = titleInputElement.value;
    const userInput = noteInputElement.value;
    console.log(titleInput, userInput);

    // converts json string into an array using parse()
    // if there aren't any notes stored it initializes and empty array [] so no errors are thrown 
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    // doesn't allow you to use the same title twice and initiates an error message 
    // uses some() to check if any notes already have the same title
    const duplicateTitle = notes.some(note => note.title.toLowerCase() === titleInput.toLowerCase());
    if (duplicateTitle) {
        document.getElementById('error-message').innerHTML = 'You have used that title already, try something new!';
        return;
    }

    // checks to see if the fields are empty or contain whitespave with trim() 
    // (title and content) if empty user gets an error message
    if (!titleInput.trim()) {
        document.getElementById('error-message').innerHTML = 'None of the fields can be left empty!';
        return;
    }
    if (!userInput.trim()) {
        document.getElementById('error-message').innerHTML = 'None of the fields can be left empty!'
        return;
    }

    // constructs the object
    const noteObject = {
        title: titleInput,
        content: userInput,
        date: new Date().toLocaleDateString() //readable for humans
    };

    // adds noteObject to notes array 
    // updates local storage by converting the updated notes arrys back to a Json string
    // using stringify() and storing it under key notes
    notes.push(noteObject);
    localStorage.setItem('notes', JSON.stringify(notes));

    // empties the input fields and displays the note 
    titleInputElement.value = '';
    noteInputElement.value = '';
    displayNote(); 
}

// deletes note by finding it in local storage removing it then stringifying the nptes once again to be displayed 
function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNote();
}

// displays created notes
function displayNote() {
    const container = document.getElementById('notesDisplay');
    container.innerHTML = '';
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    // if there are no notes a message will appear saying so
    if (notes.length === 0) {
        container.innerHTML = '<p>No notes available</p>';
        return;
    }

    // creates the elements to display the notes 
    notes.forEach((note, index) => {
        
        // Creates note container
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
       
        // Creates note content container
        const textContainer = document.createElement('div');
        textContainer.className = 'note-content collapsed';
        
        // Adds title
        const titleElement = document.createElement('h3');
        titleElement.textContent = note.title;
        
        // Adds content
        const contentElement = document.createElement('p');
        contentElement.textContent = note.content;
       
        // Adds icons
        const iconsDiv = document.createElement('div');
        iconsDiv.className = 'icons';
        
        // Creates edit icon
        const editIcon = document.createElement('i');
        editIcon.className = 'fa-solid fa-edit';
        editIcon.addEventListener('click', () => editNote(index));
        
        // Creates delete icon
        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'fa-solid fa-trash-can';
        deleteIcon.addEventListener('click', () => deleteNote(index));

        // Adds date
        const dateElement = document.createElement('small');
        dateElement.textContent = note.date;
        dateElement.className = 'note-date';

        // Adds click handler to toggle expansion
        textContainer.addEventListener('click', () => {
            textContainer.classList.toggle('collapsed');
            textContainer.classList.toggle('expanded');
        });
        
        // Assemble the elements
        textContainer.appendChild(titleElement);
        textContainer.appendChild(contentElement);
        iconsDiv.appendChild(editIcon);
        iconsDiv.appendChild(deleteIcon);
        textContainer.appendChild(dateElement);
        noteElement.appendChild(textContainer);
        noteElement.appendChild(iconsDiv);
        container.appendChild(noteElement);
    });
}

// calls on the search input field to be used for filterNotes function 
const searchInput = document.getElementById('search-input'); 
searchInput.addEventListener('input', filterNotes);


// filters notes based on title 
function filterNotes() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const container = document.getElementById('notesDisplay');
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    
    container.innerHTML = '';
    
    // If search is empty, show all notes
    if (!searchTerm) {
        displayNote();
        return;
    }
    
    // Filter notes based on search term
    const filteredNotes = notes.filter(note => 
        note.title.toLowerCase().includes(searchTerm)
    );
    
    // Display message if no matches found
    if (filteredNotes.length === 0) {
        container.innerHTML = '<p>No matching notes found</p>';
        return;
    }
    
    // Display filtered notes
    filteredNotes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
       
        // Create note content container
        const textContainer = document.createElement('div');
        textContainer.className = 'note-content collapsed';
        
        // Add title
        const titleElement = document.createElement('h3');
        titleElement.textContent = note.title;
        
        // Add content
        const contentElement = document.createElement('p');
        contentElement.textContent = note.content;
       
        // Add date
        const dateElement = document.createElement('small');
        dateElement.textContent = note.date;
        dateElement.className = 'note-date';

        // Add icons
        const iconsDiv = document.createElement('div');
        iconsDiv.className = 'icons';
        
        // Create edit icon
        const editIcon = document.createElement('i');
        editIcon.className = 'fa-solid fa-edit';
        editIcon.addEventListener('click', () => editNote(index));
        
        // Create delete icon
        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'fa-solid fa-trash-can';
        deleteIcon.addEventListener('click', () => deleteNote(index));

        // Add click handler to toggle expansion
        textContainer.addEventListener('click', () => {
            textContainer.classList.toggle('collapsed');
            textContainer.classList.toggle('expanded');
        });
        
        // Assemble the elements
        textContainer.appendChild(titleElement);
        textContainer.appendChild(contentElement);
        textContainer.appendChild(dateElement);
        iconsDiv.appendChild(editIcon);
        iconsDiv.appendChild(deleteIcon);
        noteElement.appendChild(textContainer);
        noteElement.appendChild(iconsDiv);
        container.appendChild(noteElement);
    });    
}
  
// function editNote(index) {
//     const notes = JSON.parse(localStorage.getItem('notes')) || [];
//     const note = notes[index];
    
//     // Fill the input fields with current note data
//     const titleInputElement = document.getElementById('title-input');
//     const noteInputElement = document.getElementById('note-input');
//     titleInputElement.value = note.title;
//     noteInputElement.value = note.content;

//     const editBtn = document.getElementsByClassName('fa-solid fa-edit');
//     editBtn.textContent = 'Update Note';

//     // editBtn.onclick = function(e) {
//     //     e.preventDefault();
//     // }

//     const newTitle = titleInputElement.value;
//         const newContent = noteInputElement.value;
        
//         // Check for empty fields
//         if (!newTitle.trim() || !newContent.trim()) {
//             document.getElementById('error-message').innerHTML = 'None of the fields can be left empty!';
//             return;
//         }
        
//         // Check for duplicate titles (excluding the current note)
//         const duplicateTitle = notes.some((note, i) => 
//             i !== index && note.title.toLowerCase() === newTitle.toLowerCase()
//         );
//         if (duplicateTitle) {
//             document.getElementById('error-message').innerHTML = 'You have used that title already, try something new!';
//             return;
//         }
        
//         // Update the note
//         notes[index] = {
//             title: newTitle,
//             content: newContent,
//             date: note.date // Keep the original creation date
//         };
        
//         // Save to localStorage
//         localStorage.setItem('notes', JSON.stringify(notes));
        
//         // Clear inputs and reset button
//         titleInputElement.value = '';
//         noteInputElement.value = '';
        
        
//         // Refresh the display
//         displayNote();
//     };


//     let editBtn = document.getElementsByClassName('fa-solid fa-edit');
//     editBtn.addEventListener('click', function (event) {
//         event.preventDefault();
//         editNote();
//     })

