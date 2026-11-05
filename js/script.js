const app = document.createElement("main");
app.className = "app";

const header = document.createElement("header");
header.className = "page-header";

const title = document.createElement("h1");
title.textContent = "Список задач";
header.append(title);

const taskSection = document.createElement("section");
taskSection.className = "task-section";
taskSection.setAttribute("aria-labelledby", "task-heading");

const taskHeading = document.createElement("h2");
taskHeading.id = "task-heading";
taskHeading.textContent = "Новая задача";

const taskForm = document.createElement("form");
taskForm.className = "task-form";

const taskLabel = document.createElement("label");
taskLabel.className = "field";
taskLabel.textContent = "Название";

const taskInput = document.createElement("input");
taskInput.type = "text";
taskInput.name = "title";
taskInput.placeholder = "Введите название задачи";
taskInput.required = true;
taskLabel.append(taskInput);

const taskDateLabel = document.createElement("label");
taskDateLabel.className = "field";
taskDateLabel.textContent = "Дата";

const taskDateInput = document.createElement("input");
taskDateInput.type = "date";
taskDateInput.name = "date";
taskDateInput.required = true;
taskDateLabel.append(taskDateInput);

const addButton = document.createElement("button");
addButton.type = "submit";
addButton.className = "button";
addButton.textContent = "Добавить";

const cancelButton = document.createElement("button");
cancelButton.type = "button";
cancelButton.className = "button button-secondary";
cancelButton.textContent = "Отмена";
cancelButton.hidden = true;

const formActions = document.createElement("div");
formActions.className = "form-actions";
formActions.append(addButton, cancelButton);

taskForm.append(taskLabel, taskDateLabel, formActions);
taskSection.append(taskHeading, taskForm);

const controlsSection = document.createElement("section");
controlsSection.className = "controls-section";
controlsSection.setAttribute("aria-labelledby", "controls-heading");

const controlsHeading = document.createElement("h2");
controlsHeading.id = "controls-heading";
controlsHeading.textContent = "Поиск и фильтры";

const filters = document.createElement("div");
filters.className = "filters";

const searchLabel = document.createElement("label");
searchLabel.className = "field";
searchLabel.textContent = "Поиск по названию";

const searchInput = document.createElement("input");
searchInput.type = "search";
searchInput.placeholder = "Название задачи";
searchLabel.append(searchInput);

const filterDateLabel = document.createElement("label");
filterDateLabel.className = "field";
filterDateLabel.textContent = "Фильтр по дате";

const filterDateInput = document.createElement("input");
filterDateInput.type = "date";
filterDateLabel.append(filterDateInput);

const statusLabel = document.createElement("label");
statusLabel.className = "field";
statusLabel.textContent = "Статус";

const statusSelect = document.createElement("select");

const allOption = document.createElement("option");
allOption.value = "all";
allOption.textContent = "Все";

const activeOption = document.createElement("option");
activeOption.value = "active";
activeOption.textContent = "Невыполненные";

const completedOption = document.createElement("option");
completedOption.value = "completed";
completedOption.textContent = "Выполненные";

statusSelect.append(allOption, activeOption, completedOption);
statusLabel.append(statusSelect);

const sortLabel = document.createElement("label");
sortLabel.className = "field";
sortLabel.textContent = "Порядок";

const sortSelect = document.createElement("select");

const manualOption = document.createElement("option");
manualOption.value = "manual";
manualOption.textContent = "Вручную";

const dateAscendingOption = document.createElement("option");
dateAscendingOption.value = "date-asc";
dateAscendingOption.textContent = "Дата по возрастанию";

const dateDescendingOption = document.createElement("option");
dateDescendingOption.value = "date-desc";
dateDescendingOption.textContent = "Дата по убыванию";

sortSelect.append(manualOption, dateAscendingOption, dateDescendingOption);
sortLabel.append(sortSelect);

filters.append(searchLabel, filterDateLabel, statusLabel, sortLabel);
controlsSection.append(controlsHeading, filters);

const listSection = document.createElement("section");
listSection.className = "list-section";
listSection.setAttribute("aria-labelledby", "list-heading");

const listHeading = document.createElement("h2");
listHeading.id = "list-heading";
listHeading.textContent = "Задачи";

const emptyMessage = document.createElement("p");
emptyMessage.className = "empty-message";
emptyMessage.textContent = "Задач пока нет.";

const taskList = document.createElement("ul");
taskList.className = "task-list";

listSection.append(listHeading, emptyMessage, taskList);
app.append(header, taskSection, controlsSection, listSection);
document.body.append(app);

let editingId = null;

function resetForm() {
    editingId = null;
    taskForm.reset();
    taskInput.setCustomValidity("");
    taskHeading.textContent = "Новая задача";
    addButton.textContent = "Добавить";
    cancelButton.hidden = true;
}

function renderTasks() {
    taskList.replaceChildren();
    emptyMessage.hidden = tasks.length > 0;

    tasks.forEach(function(task) {
        const item = document.createElement("li");
        item.className = "task-item";
        item.classList.toggle("completed", task.completed);

        const taskInfo = document.createElement("div");
        taskInfo.className = "task-info";

        const completionLabel = document.createElement("label");
        completionLabel.className = "task-completion";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";
        checkbox.checked = task.completed;

        const taskTitle = document.createElement("span");
        taskTitle.className = "task-title";
        taskTitle.textContent = task.title;
        completionLabel.append(checkbox, taskTitle);

        const taskDate = document.createElement("time");
        taskDate.className = "task-date";
        taskDate.dateTime = task.date;
        taskDate.textContent = task.date.split("-").reverse().join(".");
        taskInfo.append(completionLabel, taskDate);

        const taskActions = document.createElement("div");
        taskActions.className = "task-actions";

        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.className = "button button-secondary";
        editButton.textContent = "Изменить";

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "button button-danger";
        deleteButton.textContent = "Удалить";

        checkbox.addEventListener("change", function() {
            task.completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });

        editButton.addEventListener("click", function() {
            editingId = task.id;
            taskInput.value = task.title;
            taskDateInput.value = task.date;
            taskInput.setCustomValidity("");
            taskHeading.textContent = "Редактирование задачи";
            addButton.textContent = "Сохранить";
            cancelButton.hidden = false;
            taskInput.focus();
        });

        deleteButton.addEventListener("click", function() {
            tasks = tasks.filter(function(savedTask) {
                return savedTask.id !== task.id;
            });
            if (editingId === task.id) {
                resetForm();
            }
            saveTasks();
            renderTasks();
        });

        taskActions.append(editButton, deleteButton);
        item.append(taskInfo, taskActions);
        taskList.append(item);
    });
}

taskInput.addEventListener("input", function() {
    taskInput.setCustomValidity("");
});

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const taskTitle = taskInput.value.trim();
    if (taskTitle === "") {
        taskInput.setCustomValidity("Введите название задачи.");
        taskInput.reportValidity();
        return;
    }

    if (editingId === null) {
        tasks.push({
            id: Date.now(),
            title: taskTitle,
            date: taskDateInput.value,
            completed: false
        });
    } else {
        const task = tasks.find(function(savedTask) {
            return savedTask.id === editingId;
        });
        task.title = taskTitle;
        task.date = taskDateInput.value;
    }

    saveTasks();
    resetForm();
    renderTasks();
    taskInput.focus();
});

cancelButton.addEventListener("click", function() {
    resetForm();
    taskInput.focus();
});

renderTasks();
