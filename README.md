# Todo List Application

This repository contains the source code for a simple Todo List application built using HTML, CSS, and JavaScript.

## Files

### JavaScript File: main.js

This JavaScript file contains the logic for managing the Todo List functionality.

#### Todo list section

- **`userNoteInteraction`**: Flag for checking if the user interacted with a note for note fadeIn effect.
- **`todoList`**: Array to store the todo items.
- **`addNote()`**: Function to add a new note to the todo list.
- **`saveToStorage()`**: Function to save the todo list to local storage.
- **`loadFromStorage()`**: Function to load todo list from local storage.
- **`displayTodoList()`**: Function to display the todo list on the screen.
- **`deleteMe(index)`**: Function to delete a note from the todo list.
- **`checkDate(date, time)`**: Function to check if the date entered is in the future.
- **`pop()`**: Function to display a pop-up message for invalid date.
- **`closePopMessage()`**: Function to close the pop-up message.
- **`sortByDate()`**: Function to sort the todo list by date.
- **`displayNoteByDate()`**: Function to display the todo list sorted by date.
- **`clearBoxes(box1, box2, box3)`**: Function to clear input boxes.
- **`loadTodoListAndArchive()`**: Function to load todo list and archive from local storage.

#### Archive section

- **`archiveList`**: Array to store archived todo items.
- **`openArchive()`**: Function to open the archive.
- **`closeArchive()`**: Function to close the archive.
- **`addNoteToArchive(index)`**: Function to move a note to the archive.
- **`displayArchive()`**: Function to display archived notes.
- **`deleteNoteFromArchive(index)`**: Function to delete a note from the archive.
- **`deleteAllArchiveNotes()`**: Function to delete all notes from the archive.
- **`saveArchiveToStorage()`**: Function to save the archive to local storage.
- **`loadFromStorageToArchive()`**: Function to load archive from local storage.

### HTML File: index.html

This HTML file contains the structure of the Todo List application.

### CSS File: style.css

This CSS file contains the styles for the Todo List application.

## How to Use

1. Open the `index.html` file in your web browser.
2. Enter a task, date, and time in the form fields.
3. Click the "Add" button to add the task to the Todo list.
4. Click the "Sort By Date" button to sort the Todo list by date.
5. Click the "Archive Notes" button to view archived notes.
6. Click on the "Done" button to move a task to the archive.
7. Click on the ❌ button to delete a task from the Todo list or archive.

## Author

This Todo List application was created by Itamar Ben Ari.

