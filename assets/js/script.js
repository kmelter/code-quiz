var timerEl = document.getElementById('countdown');
var questionText = document.getElementById('question');


function gameOver() {
    // message displays notifying player that game has ended
    questionText.textContent = "Game Over";
    // Game asks for initials
    // initials and score are displayed (maybe other function)
}

function countdown() {
    var timeLeft = 5;
  
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

function gameStart() {
    
    countdown();

}

gameStart();