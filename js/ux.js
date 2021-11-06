'use strict'

const
    main = document.querySelector('.main'),
    menu = document.querySelector('.menu'),
    create = document.querySelector('.create'),
    color = document.querySelector('#color');


function toggleMenu() {
    main.classList.toggle('mini');
    menu.classList.toggle('mini');
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document.querySelector('#avatarImage')
                .style.backgroundImage = `url(${e.target.result})`;
            localStorage.setItem('com.todo.app.imageSrc', e.target.result);
            userSrc = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function toggleCreate() {
    if (create.classList.contains('active')) {
        setTimeout(() => {
            create.style.display = 'none';
        }, 600)
    } else {
        create.style.display = 'flex';
    }
    create.classList.toggle('active');
}

function showDescription(parent) {
    let child = parent.childNodes[0];
    if(child.classList.contains('active'))
    child.style.height = '23px';
    else
    child.style.height = child.scrollHeight+'px';
    child.classList.toggle('active');
}

function changeColor(elem) {
    color.setAttribute('style', `--col: ${getComputedStyle(elem).getPropertyValue('--col')}`)
}

function checkTask(elem, index) {
    elem.classList.toggle('checked');
    changeTaskState(index);
}

function getStarted(elem) {
    if(!categIsValid()) return;
    elem.style.left = '100%';
    localStorage.setItem('com.todo.app.username', document.querySelector('#fullname').value);
    document.querySelector('.user').innerHTML = `${document.querySelector('#fullname').value}`;
    userName = document.querySelector('#fullname').value;
    document.querySelector('#heading').innerHTML = `What's up ${document.querySelector('#fullname').value.split(' ')[0]}!`;
    setCategoties();
    displayProgress();
}

function showSetup() {
    document.querySelector('#setup').style.left = '0%';
    setTimeout(() => {
        toggleMenu();
    }, 1000);
}

function categIsValid() {
    let result = true;
    for (let input of document.querySelectorAll('.task-cate-input')) {
        if(input.value.trim() == '') result = false;
    }
    if(document.querySelector('#fullname').value.trim() == '') result = false;
    return result;
}

function taskIsValid() {
    let result = true;
    if (
        document.querySelector('#title').value.trim() == '' 
        || document.querySelector('#description').value.trim() == ''
        || document.querySelector('#dueDate').value.trim() == ''
    ) result = false;
    return result;
}

//   resize textarea

function resizeTextarea() {

    let elem = document.getElementById('description')
    elem.setAttribute("style", "height:" + (elem) + "px;overflow-y:hidden;");
    elem.addEventListener('input', (e) => {
        e.target.style.height = "auto";
        e.target.style.height = (e.target.scrollHeight) + "px";
    });
}

resizeTextarea();

//  horizontal scroll with mouse drag

const slider = document.querySelector('.wrap');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
});
slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
});
slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; //scroll-fast
    slider.scrollLeft = scrollLeft - walk;
});