var timeLeft;
var timeInterval;
var timerEl = document.getElementById('countdown');
var questionText = document.getElementById('question');
var answerArea = document.getElementById('main');
var answerResult = document.getElementById('result');
var quizStart = document.getElementById("startquiz")
var currentQuestionNumber = 0;

var initialsInput = document.querySelector("#initials-entry");
var submitButton = document.querySelector("#form-submit");

var highScoresStorage = localStorage.setItem('highscores', "");

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


function saveToLocal (value){
    //Stringify object into saveable items
    var saveableValue = JSON.stringify(value);
    //Save key highscores with value from saveableValue
    localStorage.setItem('highscores', saveableValue);
}

function getScores(){
    //Get item from local storage
    var localStorageItem = localStorage.getItem('highscores');
    //Parses localStorage back into a JSON object
    var highScoresArray = JSON.parse(localStorageItem);
    //Return Array object
    return highScoresArray;
}

function submitScore(initialEntry, score){
    //Get current store of saved stuff, should be the shape of an object
    var highscores = getScores();
    console.log(highscores);
    //Assign arguments key and value pair to an object
    var objToSave = {
      initials: initialEntry,
      score: score
    }
    //Add new score to array of all scores
    highscores.push(objToSave);
    //Save array to localStorage
    saveToLocal(highscores);
}

// gameOver() function
function gameOver() {
    // message displays notifying player that game has ended
    questionText.textContent = "Game Over";
    if (timeLeft > 0) {
        answerArea.textContent = "Your score is " + timeLeft;
        
        submitButton.addEventListener("click", function(event) {
            event.preventDefault();
            submitScore(initialsInput.value.trim(), timeLeft);
            window.location.href="./scores.html";
        });
    }
    else {
        answerArea.textContent = "You did not score any points.";
    }
    clearInterval(timeInterval);
    timerEl.textContent = "";
    
    
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