var timeLeft;
var timeInterval;
var timerEl = document.getElementById('countdown');
var questionText = document.getElementById('question');
var answerArea = document.getElementById('main');
var answerResult = document.getElementById('result');
var quizStart = document.getElementById("startquiz")
var currentQuestionNumber = 0;

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

var question3 = {
    question: "Arrays in JavaScript can be used to store_____.",
    answers: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
    correctAnswer: "4"
};

var question4 = {
    question: "String values must be enclosed within ____ when being assigned to variables.",
    answers: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
    correctAnswer: "3"
};

var question5 = {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
    correctAnswer: "4"
};

var questionsArray = [question1, question2, question3, question4, question5];

// gameOver() function
function gameOver() {
    // message displays notifying player that game has ended
    questionText.textContent = "Game Over";
    if (timeLeft > 0) {
        answerArea.textContent = "Your score is " + timeLeft;
        // Game asks for initials
    var initialsForm = document.createElement("form");
    var initialsLabel = document.createElement("label");
    var initialsInput = document.createElement("input");
    var initialsButton = document.createElement("button");
    initialsInput.id = "userInitials";
    initialsForm.id = "form1";
    initialsLabel.textContent = "Enter your initials: ";
    initialsButton.textContent = "Submit";
    initialsButton.setAttribute("type", "submit");
    initialsButton.setAttribute("form", "form1");
    initialsButton.setAttribute("value", "Submit");
    initialsForm.appendChild(initialsLabel);
    initialsForm.appendChild(initialsInput);
    initialsForm.appendChild(initialsButton);
    document.getElementById("initials").appendChild(initialsForm);
    initialsInput.addEventListener("submit", function(event) {
        event.preventDefault();
        // TODO: store the information and display the score with initials
        var user = {
            initials: initialsInput.value.trim(),
            score: timeLeft.value.trim()
        }
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "./scores.html";
    });
    }
    else {
        answerArea.textContent = "You did not score any points.";
    }
    clearInterval(timeInterval);
    timerEl.textContent = "";
    // TODO: create button to restart the quiz
    
}

// timer function
function countdown() {
    timeLeft = 60;
  
    timeInterval = setInterval(function() {
      if (timeLeft > 0) {
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

// answerAssessment function
// * pass in event to reference the "click" and using event.currentTarget.id to compare the id of the clicked button to the correct answer component of the question object
function answerAssessment(event) {
    // answerAssessment will figure out what question we're on and which answer is "correct"
    if (event.currentTarget.id === questionsArray[currentQuestionNumber].correctAnswer) {
        answerResult.textContent = "Correct";
        if (currentQuestionNumber + 1 < questionsArray.length) {
            askQuestion(currentQuestionNumber + 1);
        }
        else {
            gameOver();
        }  
    }
    else {
        answerResult.textContent = "incorrect";
        timeLeft = timeLeft - 10;
        if (currentQuestionNumber + 1 < questionsArray.length) {
            askQuestion(currentQuestionNumber + 1);
        }
        else {
            gameOver();
        }
    }
}

// function that creates each of the four answer buttons
function createButtons() {
    // makes empty buttons to use for each question
    for (i = 0; i < 4; i++) {
        var answerButton = document.createElement("button");
        //assigning id's to each button
        answerButton.id = i + 1;
        //answerElements is an empty array that we push the contents of answerButton into
        answerElements.push(answerButton);
        //add event listener that calls function answerAssessment
        answerButton.addEventListener("click",  
            answerAssessment
        );
    }
}

function askQuestion(questionNumber) {
    
    // CLEAR CONTENTS
    answerArea.textContent = ""
    currentQuestionNumber = questionNumber;
    
    // display the question
    questionText.textContent = questionsArray[questionNumber].question;
    // display buttons for each of the four answers
    for (i = 0; i < questionsArray[questionNumber].answers.length; i++) {
        answerElements[i].textContent = questionsArray[questionNumber].answers[i];
        answerArea.appendChild(answerElements[i]);
    }   
}

function gameStart() {
    countdown();
    createButtons();
    askQuestion(0);
}


quizStart.addEventListener("click", function() {
    gameStart();
    document.getElementById("startbutton").textContent = "";
});