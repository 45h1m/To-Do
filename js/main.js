class Category {
    constructor(title) {
        this.title = title;
        this.count = 0;
        this.done = 0;
    }
};

class Task {
    constructor(title, desc, date, categ) {
        this.title = title;
        this.desc = desc;
        this.date = date;
        this.categ = categ;
        this.done = false;
    }
};

let tasks = [];
let categories = [];

let plainText = localStorage.getItem('com.todo.app.tasks');
let plainTextCateg = localStorage.getItem('com.todo.app.categories');
let userName = localStorage.getItem('com.todo.app.username');
let userSrc = localStorage.getItem('com.todo.app.imageSrc');

function resetData() {
    localStorage.setItem('com.todo.app.tasks', 'none');
    localStorage.setItem('com.todo.app.categories', 'none');
    localStorage.setItem('com.todo.app.username', 'none');
    localStorage.setItem('com.todo.app.imageSrc', 'none');
    location.reload();
}

if (plainText != null && plainText != 'none') {
    tasks = JSON.parse(plainText);
    displayTask();
}

if (plainTextCateg != null && plainTextCateg != 'none') {
    categories = JSON.parse(plainTextCateg);
    setTimeout(() => {
        document.querySelector('#setup').style.left = '100%';
    }, 600);
    displayProgress();
} else {
    document.querySelector('#setup').style.left = '0%';
}

if (userName != null && userName != 'none') {
    document.querySelector('.user').innerHTML = `${userName}`;
    document.querySelector('#heading').innerHTML = `What's up ${userName.split(' ')[0]}!`;
}

if (userSrc != null && userSrc != 'none') {
    document.querySelector('#avatarImage').style.backgroundImage = `url(${userSrc})`;
}

function newTask() {
    if(!taskIsValid()) return;
    let title = document.querySelector('#title').value;
    let desc = document.querySelector('#description').value;
    let date = document.querySelector('#dueDate').value;
    let categ = document.querySelector('#category').value;

    if (plainText != null && plainText != 'none') {
        tasks = JSON.parse(plainText);
    }

    tasks[tasks.length] = new Task(title, desc, date, categ);

    saveTask();
    toggleCreate();
    displayTask();
    displayProgress();
}

function setCategoties() {
    categories = [];
    for (let input of document.querySelectorAll('.task-cate-input')) {
        categories[categories.length] = new Category(input.value);
    }
    localStorage.setItem('com.todo.app.categories', JSON.stringify(categories));
}

function saveTask() {
    let text = JSON.stringify(tasks);
    localStorage.setItem('com.todo.app.tasks', text);
}

function displayProgress() {
    for(let categ of categories) {
        categ.count = 0;
        categ.done = 0;
    }
    for (let task of tasks) {
        switch (task.categ) {
            case "one":
                categories[0].count++;
                if (task.done) categories[0].done++;
                break;
            case "two":
                categories[1].count++;
                if (task.done) categories[1].done++;
                break;
            case "three":
                categories[2].count ++;
                if(task.done) categories[2].done ++;
                break;
        }
    }
    let i = 0;
    let container = document.querySelector('#categContainer');
    container.innerHTML = '';
    for (let categ of categories) {
        container.innerHTML += `
        <div class="block ${(i==0) ? 'one' : ''} ${(i == 1) ? 'two' : ''} ${(i == 2) ? 'three' : ''}">
    
        <p class="taskCount">${categ.done} / ${categ.count} Task${(categ.count > 1) ? 's' : ''}</p>
        <p class="categ">${categ.title}</p>
        <div class="prog-bar-con">
            <div style="--progress: ${(categ.count != 0) ? ( categ.done / categ.count ) * 100 : 0}%;" class="prog-bar"></div>
        </div>
        </div>`;
        i++;
    }
}

function changeTaskState(index) {
    tasks[index].done = (tasks[index].done) ? false : true;
    saveTask();
    displayProgress();
}

function exportJson() {
    let el = document.querySelector('#download');
    let arr = {tasks, categories, userName, userSrc};
    let data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(arr));
    el.setAttribute("href", "data:"+data);
    el.setAttribute("download", "data-todo-"+ userName.split(' ')[0] +".json");    
    el.click();
}

function importJson(event) {

    let file = document.querySelector('#importedFile');
	if (!file.value.length) return;
	let reader = new FileReader();
	reader.onload = logFile;
	reader.readAsText(file.files[0]);
}

function logFile (event) {
	let str = event.target.result;
	let json = JSON.parse(str);
	tasks = json.tasks;
    categories = json.categories;
    userName = json.userName;
    userSrc = json.userSrc;
    localStorage.setItem('com.todo.app.categories', JSON.stringify(categories));
    localStorage.setItem('com.todo.app.username', userName);
    localStorage.setItem('com.todo.app.imageSrc', userSrc);
    saveTask();
    document.querySelector('.user').innerHTML = `${userName}`;
    document.querySelector('#heading').innerHTML = `What's up ${userName.split(' ')[0]}!`;
    document.querySelector('#avatarImage').style.backgroundImage = `url(${userSrc})`;
    displayTask();
    toggleMenu();
    location.reload();
}

function displayTask() {
    let elem = document.querySelector('#taskContainer');
    elem.innerHTML = '';
    document.querySelector('#no-task').style.display = (tasks.length == 0) ? 'flex' : 'none';
    let index = 0;
    for(let task of tasks) {
        elem.innerHTML += `
        <div class="block">
        <div class="icon ${(task.done) ? 'checked' : ''} ${task.categ}">
            <div onclick="checkTask(this.parentNode, ${index}); " class="sign">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                  </svg>
            </div>
        </div>
        <div class="about">
            <p class="task-title">${task.title}</p>
            <div class="row" onclick="showDescription(this);"><textarea readonly spellcheck="false" rows="1" class="task-des" id="t0">${task.desc}</textarea><svg id="task-des-down" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="down" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
              </svg></div>
            <p class="task-date">${task.date}</p>
        </div>
    </div>`;
        index++;
    }
}