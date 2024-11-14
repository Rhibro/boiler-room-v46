let notesApp = [];

// load noted from local storage
// window.addEventListener('load', () => {
//     loadNoteFromLocalStorage();
// });

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
}

function deleteNote() {
    
}

function displayNote() {
    const container = document.querySelector('note-container');
    container.innerHTML = '';
    notesApp.forEach((note) => {
        const noteItem = document.createElement('div');
        noteItem.className = 'note-item';
    })
}

// // triggers addNote function when button is clicked
// document.getElementById('addBtn').addEventListener('click', (event) => {
//     event.preventDefault();
//     addNote();
//     console.log(notesApp);
// });

// // function allows user to edit note
// function editNote(note) {
//     toggleModal('Adjust Title', 'Here you can change you note', 'Edit');
//     document.getElementById('editBtn').addEventListener('click', (event) => {
//         event.preventDefault();
//         const noteInputElement = document.getElementById('modal-input');
//         const userIput = noteInputElement.value;
//         notesApp[note.id -1].description = userIput;
//         displayNote();
//     })
// }

// function toggleModal(title, description, type) {
//     const modalOverlay = document.getElementById("modalOverlay");
//     const modalInput = document.getElementById("modal-input");
//     const editBtn = document.getElementById("editBtn");
//     modalOverlay.style.display = "flex";
  
//     const modalTitle = document.getElementById("modalTitle");
//     modalTitle.textContent = title;
  
//     const modalDescription = document.getElementById("modalDescription");
//     modalDescription.textContent = description;
  
//     closeButton.addEventListener("click", () => {
//       modalOverlay.style.display = "none";
//     });
//     if (type !== "edit") {
//       modalInput.style.display = "none";
//       editBtn.style.display = "none";
//     }
//     if (type === "edit") {
//       modalInput.style.display = "block";
//     }
//   }


// // function to actually add a note, and handles for empty fields
//   function addNote() {
//     const noteInputElement = document.getElementById('note-input');
//     const userIput = noteInputElement.value;
//     if (!userIput) {
//         toggleModal (
//             'You must write something in the empty field'
//         );
//         return;
//     }
//   }

// // a loop to make sure there are no repeats 
//   for (let i = 0; i < notesApp.length; i++) {
//     if (notesApp[i].description.toLowerCase() === userIput.toLowerCase()) {
//         toggleModal (
//             `You have already written ${userIput}, write a new idea!`
//         );
        
//     }
//   }

//   const note = {
//     description: userIput,
//     id: notesApp.length + 1,
//   };

//   notesApp.push(note);
//   saveNoteToLocalStorage();
//   displayNote();
//   noteInputElement.value = '';

//   function displayNote() {
//     const container = document.querySelector('.container-note');
//     const completeContainer = document.querySelector('.complete-notes');
//     container.innerHTML = '';
//     notesApp.forEach((note) => {
//         const noteItem = document.createElement('div');
//         noteItem.className = 'task-item';

//         const noteDescription = document.createElement('p');
//         noteDescription.className = 'note';
//         noteDescription.textContent = note.description;

//         const iconsDiv = document.createElement("div");
//         iconsDiv.className = "icons";
    
//         const editIcon = document.createElement("i");
//         editIcon.className = "fa-solid fa-edit edit";

//         const deleteIcon = document.createElement("i");
//         deleteIcon.className = "fa-solid fa-trash-can delete";
 
//         iconsDiv.appendChild(editIcon);
//         iconsDiv.appendChild(deleteIcon);
//         taskItem.appendChild(noteDescription);
//         taskItem.appendChild(iconsDiv);

//         editIcon.addEventListener('click', () => {
//             editNote(note);
//         });
//         container.appendChild(noteItem);
//     });
//   }

//   function saveNoteToLocalStorage() {
//     localStorage.setItem('notesApp', JSON.stringify(note));
//   }

//   function loadNoteFromLocalStorage() {
//     const storedNote = localStorage.getItem('notesApp');
//     if (storedNote) {
//         notesApp = JSON.parse(storedNote);
//         notesApp.forEach((note) => displayNote(note));
//     }
//   }