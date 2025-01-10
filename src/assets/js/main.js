// Menu
const toggle = document.getElementById('toggle');
const menu = document.getElementById('menu');
toggle.addEventListener('click', () => {
    menu.classList.toggle('-translate-x-full');
});

// Main background
const main = document.querySelector('main');
const date = document.getElementById('date');
if (localStorage.getItem('bg') != null) {
    let bgClass = localStorage.getItem('bg');
    main.classList.add(bgClass)
} else {
    // generate random bg
    let rand = Math.round((Math.random() * 30)) + 1;
    localStorage.setItem('bg', 'bg-img-' + rand);
    let bgClass = localStorage.getItem('bg');
    main.classList.add(bgClass)
}
let dateTxt;
const _date = new Date();
switch (_date.getDay()) {
    case 0:
        dateTxt = "Sunday"; break;
    case 1:
        dateTxt = "Monday"; break;
    case 2:
        dateTxt = "Tuesday"; break;
    case 3:
        dateTxt = "Wednesday"; break;
    case 4:
        dateTxt = "Thursday"; break;
    case 5:
        dateTxt = "Friday"; break;
    case 6:
        dateTxt = "Saturday"; break;
    default:
        dateTxt = "--"; break;
}
dateTxt += " ";
switch (_date.getMonth()) {
    case 0:
        dateTxt += "January"; break;
    case 1:
        dateTxt += "February"; break;
    case 2:
        dateTxt += "March"; break;
    case 3:
        dateTxt += "April"; break;
    case 4:
        dateTxt += "May"; break;
    case 5:
        dateTxt += "June"; break;
    case 6:
        dateTxt += "July"; break;
    case 7:
        dateTxt += "August"; break;
    case 8:
        dateTxt += "September"; break;
    case 9:
        dateTxt += "October"; break;
    case 10:
        dateTxt += "November"; break;
    case 11:
        dateTxt += "December"; break;
    default:
        dateTxt += "--"; break;
}
dateTxt += " (" + _date.getDate() + ") " + _date.getFullYear();
date.textContent = dateTxt;

// Settings
const settings = document.getElementById('settings');
const imageParent = settings.querySelector('div');
const images = imageParent.querySelectorAll('img');

settings.addEventListener('click', () => {
    imageParent.classList.toggle('hidden');
    settings.classList.toggle('before:hidden');
});
images.forEach((el) => {
    el.addEventListener('click', () => {
        localStorage.setItem('bg', el.dataset.cs);
        main.classList.remove(...['bg-img-1', 'bg-img-2', 'bg-img-3', 'bg-img-4', 'bg-img-5', 'bg-img-6', 'bg-img-7', 'bg-img-8', 'bg-img-9', 'bg-img-10', 'bg-img-11', 'bg-img-12', 'bg-img-13', 'bg-img-14', 'bg-img-15', 'bg-img-16', 'bg-img-17', 'bg-img-18', 'bg-img-19', 'bg-img-20', 'bg-img-21', 'bg-img-22', 'bg-img-23', 'bg-img-24', 'bg-img-25', 'bg-img-26', 'bg-img-27', 'bg-img-28', 'bg-img-29', 'bg-img-30'])
        main.classList.add(el.dataset.cs);
    })
});

// ToDos
const TODO_KEY = 'todos';
const TODO_LIST = JSON.parse(localStorage.getItem(TODO_KEY)) ? JSON.parse(localStorage.getItem(TODO_KEY)) : [];
const add = document.getElementById('add');
const task = document.getElementById('task');
const newList = document.getElementById('incomming');
const doneList = document.getElementById('done');
const noItem = document.getElementById('no-item');

// Filter Tasks
const allTasks = document.getElementById('all-task');
const newTasks = document.getElementById('new-task');
const importantTasks = document.getElementById('important-task');
const doneTasks = document.getElementById('done-task');
let flagTask = 'allTasks';
allTasks.addEventListener('click', () => { flagTask = 'allTasks'; loadItems(); allTasks.classList.add('bg-slate-700'); newTasks.classList.remove('bg-slate-700'); importantTasks.classList.remove('bg-slate-700'); doneTasks.classList.remove('bg-slate-700'); });
newTasks.addEventListener('click', () => { flagTask = 'newTasks'; loadItems(); newTasks.classList.add('bg-slate-700'); allTasks.classList.remove('bg-slate-700'); importantTasks.classList.remove('bg-slate-700'); doneTasks.classList.remove('bg-slate-700'); });
importantTasks.addEventListener('click', () => { flagTask = 'importantTasks'; loadItems(); importantTasks.classList.add('bg-slate-700'); newTasks.classList.remove('bg-slate-700'); allTasks.classList.remove('bg-slate-700'); doneTasks.classList.remove('bg-slate-700'); });
doneTasks.addEventListener('click', () => { flagTask = 'doneTasks'; loadItems(); doneTasks.classList.add('bg-slate-700'); newTasks.classList.remove('bg-slate-700'); importantTasks.classList.remove('bg-slate-700'); allTasks.classList.remove('bg-slate-700'); });

