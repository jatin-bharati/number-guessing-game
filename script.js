document.addEventListener('DOMContentLoaded', function() {
    const guessInput = document.getElementById('guessInput');
    const guessButton = document.getElementById('guessButton');
    const message = document.getElementById('message');
    const playAgainButton = document.getElementById('playAgainButton');
    let attempts = 0;
    let randomNumber;
    let bestScores = {
        10: Infinity,   // Easy
        100: Infinity,  // Medium
        1000: Infinity  // Hard
    };

    // Get the current difficulty level
    function getDifficulty() {
        const selected = document.querySelector('input[name="difficulty"]:checked');
        return parseInt(selected.value);
    }

    // Generate a new random number based on the current difficulty
    function generateRandomNumber() {
        const maxNumber = getDifficulty();
        randomNumber = Math.floor(Math.random() * maxNumber) + 1;
    }

    // Update the game info (max number and best score display)
    function updateGameInfo() {
        const currentDifficulty = getDifficulty();
        document.getElementById('maxNumber').textContent = currentDifficulty;
        const score = bestScores[currentDifficulty];
        document.getElementById('bestScore').textContent = `Best Score for ${currentDifficulty}: ${score === Infinity ? '--' : score}`;
    }

    // Initial setup
    generateRandomNumber();
    updateGameInfo();

    // When difficulty changes, start a new game
    document.querySelectorAll('input[name="difficulty"]').forEach(radio => {
        radio.addEventListener('change', function() {
            updateGameInfo();
            generateRandomNumber();
            attempts = 0;
            message.textContent = '';
            playAgainButton.style.display = 'none';
            guessInput.focus();
        });
    });

    // Handle guess submission
    guessButton.addEventListener('click', function() {
        const userGuess = parseInt(guessInput.value);
        attempts++;

        if (userGuess === randomNumber) {
            message.textContent = `Correct! You guessed it in ${attempts} attempts.`;
            message.style.color = 'green';
            playAgainButton.style.display = 'block';

            const currentDifficulty = getDifficulty();
            if (attempts < bestScores[currentDifficulty]) {
                bestScores[currentDifficulty] = attempts;
                updateGameInfo();
            }
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

    // Handle "Play Again" button click
    playAgainButton.addEventListener('click', function() {
        generateRandomNumber();
        attempts = 0;
        message.textContent = '';
        playAgainButton.style.display = 'none';
        guessInput.value = '';
        guessInput.focus();
    });
});
