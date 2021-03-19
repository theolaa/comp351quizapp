function setup() {
    loadQuestions();
}

function loadQuestions() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://theocomp351quizapp.herokuapp.com/getquestions", true);
    //xhttp.open("GET", "http://localhost:8080/getquestions/", true);
    xhttp.send();
    console.log("Getting Questions...");
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Received Questions.");
            obj = JSON.parse(this.responseText);
            obj = obj[0].quiz_data;
            console.log (obj);
            if (obj) {
                window.sessionStorage.setItem("questions", "["+obj+"]");
            }
            // alert("Questions loaded successfully!");
        }
    };
}

window.onload = setup;