loadItems();
function loadItems() {
    while (newList.firstElementChild) {
        newList.removeChild(newList.firstElementChild);
    }
    while (doneList.firstElementChild) {
        doneList.removeChild(doneList.firstElementChild);
    }

    if (TODO_LIST == null || TODO_LIST.length == 0) {
        noItem.style.display = 'flex';
    } else {
        noItem.style.display = 'none';
        // TODO_LIST.forEach((item) => {
        //     addToList(item);
        // });
        if (flagTask == 'allTasks') {
            TODO_LIST.forEach((item) => {
                addToList(item);
            });
        } else if (flagTask == 'newTasks') {
            TODO_LIST.forEach((item) => {
                if (item.done == false) {
                    addToList(item);
                }
            });
        } else if (flagTask == 'importantTasks') {
            TODO_LIST.forEach((item) => {
                if (item.imporatnt == true) {
                    addToList(item);
                }
            });
        } else if (flagTask == 'doneTasks') {
            TODO_LIST.forEach((item) => {
                if (item.done == true) {
                    addToList(item);
                }
            });
        }
    }
}


task.addEventListener('input', (e) => {
    if (task.value.length > 0) {
        add.classList.remove('hidden');
    } else {
        add.classList.add('hidden');
    }

});

task.addEventListener('keypress', (e) => {
    if (e.key == 'Enter' && task.value.length > 0) {
        addNewTask();
    }
});

add.addEventListener('click', () => {
    addNewTask();
});
function addNewTask() {
    const newTask = new taskObj(task.value);
    task.value = '';
    add.classList.add('hidden');
    TODO_LIST.push(newTask);
    localStorage.setItem(TODO_KEY, JSON.stringify(TODO_LIST));
    addToList(newTask);
    noItem.style.display = 'none';
}

// Task object
function taskObj(txt) {
    this.id = new Date().getTime();
    this.text = txt;
    this.done = false;
    this.important = false;
}

function addToList(item) {
    const li = document.createElement('li');
    li.innerHTML = `<div class="flex gap-2  justify-between items-center p-4 bg-bgDark text-white rounded-lg">
                        ${item.done ? '<img src="assets/images/icons/uncheck.svg" alt="" class="w-6 h-6 cursor-pointer" onclick="unDoneTask(' + item.id + ')">' : '<img src="assets/images/icons/checked.svg" alt="" class="w-6 h-6 cursor-pointer" onclick="doneTask(' + item.id + ')">'}
                        <p class="flex-grow text-center ${item.done && 'line-through'}">${item.text}</p>
                        <div class="flex gap-1 justify-center items-center">
                            ${item.imporatnt ? '<img src="assets/images/icons/important2.svg" alt="" class="w-6 h-6 cursor-pointer" onclick="unImportant(' + item.id + ')">' : '<img src="assets/images/icons/important.svg" alt="" class="w-6 h-6 cursor-pointer" onclick="important(' + item.id + ')">'}
                            <img src="assets/images/icons/delete.svg" alt="" class="w-6 h-6 cursor-pointer" onclick="deleteTask(${item.id})">
                        </div>
                    </div>`;
    if (item.done) {
        doneList.appendChild(li);
    } else {
        newList.appendChild(li);
    }
}


function doneTask(item) {
    let x = TODO_LIST.findIndex((i) => {
        if (i.id == item) {
            return i;
        }
    });
    TODO_LIST[x].done = true;
    localStorage.setItem(TODO_KEY, JSON.stringify(TODO_LIST));
    loadItems();
}
function unDoneTask(item) {
    let x = TODO_LIST.findIndex((i) => {
        if (i.id == item) {
            return i;
        }
    });
    TODO_LIST[x].done = false;
    localStorage.setItem(TODO_KEY, JSON.stringify(TODO_LIST));
    loadItems();
}
function important(item) {
    let x = TODO_LIST.findIndex((i) => {
        if (i.id == item) {
            return i;
        }
    });
    TODO_LIST[x].imporatnt = true;
    localStorage.setItem(TODO_KEY, JSON.stringify(TODO_LIST));
    loadItems();
}
function unImportant(item) {
    let x = TODO_LIST.findIndex((i) => {
        if (i.id == item) {
            return i;
        }
    });
    TODO_LIST[x].imporatnt = false;
    localStorage.setItem(TODO_KEY, JSON.stringify(TODO_LIST));
    loadItems();
}

function deleteTask(item) {
    let x = TODO_LIST.findIndex((i) => {
        if (i.id == item) {
            return i;
        }
    });
    TODO_LIST.splice(x, 1);
    localStorage.setItem(TODO_KEY, JSON.stringify(TODO_LIST));
    loadItems();

}
