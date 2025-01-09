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