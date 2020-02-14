var baseUrl = "http://localhost:8081/";

$(document).ready(function(){
    getQuestions();
  });

function getQuestions() {
    
    $.ajax({
        method: "GET",
        url: baseUrl + "questions",
        'contentType': 'application/json; charset=utf-8'
    })
    .done(function (response) {
        populateQuestions(response);
    });
}

function populateQuestions(questionsArr) {
    if (questionsArr) {
        $("#qusetionsTable tbody").empty();
        let row = '<tr>';
        for(let i=0;i<questionsArr.length;i++){
            row+='<th scope="row" class="id">'+questionsArr[i].id;+'</th>';
            row+='<td><input class="userField" value="'+questionsArr[i].userField+'" /></td>';
            row+='<td><textarea class="answers" >'+JSON.parse(questionsArr[i].answers)+'</textarea></td>';
            row+='<td><textarea class="question" >'+questionsArr[i].question+'</textarea></td>';
            row+='<td><input class="questionType" value="'+questionsArr[i].questionType+'"/></td>';
            row+='<td><input class="hyperLink" value="'+questionsArr[i].hyperLink+'"/></td>';
            if(questionsArr[i].verifyDetails){
                row+='<td><textarea class="verifyDetails">'+JSON.stringify(JSON.parse(questionsArr[i].verifyDetails))+'</textarea></td>';
            } else{
                row+='<td><textarea class="verifyDetails">'+questionsArr[i].verifyDetails+'</textarea></td>';
            }
            
            row+='<td><button onclick="updateQuestion($(this))">update</button><button onclick="deleteQuestion('+questionsArr[i].id+')">delete</button></td>';
            row+='</tr>';
            $("#qusetionsTable tbody").append(row);
            row='<tr>';
        }
    } else {
        alert("unable to retrive questions!");
    }
}


function updateQuestion(elem) {
    let question = {};
    question[elem.closest("tr").find("th").attr("class")]  = elem.closest("tr").find("th").text();
    elem.closest("tr").find("td").each(function(){
        let ths = $(this);
        if(ths.children().attr("class") === 'answers'){
            question[ths.children().attr("class")]  = JSON.stringify(ths.children().val().split(","));
        } else {
            question[ths.children().attr("class")]  = ths.children().val();
        }
    });
    console.log(question);
    $.ajax({
        method: "POST",
        url: baseUrl + "questions",
        'contentType': 'application/json; charset=utf-8',
        data: JSON.stringify(question)
    })
    .done(function (response) {
        alert("DONE!");
        getQuestions();
    }); 
}

function deleteQuestion(questionId){
 $.ajax({
        method: "DELETE",
        url: baseUrl + "questions/"+ questionId,
        'contentType': 'application/json; charset=utf-8'
    })
    .done(function (response) {
        alert("deleted!");
        getQuestions();
    });
}

function addRow(){
    let row = '<tr>';
    row+='<th scope="row" class="id"></th>'
    row+='<td><input class="userField" value="" /></td>';
    row+='<td><textarea class="answers" ></textarea></td>'
    row+='<td><textarea class="question" ></textarea></td>'
    row+='<td><input class="questionType" value=""/></td>';
    row+='<td><input class="hyperLink" value=""/></td>';
    row+='<td><textarea class="verifyDetails"></textarea></td>';
    row+='<td></td>'
    $("#qusetionsTable tbody").append(row);   
}

function saveAll(){
    let questions = [];
    let question = {};
    $("#qusetionsTable tbody tr td").each(function(){
        let ths = $(this);
        if(ths.children().attr("class") === 'answers'){
            question[ths.children().attr("class")]  = JSON.stringify(ths.children().val().split(","));
        } else {
            question[ths.children().attr("class")]  = ths.children().val();
        }
        
        if(ths.children().attr("class") === 'verifyDetails'){
            questions.push(question);
            question={};
        }
    });
    $.ajax({
        method: "DELETE",
        url: baseUrl + "questions/multiple",
        'contentType': 'application/json; charset=utf-8'
    })
    .done(function (response) {
        $.ajax({
            method: "POST",
            url: baseUrl + "questions/multiple",
            'contentType': 'application/json; charset=utf-8',
            data: JSON.stringify(questions)
        })
        .done(function (response) {
            alert("DONE!");
            getQuestions();
        }); 
    });      
    console.log(questions);
}