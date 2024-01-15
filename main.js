
//// Todo list section ////   

// Flag for checking if user did 
// interaction with note for note fadeIn:
let userNoteInteraction = false;

// Defined todo array:
let todoList = [];

// Add note and display:
function addNote() {

    // Cancel the submit operation:
    event.preventDefault();

    // Access to the elements:
    const taskBox = document.getElementById("taskBox");
    const dateBox = document.getElementById("dateBox");
    const timeBox = document.getElementById("timeBox");

    // Access to the values:
    const task = taskBox.value;
    const date = dateBox.value;
    const time = timeBox.value;

    // Check is future date:
    if (checkDate(date, time)) {

        // Defined as object and push to the todoList array:
        const todo = { task, date, time };
        todoList.push(todo);

        // Save to storage:
        saveToStorage();

        // User did interaction:
        userNoteInteraction = true;

        // Display on screen:
        displayTodoList();

        // Clear boxes:
        clearBoxes(taskBox, dateBox, timeBox);

        // Focus on task box:
        focusFirstBox();
    };
}

// Save every note to local storage:
function saveToStorage() {
    const json = JSON.stringify(todoList);
    localStorage.setItem("todoList", json);
}

// Loading storage note on screen:
function loadFromStorage() {
    const json = localStorage.getItem("todoList");
    todoList = json ? JSON.parse(json) : [];

    // Focus on task box:
    focusFirstBox();
}

// Display array:
function displayTodoList() {

    // Access to the elements:
    const container = document.getElementById("container");

    // Display user note on screen:
    let html = "";

    // Checking if user did interaction:
    if (userNoteInteraction) {
        for (let i = 0; i < todoList.length; i++) {
            html += `
            <style>
                .note:last-child,
                .xBox {
                    animation: fadeIn 1.3s;
                }
    
                @keyframes fadeIn {
                    0% {
                        opacity: 0;
                    }
    
                    100% {
                        opacity: 1;
                    }
                }
            </style>
            <div class="note">
                <div>
                    ${todoList[i].task}
                </div>
                <div>
                    ${todoList[i].date}
                    <button id="doneBtn" onclick="addNoteToArchive(${i})">Done<br><br><br><br>Move to archive</button>
                    <br>
                    ${todoList[i].time}
                </div>
                <button class="xBox" onclick="deleteMe(${i})">❌</button>
            </div>
            `;
        }

        // Display without fade in:
    } else {
        for (let i = 0; i < todoList.length; i++) {
            html += `
            <div class="note">
                <div>
                    ${todoList[i].task}
                </div>
                <div>
                    ${todoList[i].date}
                    <button id="doneBtn" onclick="addNoteToArchive(${i})">Done<br><br><br><br>Move to archive</button>
                    <br>
                    ${todoList[i].time}
                </div>
                <button class="xBox" onclick="deleteMe(${i})">❌</button>
            </div>
            `;
        }
    }
    container.innerHTML = html;
}

// Delete notes from array and storage:
function deleteMe(index) {

    // Delete the note from the array:
    todoList.splice(index, 1);

    // Save array back to storage:
    saveToStorage();

    // Display the updated array:
    displayTodoList();
}

// Check date from today to future:
function checkDate(date, time) {

    // Get the given date:
    const givenTime = time;
    const givenDate = new Date(date);
    const [givenYear, givenMonth, givenDay, givenHour, givenMinutes] = [
        parseInt(givenDate.getFullYear()),
        parseInt(givenDate.getMonth()),
        parseInt(givenDate.getDate()),
        parseInt(givenTime.slice(0, 2)),
        parseInt(givenTime.slice(3))
    ];

    // Get the current date:
    const now = new Date();
    const [currentYear, currentMonth, currentDay, currentHour, currentMinutes] = [
        parseInt(now.getFullYear()),
        parseInt(now.getMonth()),
        parseInt(now.getDate()),
        parseInt(now.getHours()),
        parseInt(now.getMinutes())
    ];

    // Check is a future date. if not: pop message: 24/11/2023 23:22
    if (givenYear > currentYear)
        return true;
    else if (givenYear === currentYear && givenMonth > currentMonth)
        return true;
    else if (givenYear === currentYear && givenMonth === currentMonth && givenDay > currentDay)
        return true;
    else if (givenYear === currentYear && givenMonth === currentMonth && givenDay === currentDay && givenHour > currentHour)
        return true;
    else if (givenYear === currentYear && givenMonth === currentMonth && givenDay === currentDay && givenHour === currentHour && givenMinutes > currentMinutes)
        return true;
    else {
        pop();
        return false;
    }
}

