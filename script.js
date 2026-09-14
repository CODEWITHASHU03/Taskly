const taskInput = document.querySelector(".task-input input");
const addButton = document.querySelector("#add-task");
const tasksContainer = document.querySelector(".tasks");
const deleteAllButton = document.querySelector("#delete-all");

const dateTimeButton = document.querySelector("#pick-date-time");
const dateTimeInput = document.querySelector("#task-date");
let selectedDateTime = "";

function playCompleteSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
        900,
        audioContext.currentTime + 0.12
    );

    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.15
    );

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.15);
}



dateTimeButton.addEventListener("click", function() {
    dateTimeInput.showPicker();
});
dateTimeInput.addEventListener("change", function() {
    selectedDateTime = dateTimeInput.value;
});

function setupTask(task) {

    const checkbox = task.querySelector(".checkbox");
    const deleteButton = task.querySelector(".delete-button");

    checkbox.addEventListener("click", function(event) {
        event.stopPropagation();

        checkbox.classList.toggle("checked");
task.classList.toggle("completed");

if (task.classList.contains("completed")) {
    playCompleteSound();
}

updateCounter();

        localStorage.setItem("tasks", tasksContainer.innerHTML);
    });

    deleteButton.addEventListener("click", function(event) {
        event.stopPropagation();

        task.remove();
        updateCounter();

        localStorage.setItem("tasks", tasksContainer.innerHTML);
    });
}


addButton.addEventListener("click", function() {

    if (taskInput.value.trim() === "" || selectedDateTime === "") {
    alert("Please enter a task and select a date & time.");
    return;
}

    const newTask = document.createElement("div");
    newTask.classList.add("task");
    newTask.dataset.reminder = selectedDateTime;

    const checkbox = document.createElement("button");
    checkbox.classList.add("checkbox");

    const taskText = document.createElement("span");
    taskText.textContent = taskInput.value;

    const taskDate = document.createElement("small");

  const date = new Date(selectedDateTime);

  taskDate.textContent = date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true
});

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");

    newTask.appendChild(checkbox);
    newTask.appendChild(taskText);
    newTask.appendChild(taskDate);
    newTask.appendChild(deleteButton);

    tasksContainer.appendChild(newTask);

    setupTask(newTask);

    localStorage.setItem("tasks", tasksContainer.innerHTML);
    updateCounter();
    taskInput.value = "";
});


function loadTasks() {

    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {

        tasksContainer.innerHTML = savedTasks;

        const savedTaskElements =
            tasksContainer.querySelectorAll(".task");

        savedTaskElements.forEach(function(task) {
            setupTask(task);
        });
    }
}

function updateCounter() {

    const allTasks = tasksContainer.querySelectorAll(".task");
    const completedTasks = tasksContainer.querySelectorAll(".task.completed");

    document.querySelector(".task-counter").firstChild.textContent =
        "Tasks: " + allTasks.length +
        " | Completed: " + completedTasks.length;

    let percentage = 0;

    if (allTasks.length > 0) {
        percentage = Math.round(
            (completedTasks.length / allTasks.length) * 100
        );
    }

    document.querySelector(".progress").style.width =
        percentage + "%";

    document.querySelector(".progress-text").textContent =
        percentage + "%";
}
deleteAllButton.addEventListener("click", function() {

    const confirmDelete = confirm("Delete all tasks?");

    if (confirmDelete) {

        tasksContainer.innerHTML = "";

        localStorage.removeItem("tasks");

        updateCounter();
    }
});
loadTasks();
updateCounter();
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js")
        .then(function() {
            console.log("Taskly service worker registered");
        })
        .catch(function(error) {
            console.log("Service worker registration failed:", error);
        });
}
Notification.requestPermission().then(function(permission) {
    console.log("Notification permission:", permission);
});


function checkReminders() {
    console.log("REMINDER CHECK IS RUNNING");

    const allTasks = tasksContainer.querySelectorAll(".task");
    const now = new Date();

    allTasks.forEach(function(task) {

    const reminderTime = task.dataset.reminder;

    console.log("Reminder:", reminderTime);

        if (!reminderTime) {
            return;
        }

        const reminderDate = new Date(reminderTime);
        
        console.log("Now:", now);
        console.log("Reminder date:", reminderDate);
        console.log("Is due:", now >= reminderDate);



        if (now >= reminderDate && !task.dataset.reminded) {

            console.log("INSIDE REMINDER BLOCK");

        const taskName = task.querySelector("span").textContent;

console.log("Sending reminder:", taskName);

navigator.serviceWorker.ready.then(function(registration) {

    registration.showNotification("Taskly Reminder", {
        body: taskName,
        tag: "taskly-" + Date.now()
    });

});

task.dataset.reminded = "true";

            localStorage.setItem("tasks", tasksContainer.innerHTML);
        }
    });
}

setInterval(checkReminders, 1000);
