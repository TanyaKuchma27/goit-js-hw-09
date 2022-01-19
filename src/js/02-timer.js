import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';
import 'notiflix/dist/notiflix-3.2.2.min.css';

const refs = {
    picker: document.querySelector('input#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
};

refs.startBtn.setAttribute("disabled", "disabled");

const currentTime = Date.now();

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const stopTime = selectedDates[0].getTime();
        let diff = stopTime - currentTime;
        if (diff > 0) {
            refs.startBtn.removeAttribute("disabled");
            refs.startBtn.addEventListener('click', () => {onStartBtnClick(diff) });
        } else {
            Notiflix.Notify.failure('Please choose a date in the future');
            // alert("Please choose a date in the future");
        };      
    },
};

function onStartBtnClick(diff) {  
    refs.startBtn.setAttribute("disabled", "disabled");
    refs.picker.setAttribute("disabled", "disabled");
    updateTimer(convertMs(diff));
    const intervalId = setInterval(function () {
        diff -= 1000;
        updateTimer(convertMs(diff));
        if (diff < 1000) {
            clearInterval(intervalId);
            Notiflix.Notify.success('Time is out');
            refs.picker.removeAttribute("disabled");
        }
    }, 1000);
}

const fp = flatpickr(refs.picker, options);

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

function updateTimer({ days, hours, minutes, seconds }) {
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.minutes.textContent = `${minutes}`;
    refs.seconds.textContent = `${seconds}`;
};