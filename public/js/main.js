function setup() {
    window.localStorage.clear();
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
            window.localStorage.setItem("quizzes", this.responseText);
            if (JSON.parse(window.localStorage.getItem("quizzes"))[0]) {
                window.localStorage.setItem("questions", "["+JSON.parse(this.responseText)[0].quiz_data + "]");
            }
        }
    };
}

window.onload = setup;