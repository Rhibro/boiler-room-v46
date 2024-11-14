let notesApp = [];

// load noted from local storage
window.addEventListener('load', () => {
    loadNoteFromLocalStorage();
});

// triggers addNote function when button is clicked
document.getElementById('addBtn').addEventListener('click', (event) => {
    event.preventDefault();
    addNote();
    console.log(notesApp);
});

// function allows user to edit note
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


// function to actually add a note, and handles for empty fields
  function addNote() {
    const noteInputElement = document.getElementById('note-input');
    const userIput = noteInputElement.value;
    if (!userIput) {
        toggleModal (
            'You must write something in the empty field'
        );
        return;
    }
  }

// a loop to make sure there are no repeats 
  for (let i = 0; i < notesApp.length; i++) {
    if (notesApp[i].description.toLowerCase() === userIput.toLowerCase()) {
        toggleModal (
            `You have already written ${userIput}, write a new idea!`
        );
        return;
    }
  }

  const note = {
    description: userIput,
    id: notesApp.length + 1,
  }

  notesApp.push(note);
  saveNoteToLocalStorage();
  displayNote();
  noteInputElement.value = '';
