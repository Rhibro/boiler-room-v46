let notesApp = [];

// load noted from local storage
window.addEventListener('load', () => {
    loadNoteFromLocalStorage();
});

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (event) {
    event.preventDefault();
    addNote();
    console.log(notesApp);
})

let deleteBtn = document.getElementById('delete');
deleteBtn.addEventListener('click', function (event){
    event.preventDefault();
    deleteNote();
})

function addNote() {
    const noteInputElement = document.getElementById('note-input');
    const userInput = noteInputElement.value;
    console.log(userInput);

    if (!userInput.trim()) {
        alert('Please enter a note');
        return;
    }
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(userInput);
    localStorage.setItem('notes', JSON.stringify(notes));
    noteInputElement.value = '';
    displayNote();
}



function deleteNote() {
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
        const noteText = document.createElement('p');
        noteText.textContent = note;
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
        
        // Assemble the elements
        iconsDiv.appendChild(editIcon);
        iconsDiv.appendChild(deleteIcon);
        noteElement.appendChild(noteText);
        noteElement.appendChild(iconsDiv);
        container.appendChild(noteElement);
    });
}

