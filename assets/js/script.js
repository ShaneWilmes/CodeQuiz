var quizGame = document.querySelector(".quiz-game");
var correct = document.querySelector(".correct");
var incorrect = document.querySelector(".incorrect");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var startTitle = document.querySelector(".start-title");
var questionText = document.querySelector(".question-text")
var questionContainer = document.querySelector(".question-container")

var timer;
var timerCount;  // Timer is also the scorekeeper
var currentQuestionIndex = 0;  // Which question are we on?
var gameOver = false;
var buttons = [];  // Holds references to our buttons on screen
var correct = 0;
var incorrect = 0;

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
    gameOver = false;
    startButton.disabled = true;
    timerCount = 60;
    currentQuestionIndex = 0;

    playGame();
    startTimer();
}

function endGame() {
    quizGame.textContent = "GAME OVER";
    startButton.disabled = false;
    playGame();
}

function playGame() {
    if (currentQuestionIndex <= questions.length && gameOver != true) {
        var currentQuestion = questions[currentQuestionIndex];
        setQuestion(currentQuestion.question);
        showAnswers(currentQuestion);

    } else {
        resetQuesiton();
        // get timer value for leaderboard
        gameOver = true;
    }

}
// I don't think 2 if statements are needed

function startTimer() {
    // Sets timer
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount >= 0) {
            // Tests if win condition is met
            if (gameOver && timerCount > 0) {
                // Clears interval and stops timer
                clearInterval(timer);
                // winGame();
            }
        }
        // Tests if time has run out

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
        var answer = currentQuestion.answers[i];
        let button = document.createElement("button");
        button.innerHTML = answer;
        button.name = "questionButton";
        button.addEventListener("click", function () {
            console.log(answer + " " + currentQuestion.correctAnswer)
            checkAnswer(answer, currentQuestion.correctAnswer);
        });
        buttons.push(button)
        questionContainer.appendChild(button);
    }
}

// Checking answers 
function checkAnswer(answer, correctAnswer) {
    if (answer === correctAnswer) {
        currentQuestionIndex++;
        resetQuesiton();
        playGame();
        correct++
        correctText.textContent = correct;
    } else {
        incorrect++
        incorrectText.textContent = incorrect;
    }
}

function resetQuesiton() {
    for (let i = 0; i < buttons.length; i++) {
        questionContainer.removeChild(buttons[i]);
    }

    setQuestion("");
    buttons = [];
}

startButton.addEventListener("click", startGame);

var resetButton = document.querySelector(".reset-button")

function resetGame() {

    correct = 0;
    incorrect = 0;
}
