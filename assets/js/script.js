// var quizGame = document.querySelector(".quiz-game");  // Not needed, questionContainer instead
var correct = document.querySelector(".correct");
var incorrect = document.querySelector(".incorrect");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var startTitle = document.querySelector(".start-title");
var questionText = document.querySelector(".question-text")
var questionContainer = document.querySelector(".question-container")
var resetButton = document.querySelector(".reset-button")

var timer;
var timerCount   // Timer is the scorekeeper
var currentQuestionIndex;  // Id's which question the quiz is on
var gameOver = false;
var buttons = [];  // Holds references to our buttons on screen
var scoreList = [];

if (JSON.parse(localStorage.getItem("High Scores"))) {
    scoreList = JSON.parse(localStorage.getItem("High Scores"));
}
// var right;
// var wrong;

// Array used store questions and answers
var questions = [
    {
        question: "Who invented JavaScript?",
        answers: ["Elon Musk", "Bill Gates", "Brendan Eich"],
        correctAnswer: "Brendan Eich"
    },

    {
        question: "What year was CSS introduced?",
        answers: ["1986", "1996", "2006"],
        correctAnswer: "1996"
    },

    {
        question: "Which syntax sets a variable in JavaScript?",
        answers: ["setAttribute", "var", "function"],
        correctAnswer: "var"
    },

    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: ["div", "main", "script"],
        correctAnswer: "script"
    },

    {
        question: "What is the correct syntax for referring to an external script called xxx.js?",
        answers: ["script name=", "script src=", "script href="],
        correctAnswer: "script src="
    },

];

function startGame() {
    // gameOver = false;
    startButton.disabled = true;
    timerCount = 600;
    currentQuestionIndex = 0;

    showNextQuestion();
    startTimer();
}

function showNextQuestion() {

    endGame();

    if (currentQuestionIndex < questions.length && gameOver != true) {
        var currentQuestion = questions[currentQuestionIndex];
        setQuestion(currentQuestion.question);
        showAnswers(currentQuestion);

    } else {
        resetQuestion();
        // get timer value for leaderboard
        // gameOver = true;
    }

}

function startTimer() {
    // Sets timer
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = timerCount;

        if (timerCount === 0) {
            // Clears interval
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

function setQuestion(currentQuestion) {
    questionText.textContent = currentQuestion
}

function showAnswers(currentQuestion) {

    for (let i = 0; i < currentQuestion.answers.length; i++) {
        let answer = currentQuestion.answers[i];
        let button = document.createElement("button");
        button.innerHTML = answer;
        button.name = "questionButton";
        button.addEventListener("click", function (event) {
            console.log(answer + " " + currentQuestion.correctAnswer)
            checkAnswer(answer, currentQuestion.correctAnswer);
        });
        buttons.push(button)
        questionContainer.appendChild(button);
    }
}


// Checking answers 
function checkAnswer(answer, correctAnswer) {
    // var correctText = right;
    // var incorrectText = wrong;

    if (answer === correctAnswer) {
        currentQuestionIndex++;
        resetQuestion();
        showNextQuestion();
        // right++
        // correctText.textContent = right;
    }

    // wrong++
    // showNextQuestion();
    // incorrectText.textContent = wrong;
}


function resetQuestion() {
    for (let i = 0; i < buttons.length; i++) {
        questionContainer.removeChild(buttons[i]);
    }

    setQuestion("");
    buttons = [];
}

startButton.addEventListener("click", startGame);

resetButton.addEventListener("click", resetGame);


function resetGame() {

    if (timerCount > 0) {
        clearInterval(timer);
        resetQuestion();
        startGame();
    }

};

function endGame() {


    if (timerCount === 0 || questions.length === currentQuestionIndex) {

        alert("Your score is " + timerCount);

        var score = prompt("Enter your initials")


        questionContainer.textContent = "GAME OVER";

        var data = {
            initials: score,
            score: timerCount
        }
        scoreList.push(data);
        localStorage.setItem("High Scores", JSON.stringify(scoreList));

    }

};
