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
var scoreList = [];  //Holds references to the scores



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

// Starts the quiz and set timer countdown value
function startGame() {
    startButton.disabled = true;  // Prevents start button from re-setting the game
    timerCount = 600;
    currentQuestionIndex = 0;  // Allows all ?'s to be asked
    showNextQuestion();
    startTimer();
};

function showNextQuestion() {

    

    if (currentQuestionIndex < questions.length && gameOver != true) {
        var currentQuestion = questions[currentQuestionIndex];
        setQuestion(currentQuestion.question);
        showAnswers(currentQuestion);

    } else {
        resetQuestion();
    }

    endGame();  // Triggers prompts for score and initials

};

// Sets timer and clears it upon reaching 0
function startTimer() {
    
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = timerCount;

        if (timerCount === 0) {
            // Clears interval
            clearInterval(timer);
            endGame();
        }
    }, 1000);
};

function setQuestion(currentQuestion) {
    questionText.textContent = currentQuestion
};

// Presents each question 
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
};


// Checking answers with validation
function checkAnswer(answer, correctAnswer) {
    
    if (answer === correctAnswer) {
        currentQuestionIndex++;
        resetQuestion();
        showNextQuestion();
        
    }
};
    

// Takes the quiz back to first question if game ends or is reset
function resetQuestion() {
    for (let i = 0; i < buttons.length; i++) {
        questionContainer.removeChild(buttons[i]);
    }

    setQuestion("");
    buttons = [];
};

// Allows user to reset game and timer/score.  
function resetGame() {

    if (timerCount > 0) {
        clearInterval(timer);
        resetQuestion();
        startGame();
        window.location.reload();
    }

};

// Alerts user of score and asks to submit initials.  Takes input and stores it to High Scores page
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
        clearInterval(timer);
    }

};

if (JSON.parse(localStorage.getItem("High Scores"))) {
    scoreList = JSON.parse(localStorage.getItem("High Scores"));  // Creates string from score input and stores it 
};

startButton.addEventListener("click", startGame);  // Adds functionality to start but and starts the game

resetButton.addEventListener("click", resetGame); // Adds functionality to reset button and re-starts the game
