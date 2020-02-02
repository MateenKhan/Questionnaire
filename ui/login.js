var baseUrl = "http://localhost:8081/";

function login(){
    let email = $("#email").val();
    let pwd = $("#pwd").val();
    let jsonData ={ email: email, password: pwd };
    $.ajax({
        method: "POST",
        url: baseUrl+"login",
        'contentType': 'application/json; charset=utf-8',
        data: JSON.stringify(jsonData)
      })
    .done(function( msg ) {
        alert( "Data Saved: " + JSON.stringify(msg) );
    });
// $.postJSON(baseUrl+"login", jsonData, successLogin)
//     .fail(function(res) {
//         console.error(res.responseText);
//     })
//     .always(function() {
//         console.log("FINISHED ajax post, hide the loading throbber");
//     });
}

// $.postJSON = function(url, data, callback) {
//     return jQuery.ajax({
//       'type': 'POST',
//       'url': url,
//       'contentType': 'application/json; charset=utf-8',
//       'data': JSON.stringify(data),
//       'dataType': 'json',
//       'success': callback
//     });
//   };
