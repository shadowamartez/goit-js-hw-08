import throttle from 'lodash.throttle';

const formFeedback = document.querySelector(".feedback-form");

formFeedback.addEventListener("input", throttle(inputInfo, 500)); 
formFeedback.addEventListener("submit", submitFormInfo);

const LOCAL_KEY = "feedback-form-state"; 

let formInfo = {};

function inputInfo(evt) {
    formInfo[evt.target.name] = evt.target.value.trim();
    localStorage.setItem(LOCAL_KEY, JSON.stringify(formInfo));
}

const onLoad = () => {
    try {
        const data = localStorage.getItem(LOCAL_KEY);
        if (!data) return;
        formInfo = JSON.parse(data);
        Object.entries(formInfo).forEach(([key, val]) => {
            formFeedback.elements[key].value = val;
        });
    } catch (error) {
        console.log(error.message);
    }
};

window.addEventListener("load", onLoad); 

function submitFormInfo(evt) {
    evt.preventDefault();
    console.log(formInfo); 

    localStorage.removeItem(LOCAL_KEY);
    evt.currentTarget.reset();
    formInfo = {}; 
}