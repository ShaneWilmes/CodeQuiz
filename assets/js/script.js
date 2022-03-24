var quizGame = document.querySelector(".quiz-game");
var correct = document.querySelector(".correct");
var incorrect = document.querySelector(".incorrect");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var startTitle = document.querySelector(".start-title");
var questionText = document.querySelector(".question-text")
var questionContainer = document.querySelector(".question-container")

var timer;
var timerCount = 60;
var currentQuestionIndex = 0;
var isWin = false;

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

];

function startGame() {
    isWin = false;
    startButton.disabled = true;
    timerCount = 60;

    showQuestion();
    // Start Timer
}

var buttons = [];

function showQuestion() {



    if (currentQuestionIndex <= questions.length) {
        var currentQuestion = questions[currentQuestionIndex];
        questionText.textContent = currentQuestion.question;


        

        for (let i = 0; i < currentQuestion.answers.length; i++) {
            var answer = currentQuestion.answers[i];
            let button = document.createElement("button");
            button.innerHTML = answer;
            button.name = "questionButton";
            button.addEventListener("click", function() {
                console.log(answer + " " + currentQuestion.correctAnswer)
                checkAnswer(answer, currentQuestion.correctAnswer);
            });
            buttons.push(button)
            questionContainer.appendChild(button);
        }
    }
}

function checkAnswer(answer, correctAnswer) {
    if (answer === correctAnswer) {
        for (let i = 0; i < buttons.length; i++) {
            questionContainer.removeChild(buttons[i]);
        }
        buttons = [];
        currentQuestionIndex++;
        showQuestion();
    } 
}

startButton.addEventListener("click", startGame);
