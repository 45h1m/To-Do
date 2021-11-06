//  Not completed yet
let
    ver = document.querySelector('#verWrap'),
    verParent = document.querySelector('.ver'),
    hor = document.querySelector('.hor'),
    h2 = document.querySelector('#heading'),
    taskUpDown = document.querySelector('#task-down'),
    template = { h2: 10, hor: 32 },
    up = false,
    endOfInterval = true;

let prevClientY = null;
ver.addEventListener('touchstart', e => {

    prevClientY = e.targetTouches[0].clientY;
})
ver.addEventListener("touchmove", e => {

    if (ver.scrollTop != 0 || !endOfInterval) return;

    if (e.touches[0].clientY > prevClientY && ver.scrollTop == 0 && !taskUpDown.classList.contains('down')) {
        toggleTask();
    }
})

ver.addEventListener("mousewheel", e => {

    if (ver.scrollTop != 0 || !endOfInterval) return;

    if (e.deltaY < 0 && ver.scrollTop == 0 && up) {
        e.preventDefault();
        up = false;
        toggleTask();
    }
    if (e.deltaY >= 0 && ver.scrollTop == 0 && !up) {
        e.preventDefault();
        up = true;
        toggleTask();
    }
});

function toggleTask() {
    verParent.classList.toggle('large');
    h2.classList.toggle('hidden');
    hor.classList.toggle('hidden');
    taskUpDown.classList.toggle('down');
}