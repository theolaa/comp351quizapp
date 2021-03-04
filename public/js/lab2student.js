let questions = document.getElementById("questions");
let template = document.getElementById("template");
let optionTemplate = document.getElementById("optionTemplate");
let results = document.getElementById("results");
let retrieve = JSON.parse(localStorage.getItem("questions"));

score = 0;
questionsAnswered = 0;

function loadQuestions() {
	if (retrieve) {

		for (i = 0; i < retrieve.length; i++) {

			newQuestion = template.cloneNode(true);
			newQuestion.style.display = "block";
			newQuestion.id = "q" + i;
			newQuestion.firstElementChild.id = "q" + i + "CorrectIndicator";
			newQuestion.children[1].innerHTML = "Question " + (i + 1) + " - " + retrieve[i].questionText;
			newQuestion.children[3].innerHTML = retrieve[i].code;

			for (j = 0; j < retrieve[i].options.length; j++) {
				option = optionTemplate.cloneNode(true);
				option.style.display = "inline"
				option.id = "q" + (i + 1) + getLetterFromInt(j + 1);
				option.firstElementChild.firstElementChild.name = "q" + (i + 1);
				option.firstElementChild.firstElementChild.value = getLetterFromInt(j + 1);
				option.firstElementChild.children[1].innerHTML = retrieve[i].options[j];
				newQuestion.children[5].append(option);
			}

			newQuestion.children[7].setAttribute("onclick", "checkAnswer(" + i + ", this)");

			questions.append(newQuestion);

		}
	} else {
		questions.innerText = "No Quiz Available, please speak to the Administrator for more details."
	}
}

function checkAnswer(questionNumber, e) {
	options = document.getElementsByName("q" + (questionNumber + 1));
	for (i = 0; i < options.length; i++) {
		if (options[i].checked) {
			questionsAnswered++;
			e.disabled = true;
			if (options[i].value == retrieve[questionNumber].answer) {
				score++;
				options[i].parentNode.style.backgroundColor = "lightgreen";
			} else {
				options[i].parentNode.style.backgroundColor = "lightcoral";
				for (j = 0; j < options.length; j++) {
					if (options[j].value == retrieve[questionNumber].answer) {
						options[j].parentNode.style.backgroundColor = "darkseagreen";
					}
				}
			}

			if (questionsAnswered == retrieve.length) {
				document.getElementById("resultContainer").style.display = "block";
				document.getElementById("extraSpace").style.marginTop = "200px";
				results.innerText = "You scored " + score + "/" + questionsAnswered;
				window.scrollTo(0, document.body.scrollHeight);
			}
		}
	}
}

function reset() {
	window.scrollTo(0, 0);
	setTimeout(function () { location.reload() }, 1000);
}

function getLetterFromInt(i) {
	switch (i) {
		case 1: return "a"; break;
		case 2: return "b"; break;
		case 3: return "c"; break;
		case 4: return "d"; break;
		case 5: return "e"; break;
		case 6: return "f"; break;
		case 7: return "g"; break;
		case 8: return "h"; break;
		case 9: return "i"; break;
		case 10: return "j"; break;
		default: return ":("; break;
	}
}

window.onload = function () {
	loadQuestions();
}