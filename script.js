document.addEventListener('DOMContentLoaded', loadTasks);

document.getElementById('add-task-button').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('task');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const taskList = document.getElementById('task-list');

    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskText}</span>
        <button class="complete-button">Complete</button>
        <button class="edit-button">Edit</button>
        <button class="delete-button">Delete</button>
    `;

    taskList.appendChild(li);

    saveTask(taskText);

    taskInput.value = '';
}

function saveTask(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
    let tasks = [];
    const tasksString = localStorage.getItem('tasks');
    if (tasksString) {
        tasks = JSON.parse(tasksString);
    }
    return tasks;
}

function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    const taskList = document.getElementById('task-list');

    for (const taskText of tasks) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="complete-button">Complete</button>
            <button class="edit-button">Edit</button>
            <button class="delete-button">Delete</button>
        `;

        taskList.appendChild(li);
    }
}

document.getElementById('task-list').addEventListener('click', function (e) {
    if (e.target.classList.contains('complete-button')) {
        const taskItem = e.target.parentElement;
        taskItem.querySelector('span').classList.toggle('complete-task');
        saveUpdatedTasks();
    } else if (e.target.classList.contains('edit-button')) {
        const taskItem = e.target.parentElement;
        const taskText = taskItem.querySelector('span');
        const updatedTaskText = prompt('Edit task:', taskText.textContent);
        if (updatedTaskText) {
            taskText.textContent = updatedTaskText;
            saveUpdatedTasks();
        }
    } else if (e.target.classList.contains('delete-button')) {
        const taskItem = e.target.parentElement;
        taskItem.remove();
        saveUpdatedTasks();
    }
});

function saveUpdatedTasks() {
    const tasks = [];
    const taskItems = document.querySelectorAll('li span');
    taskItems.forEach((item) => tasks.push(item.textContent));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
