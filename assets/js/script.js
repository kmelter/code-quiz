var timeLeft;
var timerEl = document.getElementById('countdown');
var questionText = document.getElementById('question');
var answerArea = document.getElementById('main');
var answerResult = document.getElementById('result');

var answerElements = [];

var question1 = {
    question: "Commonly used data types DO NOT include:",
    answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    correctAnswer: "3"
};

var question2 = {
    question: "The condition of an if / else statement is enclosed with____.",
    answers: ["1. quotes", "2. curly brackets", "3. paranthesis", "4. square brackets"],
    correctAnswer: "3"
};

var questionsArray = [question1, question2];




function gameOver() {
    // message displays notifying player that game has ended
    questionText.textContent = "Game Over";
    answerArea.textContent = ""
    // Game asks for initials
    // initials and score are displayed (maybe other function)
}

function countdown() {
    var timeLeft = 60;
  
    // TODO: Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function() {
      if (timeLeft >= 0) {
        timerEl.textContent = "Time: " + timeLeft;
        timeLeft = timeLeft - 1; 
      }
      else {
        clearInterval(timeInterval);
        timerEl.textContent = "";
        gameOver();
      }
    }, 1000);
}

function createButtons() {
    // makes empty buttons to use for each question
    for (i = 0; i < question1.answers.length; i++) {
        var answerButton = document.createElement("button");
        answerButton.id = i + 1;
        answerElements.push(answerButton);
    }
}

function askQuestion(questionNumber) {
    
    // CLEAR CONTENTS
    answerArea.textContent = ""
    
    // display the question
    questionText.textContent = questionsArray[questionNumber].question;
    // display buttons for each of the four answers
    for (i = 0; i < questionsArray[questionNumber].answers.length; i++) {
        answerElements[i].textContent = questionsArray[questionNumber].answers[i];
        answerArea.appendChild(answerElements[i]);
    }
    
    
    //for each element in answerElements
        //if the element id === the correct answer id
        //then add event listener for correct answer
        //else add event listener for incorrect answer

    for (i = 0; i < answerElements.length; i++) {
        if (answerElements[i].id === questionsArray[questionNumber].correctAnswer) {
            answerElements[i].addEventListener("click", function() {
                answerResult.textContent = "Correct";
                if (questionNumber + 1 < questionsArray.length) {
                    askQuestion(questionNumber + 1);
                }
                else {
                    gameOver();
                }
            });
        }
        else {
            answerElements[i].addEventListener("click", function() {
                answerResult.textContent = "incorrect";
                timeLeft = timeLeft - 10;
                if (questionNumber + 1 < questionsArray.length) {
                    askQuestion(questionNumber + 1);
                }
                else {
                    gameOver();
                }
            });
        }
    }
}

function gameStart() {
    countdown();
    createButtons();
    askQuestion(0);
}


gameStart();