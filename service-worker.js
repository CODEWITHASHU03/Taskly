self.addEventListener("install", function() {
    self.skipWaiting();
});

self.addEventListener("activate", function() {
    self.clients.claim();
});

self.addEventListener("message", function(event) {

    if (event.data.type === "task-reminder") {

        self.registration.showNotification("Taskly Reminder", {
            body: event.data.task,
            tag: "taskly-reminder"
        });

    }
});
