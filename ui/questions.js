var data = { "questions": [{ "question": "which is the following linux os ?", "options": ["ubuntu", "windows", "centos", "mac"] }, { "question": "what is the latest version of ubuntu ?", "options": ["18.04", "16.05", "12.02", "20.01"] }, { "question": "Is Ubuntu free?", "options": ["yes", "no"] }] };
var currentQuestionPointer = 0;
$(document).ready(function () {
    getQuestions();
    createQuestionElement();
});

function loadNextQuestion() {
    currentQuestionPointer++;
    createQuestionElement();
}
function loadPrevQuestion() {
    currentQuestionPointer--;
    createQuestionElement();
}

function submitAnswers() {
    var h1 = document.createElement("h1");
    h1.innerHTML = "Thank you for your time we will evaluate your answers!";

    document.getElementById("questions").innerHTML = "";
    document.getElementById("questions").appendChild(h1);

}

function createQuestionElement() {
    document.getElementById("questions").innerHTML = "";
    var questionElem = document.createElement("h2");
    questionElem.innerHTML = "<h2>" + data.questions[currentQuestionPointer].question + "</h2>";
    document.getElementById("questions").appendChild(questionElem);
    let options = data.questions[currentQuestionPointer].options;
    for (let i = 0; i < options.length; i++) {

        questionOptionsElemInput = document.createElement("input");
        questionOptionsElemSpan = document.createElement("span");
        questionOptionsElemBr = document.createElement("br");
        questionOptionsElemInput.innerHTML = options[i];


        questionOptionsElemInput.setAttribute("type", "radio");
        questionOptionsElemInput.setAttribute("name", "optradio");
        questionOptionsElemSpan.innerHTML = options[i];
        document.getElementById("questions").appendChild(questionOptionsElemInput);
        document.getElementById("questions").appendChild(questionOptionsElemSpan);
        document.getElementById("questions").appendChild(questionOptionsElemBr);
    }
    let rightButton = document.createElement("button");
    rightButton.setAttribute("class", "btn btn-success");
    rightButton.setAttribute("type", "button");

    if (currentQuestionPointer === data.questions.length - 1) {
        rightButton.onclick = submitAnswers;
        rightButton.innerHTML = "Finish";
    } else if (currentQuestionPointer < data.questions.length) {
        rightButton.onclick = loadNextQuestion;
        rightButton.innerHTML = "Next";
    }
    if (currentQuestionPointer != 0) {
        let leftButton = document.createElement("button");
        leftButton.setAttribute("class", "btn btn-info");
        leftButton.setAttribute("type", "button");
        leftButton.onclick = loadPrevQuestion;
        leftButton.innerHTML = "Previous";
        document.getElementById("questions").appendChild(leftButton);
    }
    document.getElementById("questions").appendChild(rightButton);

}


function getQuestions(){
    let user = sessionStorage.getItem("user");
    if(user){
        
    } else {
        alert("Please login to continue");
        window.location.href = "login.html"
    }
}
