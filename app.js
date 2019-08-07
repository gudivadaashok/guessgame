let secretNumber = 0,
 numberOfGuesses = 0,
    userGuessedNumber = 0;

let writeMessage = (element, message, appendMessage) => {
    let elementToUpdate = document.getElementById(element);
    if(element && message){
        elementToUpdate.innerHTML = appendMessage ? elementToUpdate.innerHTML + message : message;
    }
};



function newGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    numberOfGuesses = 0;
    writeMessage(historyList, '');
    writeMessage()
}

function userGuessed(event) {
    event.preventDefault();
    const userGuessed = document.getElementById('userGuess');
    const statusArea = document.getElementById('statusArea');
    const historyList = document.getElementById('historyList');
    userGuessed.value ? userGuessed.value : 0;
    if (userGuessedNumber.length == 0 || (userGuessedNumber > 0 && userGuessedNumber < 101)){
        writeMessage (statusArea, '<p>Please guess a number between 1-100</p>');
    } else if (userGuessedNumber.indexOf('.') != -1) {
        writeMessage(statusArea, '<p>Please enter a whole number 1-100 ......' +
            ' secretNumber is whole</p>');
    } else {
        numberOfGuesses++;
        if (userGuessed == secretNumber) {
            // Got it
            writeMessage(statusArea, '<p>You got me in ' + numberOfGuesses +' guesses, I was thinking '
                + secretNumber + '. </p>');
            if (confirm('Lets play again')) {
                newGame();
            }
        } else if (userGuessed < secretNumber) {
            // User needs to guess higher
            writeMessage(statusArea, '<p>You need to guess higher than ' + userGuessed + ', try again...</p>');
            writeMessage(historyList, '<li>' + userGuessed +' (too low)</li>', true);
            // TODO find the nth child in ol which equal to userGuessedNumber
        } else {
            // User needs to guess lower
            writeMessage(statusArea, '<p>You need to guess lower than ' + userGuessed + ', try again...</p>');
            writeMessage(historyList, '<li>' + userGuessed + ' (too high)</li>', true);
            // TODO find the nth child in ol which equal to userGuessedNumber
        }
    }
    document.getElementById(userGuessed).value = '';
}

window.onload = function() {
    newGame();
    document.getElementById('form').onsubmit = userGuessed(event);
};
