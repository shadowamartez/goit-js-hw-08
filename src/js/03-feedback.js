import throttle from 'lodash.throttle';

const formFeedback = document.querySelector(".feedback-form");

formFeedback.addEventListener("input", throttle(inputInfo, 500)); 
formFeedback.addEventListener("submit", submitFormInfo);

const LOCAL_KEY = "feedback-form-state"; 

let formInfo = JSON.parse(localStorage.getItem(LOCAL_KEY)) || {}; 
const { email, message } = formFeedback.elements;
reloadPage();

function inputInfo(evt) {
    dataForm = { email: email.value, message: message.value };
    localStorage.setItem(LOCAL_KEY, JSON.stringify(formInfo));
}

function reloadPage(evt) {
    if (formInfo) {
        email.value = formInfo.email || '';
        message.value = formInfo.message || '';
    }
}

function submitFormInfo(evt) {
    evt.preventDefault();
    console.log({ email: email.value, message: message.value })
    
    if (email.value === '' || message.value === '') {
        return alert('Please fill in all the fields!'); 
    }

    localStorage.removeItem(LOCAL_KEY);
    evt.currentTarget.reset();
    formInfo = {}; 
}