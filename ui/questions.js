let baseUrl = "http://localhost:8081/";
let totalElements;
let page = -1;
let size = 1;
let userObj;
let isLast= false;
let isLinkQuestion =false;
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
    let answer = $("input[name='optradio']:checked").next().text();
    if(!answer){
        return;
    }
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
        $("#questions, #linkDiv").html("");
        let activeDiv;
        $.each(nextQuestion.content, function (index, value) {
            $("#questionId").remove();
            let questionIdDiv = $("<h3 style='display:none' id='questionId'></h2>").text(value.id);
            $("body").append(questionIdDiv);
            if(!value.hyperLink || value.hyperLink ==='null'){
                $("#questions").show();
                $("#linkDiv").hide();
                activeDiv = $("#questions");
                let questionDiv = $("<h3></h3>").text(value.question);
                $("#questions").append(questionDiv);
                let answers = JSON.parse(value.answers);
                $.each(answers, function (index, value) {
                    let answerDiv='<p><input type="radio" id="radio'+index+'" name="optradio">'+
                                  '<label for="radio'+index+'">'+value+'</label></p>';
                    $("#questions").append(answerDiv);
                }); 
            } else{
                isLinkQuestion = true;
                activeDiv = $("#linkDiv");
                $("#questions").hide();
                $("#linkDiv").show();
                $("#linkDiv").append('<div class="col-sm-4" id="linkQuestionDiv">'+value.question+'</div>');
                $("#linkDiv").append('<div class="col-sm-8"><iframe src="'+value.hyperLink+'" width="800" height="800"></iframe></div>');
            }
        });
        activeDiv.append('<div class="col-12 text-right" id="buttonsDiv"></div>');
        if(!nextQuestion.first){
            $("#buttonsDiv").append('<button type="button" class="btn" onclick="loadPrevQuestion()" >Previous</button>');
        }
        if(nextQuestion.last){
            isLast=true;
            $("#buttonsDiv").append('<button type="button" class="btn" onclick="submitAnswer()" >Submit</button>');
        } else {
            $("#buttonsDiv").append('<button type="button" class="btn" onclick="getNextQuestion()" >Next</button>');
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
    isLast=false;isLinkQuestion = false;
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