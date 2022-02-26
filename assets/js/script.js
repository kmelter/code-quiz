var timeLeft;
var timerEl = document.getElementById('countdown');
var questionText = document.getElementById('question');
var answerArea = document.getElementById('main');
var answerResult = document.getElementById('result');

var question1 = {
    question: "Commonly used data types DO NOT include:",
    answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"]
}





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

function askQuestion1() {
    
    // CLEAR CONTENTS
    answerArea.textContent = ""
    
    // display the question
    questionText.textContent = question1.question
    // make buttons for each of the four answers
    for (i = 0; i < question1.answers.length; i++) {
        var answerButton = document.createElement("button");
        answerButton.textContent = question1.answers[i];
        answerButton.className = i + 1;
        answerArea.appendChild(answerButton);
    }
    
    // if user selects correct answer
    if (document.getElementsByClassName('3').clicked === true) {
        answerResult.textContent = "Correct";
        question2();
    }
    // if user selects incorrect answer
    // * countdown -10 seconds (timeLeft) if wrong
    if (document.getElementsByClassName('1', '2', '4').clicked === true) {
        answerResult.textContent = "incorrect";
        timeLeft = timeLeft - 10;
        // DECIDE WHETHER OR NOT USER GETS ANOTHER CHANCE TO ANSWER CORRECTLY OR MOVE ON TO NEXT QUESTION
    }
}

function gameStart() {
    countdown();
    askQuestion1();
}


gameStart();