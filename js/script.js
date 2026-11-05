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

taskForm.append(taskLabel, taskDateLabel, addButton);
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
