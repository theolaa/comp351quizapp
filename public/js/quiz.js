answers = {
    q1: "a",
    q2: "c",
    q3: "d",
    q4: "b",
    q5: "b",
    q6: "d"
}

function checkAnswer(question) {
    options = document.getElementsByName(question);
    for (i = 0; i < options.length; i++) {
        if (options[i].checked) {
            document.getElementById(question + "button").style.visibility = "hidden";
            if (options[i].value == answers[question]) {
                document.getElementById(question).style.backgroundColor = "lightgreen";
            } else {
                document.getElementById(question).style.backgroundColor = "lightcoral";
            }
        }
    }
}