// Pop message of invalid date:
function pop() {
    const popMessage = document.getElementById("popMessage");

    let message = `
    <div id="openPopMessage">
        <div>
            <a href="#" title="Close" class="popMessageClose" onclick="closePopMessage()">Close</a>
            <h1>Error❗</h1>
            <div id="closeBox" class="errMessage">You can only enter a future date🙃</div>
        </div>
    </div>    
    `;
    popMessage.innerHTML = message;
}

// Close popup Message:
function closePopMessage() {
    const openPopMessage = document.getElementById("openPopMessage");
    openPopMessage.style.opacity = 0;
    openPopMessage.style.visibility = "hidden";
}

// Sort todo list at button event:
function sortByDate() {

    // Sort todo list by a date:
    todoList.sort(
        // Sort by date value in ascending order
        function sortTodoList(a, b) {

            // Create date and time for each object:
            const dateAndTimeA = a.date + " " + a.time;
            const dateAndTimeB = b.date + " " + b.time;

            // Convert the date strings to Date objects
            const dateA = new Date(dateAndTimeA);
            const dateB = new Date(dateAndTimeB);

            // Subtract the dates to get a value that is either negative, positive, or zero
            return dateA - dateB;
        });
}

// Display todo list sorting by a date:
function displayNoteByDate() {

    // Sort todo list by a date:
    if (todoList.length > 1)
        sortByDate();

    // Save to storage:
    saveToStorage();

    // Display on screen:
    displayTodoList();
}

// Clear boxes:
function clearBoxes(box1, box2, box3) {
    box1.value = "";
    box2.value = "";
    box3.value = "";
}

// Focus on task box:
function focusFirstBox() {
    const taskBox = document.getElementById("taskBox");
    taskBox.focus();
}

// Loading local storage for notes container and archive at user login:
function loadTodoListAndArchive() {
    loadFromStorage();
    displayTodoList();
    loadFromStorageToArchive();
    displayArchive();
}



//// Archive section ////

// Defined new archive list: 
let archiveList = [];

// Open archive:
function openArchive() {
    document.getElementById("mySideArchive").style.width = "300px";
}

// Close archive:
function closeArchive() {
    document.getElementById("mySideArchive").style.width = "0";

    // Focus on first box:
    focusFirstBox();
}

// Add note to archive:
function addNoteToArchive(index) {

    // User did interaction:
    userNoteInteraction = true;

    // Push to archiveList at click event:
    archiveList.push(todoList[index]);

    // Delete from todoList and display todoList:
    deleteMe(index);

    // Sort todo list by a date:    
    if (archiveList.length > 1) {
        archiveList.sort(
            // Sort by date value in ascending order
            function sortTodoList(a, b) {

                // Create date and time for each object:
                const dateAndTimeA = a.date + " " + a.time;
                const dateAndTimeB = b.date + " " + b.time;

                // Convert the date strings to Date objects
                const dateA = new Date(dateAndTimeA);
                const dateB = new Date(dateAndTimeB);

                // Subtract the dates to get a value that is either negative, positive, or zero
                return dateA - dateB;
            });
    }

    // Display archive:
    displayArchive();

    // Save archive to local storage:
    saveArchiveToStorage();
}

// Display archive:
function displayArchive() {

    // Access to archive element:
    const archive = document.getElementById("archive");

    // Display archive notes:
    let html = "";
    for (let i = 0; i < archiveList.length; i++) {
        html += `
        <div class="note">
            <div>
                ${archiveList[i].task}
            </div>
            <div>
                ${archiveList[i].date}
                <br>
                ${archiveList[i].time}
            </div>
            <button class="xBox" onclick="deleteNoteFromArchive(${i})">❌</button>
        </div>
        `;
    }
    archive.innerHTML = html;
}

// Delete note from archive:
function deleteNoteFromArchive(index) {

    // Delete the note from the array:
    archiveList.splice(index, 1);

    // Display archive:
    displayArchive();

    // Save archive to local storage:
    saveArchiveToStorage();
}

// Delete all archive notes:
function deleteAllArchiveNotes() {

    // Delete the note from the array:
    archiveList = [];

    // Display archive:
    displayArchive();

    // Save archive to local storage:
    saveArchiveToStorage();
}

// Save archive notes to local storage:
function saveArchiveToStorage() {
    const json = JSON.stringify(archiveList);
    localStorage.setItem("archiveList", json);
}

// Loading storage archive note on screen:
function loadFromStorageToArchive() {
    const json = localStorage.getItem("archiveList");
    archiveList = json ? JSON.parse(json) : [];
}