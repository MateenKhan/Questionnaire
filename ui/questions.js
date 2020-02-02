let baseUrl = "http://localhost:8081/";
let totalElements;
let page = -1;
let size = 1;
var data = { "questions": [{ "question": "which is the following linux os ?", "options": ["ubuntu", "windows", "centos", "mac"] }, { "question": "what is the latest version of ubuntu ?", "options": ["18.04", "16.05", "12.02", "20.01"] }, { "question": "Is Ubuntu free?", "options": ["yes", "no"] }] };
var currentQuestionPointer = 0;
$(document).ready(function () {
    getNextQuestion();
});


function getNextQuestion() {
    let user = sessionStorage.getItem("user");
    if (user) {
        let userObj = JSON.parse(user);
        $.ajax({
            method: "GET",
            url: baseUrl + "questions/paginated/" + userObj.field + "?page=" + (++page) + "&size=" + size,
            'contentType': 'application/json; charset=utf-8'
        })
            .done(function (response) {
                getnerateNextQuestion(response);
            });
    } else {
        redirectToLogin();
    }
}

function getnerateNextQuestion(nextQuestion) {
    if (nextQuestion) {
        $("#questions").html("");
        $.each(nextQuestion.content, function (index, value) {
            let questionDiv = $("<h2></h2>").text(value.question);
            $("#questions").append(questionDiv);
            let answers = JSON.parse(value.answers);
            $.each(answers, function (index, value) {
                let answerDiv='<input type="radio" name="optradio"><span>'+value+'</span><br>'
                $("#questions").append(answerDiv);
            }); 
        });

        if(!nextQuestion.first){
            $("#questions").append('<button type="button" class="btn btn-info" onclick="loadPrevQuestion()">Previous</button>');
        }
        if(nextQuestion.last){
            $("#questions").append('<button type="button" class="btn btn-success" onclick="loadPrevQuestion()">Submit</button>');
        } else {
            $("#questions").append('<button type="button" class="btn btn-success" onclick="getNextQuestion()">Next</button>');
        }


    } else {
        redirectToLogin();
    }
}

function redirectToLogin() {
    alert("Please login to continue");
    window.location.href = "login.html"
}

function loadPrevQuestion(){
    let user = sessionStorage.getItem("user");
    if (user) {
        let userObj = JSON.parse(user);
        $.ajax({
            method: "GET",
            url: baseUrl + "questions/paginated/" + userObj.field + "?page=" + (--page) + "&size=" + size,
            'contentType': 'application/json; charset=utf-8'
        })
            .done(function (response) {
                getnerateNextQuestion(response);
            });
    } else {
        redirectToLogin();
    }
}