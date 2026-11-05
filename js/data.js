let tasks = [];

try {
    const savedTasks = JSON.parse(localStorage.getItem("todo-tasks"));
    if (Array.isArray(savedTasks)) {
        tasks = savedTasks;
    }
} catch {
    tasks = [];
}

function saveTasks() {
    localStorage.setItem("todo-tasks", JSON.stringify(tasks));
}
