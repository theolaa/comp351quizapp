questions = document.getElementById("questions");

function removeQuestion(e) {
    if (e.parentNode.children.length == 1) {
        alert("You cannot remove the last question.");
    } else {
        parent = e.parentNode;
        e.remove();
        for (i = 0; i < parent.children.length; i++) {
            parent.replaceChild(renumberQuestion(parent.children[i], i + 1), parent.children[i]);
        }
    }
}

// Adds question with pre-defined values
function addQuestion(question, code, options, correctAnswer) {

    questionNumber = questions.children.length + 1;
    newQuestion = questions.firstElementChild.cloneNode(true);

    // Question Text
    newQuestion.children[0].children[0].children[2].children[2].value = question;
    // Code Text
    newQuestion.children[0].children[0].children[3].children[2].value = code;

    while (newQuestion.children[0].children[0].children[4].children.length > 1) {
        newQuestion.children[0].children[0].children[4].firstElementChild.remove();
        newQuestion.children[0].children[0].children[5].children[2].lastElementChild.remove();
    }

    for (i = 0; i < options.length; i++) {
        addOption(newQuestion.children[0].children[0].children[4]);
        newQuestion.children[0].children[0].children[4].children[i].children[2].firstElementChild.value = options[i];
    }

    // Correct Answer
    newQuestion.children[0].children[0].children[5].children[2].value = correctAnswer;

    newQuestion = renumberQuestion(newQuestion, questionNumber);
    questions.append(newQuestion);
}

// Adds a blank question
function addBlankQuestion() {
    questionNumber = questions.children.length + 1;
    newQuestion = questions.firstElementChild.cloneNode(true);

    // Question Text
    newQuestion.children[0].children[0].children[2].children[2].value = "";
    // Code Text
    newQuestion.children[0].children[0].children[3].children[2].value = "";
    // Correct Answer
    newQuestion.children[0].children[0].children[5].children[2].value = "a";

    // Prepares a single blank option
    while (newQuestion.children[0].children[0].children[4].children.length != 2) {
        newQuestion.children[0].children[0].children[4].children[newQuestion.children[0].children[0].children[4].children.length - 2].remove();
        newQuestion.children[0].children[0].children[5].children[2].lastElementChild.remove();
    }
    newQuestion.children[0].children[0].children[4].children[0].children[2].children[0].value = "";

    newQuestion = renumberQuestion(newQuestion, questionNumber);
    questions.append(newQuestion);
}

function renumberQuestion(node, number) {

    node.children[0].setAttribute("id", "questionForm" + number);
    formGroup = node.children[0].children[0];
    formGroup.children[0].innerText = "Question " + number;
    formGroup.children[2].children[0].setAttribute("for", "questionText" + number);
    formGroup.children[2].children[2].setAttribute("name", "questionText" + number);
    formGroup.children[2].children[2].setAttribute("id", "questionText" + number);
    formGroup.children[3].children[0].setAttribute("for", "code" + number);
    formGroup.children[3].children[2].setAttribute("name", "code" + number);
    formGroup.children[3].children[2].setAttribute("id", "code" + number);
    formGroup.children[3].children[2].setAttribute("form", "questionForm" + number);
    formGroup.children[5].children[0].setAttribute("for", "correctAnswer" + number);
    formGroup.children[5].children[2].setAttribute("name", "correctAnswer" + number);
    formGroup.children[5].children[2].setAttribute("id", "correctAnswer" + number);

    return node;

}

function saveQuestions() {
    questionsArray = [];
    for (i = 0; i < questions.children.length; i++) {
        console.log("Saving Question " + (i + 1));

        options = [];

        for (j = 0; j < questions.children[i].children[0].children[0].children[4].children.length - 1; j++) {
            options.push(questions.children[i].children[0].children[0].children[4].children[j].children[2].firstElementChild.value);
        }

        question = {
            "questionText": questions.children[i].children[0].children[0].children[2].children[2].value,
            "code": questions.children[i].children[0].children[0].children[3].children[2].value,
            "options": options,
            "answer": questions.children[i].children[0].children[0].children[5].children[2].value

        }

        questionsArray.push(question);

    }
    localStorage.setItem("questions", JSON.stringify(questionsArray));
    document.getElementById("savedTime").innerText = "Questions saved at " + currentTime();
}

