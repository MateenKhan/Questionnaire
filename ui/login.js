var baseUrl = "http://localhost:8081/";

function login() {
    let email = $("#email").val();
    let pwd = $("#pwd").val();
    let jsonData = { email: email, password: pwd };
    $.ajax({
        method: "POST",
        url: baseUrl + "login",
        'contentType': 'application/json; charset=utf-8',
        data: JSON.stringify(jsonData)
    })
    .done(function (response) {
        afterLogin(response);
    });
}

function afterLogin(response) {
    if (response) {
        sessionStorage.setItem("user", JSON.stringify(response));
        window.location.href = "questions.html"
    } else {
        alert("Invalid Credentilas!");
    }
}
