let baseUrl = "http://localhost:8081/";
let totalElements;
let page = -1;
let size = 1;
let userObj;
let isLast= false;
var currentQuestionPointer = 0;
$(document).ready(function () {
    getNextQuestion();
});


function getNextQuestion() {
    let user = sessionStorage.getItem("user");
    if (user) {
        userObj = JSON.parse(user);
        if(page!==-1){
            submitAnswer();
        }
        
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

function submitAnswer(){
    let questionId = $("#questionId").text();
    let answer = $("input[name='optradio']:checked").val();
    let jsonData = {
        "questionId": questionId,
        "userEmail": userObj.email,
        "userAnswer": answer
    }
    $.ajax({
        method: "POST",
        url: baseUrl + "answers",
        'contentType': 'application/json; charset=utf-8',
        data: JSON.stringify(jsonData)
    })
    .done(function (response) {
        console.log("answer submitted",response);
    });
    if(isLast){
        sessionStorage.removeItem("user");
        window.location.href = "cleared.html"
    }
}

function getnerateNextQuestion(nextQuestion) {
    if (nextQuestion) {
        $("#questions").html("");
        $.each(nextQuestion.content, function (index, value) {
            if(!value.hyperLink){
                let questionDiv = $("<h2></h2>").text(value.question);
                $("#questions").append(questionDiv);
                let questionIdDiv = $("<h2 style='display:none' id='questionId'></h2>").text(value.id);
                $("#questions").append(questionIdDiv);
                let answers = JSON.parse(value.answers);
                $.each(answers, function (index, value) {
                    let answerDiv='<input type="radio" name="optradio" value='+value+'><span>'+value+'</span><br>'
                    $("#questions").append(answerDiv);
                }); 
            } else{
                $("#questionsDiv").hide();
                $("#linkDiv").show();
            }
        });

        if(!nextQuestion.first){
            $("#questions").append('<button type="button" class="btn btn-info" onclick="loadPrevQuestion()">Previous</button>');
        }
        if(nextQuestion.last){
            isLast=true;
            $("#questions").append('<button type="button" class="btn btn-success" onclick="submitAnswer()">Submit</button>');
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
    isLast=false;
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