function loadQuestions() {

    // Gotta use "k" here because if I use "i" it messes up for some reason...
    if (localStorage.getItem("questions")) {
        storageQuestions = JSON.parse(localStorage.getItem("questions"));
        for (k = 0; k < storageQuestions.length; k++) {
            addQuestion(storageQuestions[k].questionText, storageQuestions[k].code, storageQuestions[k].options, storageQuestions[k].answer);
        }
        removeQuestion(questions.firstElementChild);
    }
}

function getLetterFromInt(i) {
    switch (i) {
        case 1: return "A"; break;
        case 2: return "B"; break;
        case 3: return "C"; break;
        case 4: return "D"; break;
        case 5: return "E"; break;
        case 6: return "F"; break;
        case 7: return "G"; break;
        case 8: return "H"; break;
        case 9: return "I"; break;
        case 10: return "J"; break;
        default: return ":("; break;
    }
}

function addOption(e) {
    optionNumber = e.children.length;
    if (optionNumber > 10) {
        alert("Cannot have more than ten options.\nSeriously, why would you want that anyways?");
        return;
    }
    optionLetter = getLetterFromInt(optionNumber);

    option = document.createElement("div");
    option.setAttribute("class", "option pb-2 row");
    option.setAttribute("id", "option" + optionLetter);

    label = document.createElement("label");
    label.innerText = "Option " + optionLetter;

    textColumn = document.createElement("div");
    textColumn.setAttribute("class", "col-sm col-sm-10");

    optionText = document.createElement("input");
    optionText.setAttribute("type", "text");
    optionText.setAttribute("class", "form-control");
    optionText.setAttribute("name", "option" + optionLetter + "text");
    optionText.setAttribute("id", "option" + optionLetter + "text");

    delButtonColumn = document.createElement("div");
    delButtonColumn.setAttribute("class", "col col-sm-2");

    delButton = document.createElement("button");
    delButton.setAttribute("class", "btn bg-danger text-light col form-control");
    delButton.setAttribute("onclick", "removeOption(this.parentNode.parentNode)");
    delButton.innerText = " X ";

    option.append(label);
    option.append(document.createElement("br"));

    textColumn.append(optionText);
    delButtonColumn.append(delButton);

    option.append(textColumn);
    option.append(delButtonColumn);

    e.insertBefore(option, e.children[e.children.length - 1]);

    correctAnswerOption = document.createElement("option");
    correctAnswerOption.setAttribute("value", optionLetter.toLowerCase());
    correctAnswerOption.innerText = optionLetter;
    e.nextElementSibling.lastElementChild.append(correctAnswerOption);

}

function removeOption(e) {
    if (e.parentNode.children.length <= 2) {
        alert("You cannot remove the last option.");
    } else {
        parent = e.parentNode;
        e.parentNode.nextElementSibling.lastElementChild.lastElementChild.remove();
        e.parentNode.removeChild(e);
        renameOptions(parent);
    }
}

function renameOptions(e) {
    for (i = 0; i < e.children.length - 1; i++) {
        // Label
        optionLetter = getLetterFromInt(i + 1);
        e.children[i].children[0].setAttribute("for", "option" + optionLetter + "text");
        e.children[i].children[0].innerText = "Option " + optionLetter;

        // Text Column
        e.children[i].children[2].setAttribute("name", "option" + optionLetter + "text");
        e.children[i].children[2].setAttribute("id", "option" + optionLetter + "text");
    }
}

function currentTime() {
    var d = new Date();
    hours = d.getHours();
    minutes = d.getMinutes();
    seconds = d.getSeconds();

    return ((hours < 10) ? "0" + hours : hours) + ":" + ((minutes < 10) ? "0" + minutes : minutes) + ":" + ((seconds < 10) ? "0" + seconds : seconds)

}

window.onload = function () {
    loadQuestions();
    saveQuestions();
    setInterval(saveQuestions, 2000);
}