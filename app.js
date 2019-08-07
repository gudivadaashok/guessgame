let secretNumber = 0,
 numberOfGuesses = 0,
    userGuessedNumber = 0;

let writeMessage = (element, message, appendMessage = false) => {
    if(element && message){
        element.innerHTML = appendMessage ? element.innerHTML + message : message;
    }
};



function newGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    console.log("secretNumber "+ secretNumber);
    numberOfGuesses = 0;
    writeMessage(historyList, '');
    writeMessage()
}

function userGuessed(event) {
    event.preventDefault();
    const userGuessed = document.getElementById('userGuess');
    const statusArea = document.getElementById('statusArea');
    const historyList = document.getElementById('historyList');
    userNumber = userGuessed.value ? parseInt(userGuessed.value) : 0;
    if (Number.isNaN(userNumber) || (userNumber < 0 || userNumber > 100)){
        writeMessage (statusArea, '<p>Please guess a number between 1-100</p>');
    } else if (!Number.isInteger(userNumber)) {
        writeMessage(statusArea, '<p>Please enter a whole number 1-100 ......' +
            ' secretNumber is whole</p>');
    } else {
        numberOfGuesses++;
        if (userNumber == secretNumber) {
            // Got it
            writeMessage(statusArea, '<p>You got me in ' + numberOfGuesses +' guesses, I was thinking '
                + secretNumber + '. </p>');
            if (confirm('Lets play again')) {
                newGame();
            }
        } else if (userNumber < secretNumber) {
            // User needs to guess higher
            writeMessage(statusArea, '<p>You need to guess higher than ' + userNumber + ', try again...</p>');
            writeMessage(historyList, '<li>' + userNumber +' (too low)</li>', true);
            // TODO find the nth child in ol which equal to userNumber
        } else {
            // User needs to guess lower
            writeMessage(statusArea, '<p>You need to guess lower than ' + userNumber + ', try again...</p>');
            writeMessage(historyList, '<li>' + userNumber + ' (too high)</li>', true);
            // TODO find the nth child in ol which equal to userNumber
        }
    }
    userGuessed.value = '';
}

window.onload = function() {
    newGame();
    document.getElementById('form').onsubmit = userGuessed;
};
