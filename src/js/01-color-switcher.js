function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;

startBtn.addEventListener("click", onStartBtnClick);
stopBtn.addEventListener("click", onStopBtnClick);

function onStartBtnClick() {
    document.body.style.backgroundColor = `${getRandomHexColor()}`;
    startBtn.setAttribute("disabled", "disabled");
    stopBtn.removeAttribute("disabled");
    timerId = setInterval(() => {
        document.body.style.backgroundColor = `${getRandomHexColor()}`;
    }, 1000);
}

function onStopBtnClick() {
    clearInterval(timerId);
    startBtn.removeAttribute("disabled");
    stopBtn.setAttribute("disabled", "disabled");
}