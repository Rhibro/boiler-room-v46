let notesApp = [];

// load noted from local storage
window.addEventListener('load', () => {
    displayNote();
});

const noteInputElement = document.getElementById('note-input');
noteInputElement.addEventListener('input', function() {
    document.getElementById('error-message').innerHTML = '';
});

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (event) {
    event.preventDefault();
    addNote();
    console.log(notesApp);
})



function addNote() {
    const titleInputElement = document.getElementById('title-input');
    const noteInputElement = document.getElementById('note-input');
    const titleInput = titleInputElement.value;
    const userInput = noteInputElement.value;
    console.log(titleInput, userInput);

    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    const duplicateTitle = notes.some(note => note.title.toLowerCase() === titleInput.toLowerCase());
    if (duplicateTitle) {
        document.getElementById('error-message').innerHTML = 'You have used that title already, try something new!';
        return;
    }

    if (!titleInput.trim()) {
        document.getElementById('error-message').innerHTML = 'None of the fields can be left empty!';
        return;
    }
    if (!userInput.trim()) {
        document.getElementById('error-message').innerHTML = 'None of the fields can be left empty!'
        return;
    }
    const noteObject = {
        title: titleInput,
        content: userInput,
        date: new Date().toLocaleDateString()
    };

    notes.push(noteObject);
    localStorage.setItem('notes', JSON.stringify(notes));

    titleInputElement.value = '';
    noteInputElement.value = '';
    displayNote(); 
}


function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNote();
}

function displayNote() {
    const container = document.getElementById('notesDisplay');
    container.innerHTML = '';
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    if (notes.length === 0) {
        container.innerHTML = '<p>No notes available</p>';
        return;
    }

    notes.forEach((note, index) => {
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

        // Add date
        const dateElement = document.createElement('small');
        dateElement.textContent = note.date;
        dateElement.className = 'note-date';

        // Add click handler to toggle expansion
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

const searchInput = document.getElementById('search-input'); // adjust ID to match your HTML
searchInput.addEventListener('input', filterNotes);

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
  