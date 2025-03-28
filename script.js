document.addEventListener('DOMContentLoaded', function() {
    const guessInput = document.getElementById('guessInput');
    const guessButton = document.getElementById('guessButton');
    const message = document.getElementById('message');
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;

    guessButton.addEventListener('click', function() {
        const userGuess = parseInt(guessInput.value);
        attempts++;

        if (userGuess === randomNumber) {
            message.textContent = `Correct! You guessed it in ${attempts} attempts.`;
            message.style.color = 'green';
        } else if (userGuess < randomNumber) {
            message.textContent = 'Too low! Try again.';
            message.style.color = 'red';
        } else {
            message.textContent = 'Too high! Try again.';
            message.style.color = 'red';
        }

        guessInput.value = '';
        guessInput.focus();
    });
});