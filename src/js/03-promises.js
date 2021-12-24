import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.2.min.css';

const formRef = document.querySelector('.form');

let formData = {};

formRef.addEventListener('input', onFormInput);
formRef.addEventListener('submit', onFormSubmit);

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;  
}

function onFormSubmit(evt) {
  evt.preventDefault();
  const amount = Number(formData.amount);
  const delay1 = Number(formData.delay)
  const step = Number(formData.step)
  for (let i = 0; i < amount; i += 1) {
    const position = i + 1;
    const delay = delay1 + step * i;
    createPromise(position, delay)
    .then(() => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(() => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  }
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
   const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
       if (shouldResolve) {
    resolve("success value");
      } else {
        reject("error");
  }
    }, delay);
  });
}