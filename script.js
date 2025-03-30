let secretNumber;
let attempts = 0;
let bestScore = localStorage.getItem('bestScore') || '--';

// Initialize the game
document.getElementById('bestScore').textContent = `Best Score for 100: ${bestScore}`;
updateMaxNumber();

// Update max number when difficulty changes
document.querySelectorAll('input[name="difficulty"]').forEach(radio => {
    radio.addEventListener('change', () => {
        updateMaxNumber();
        resetGame();
    });
});

// Add event listeners for buttons
document.getElementById('guessButton').addEventListener('click', checkGuess);
document.getElementById('playAgainButton').addEventListener('click', resetGame);

function updateMaxNumber() {
    const difficulty = document.querySelector('input[name="difficulty"]:checked').value;
    document.getElementById('maxNumber').textContent = difficulty;
    resetGame();
}

function resetGame() {
    const max = parseInt(document.getElementById('maxNumber').textContent);
    secretNumber = Math.floor(Math.random() * max) + 1;
    attempts = 0;
    const messageElement = document.getElementById('message');
    messageElement.textContent = ''; // Clear message
    messageElement.classList.remove('correct'); // Remove green theme
    document.getElementById('guessInput').value = '';   // Clear input
    document.getElementById('guessButton').style.display = 'inline-block'; // Show Guess button
    document.getElementById('playAgainButton').style.display = 'none';     // Hide Play Again button
    document.getElementById('balloon-container').style.display = 'none';  // Hide balloons
}

function checkGuess() {
    const guessInput = document.getElementById('guessInput');
    const guess = parseInt(guessInput.value);
    const max = parseInt(document.getElementById('maxNumber').textContent);
    const messageElement = document.getElementById('message');

    console.log(`Guess: ${guess}, Secret: ${secretNumber}, Max: ${max}`); // Debugging

    attempts++;

    messageElement.classList.remove('correct'); // Reset to default style

    if (isNaN(guess) || guess < 1 || guess > max) {
        messageElement.textContent = `Please enter a number between 1 and ${max}!`;
    } else if (guess < secretNumber) {
        messageElement.textContent = 'Hint: Too low! Try a higher number.';
    } else if (guess > secretNumber) {
        messageElement.textContent = 'Hint: Too high! Try a lower number.';
    } else {
        messageElement.textContent = `You got it in ${attempts} attempts!`;
        messageElement.classList.add('correct'); // Apply green theme
        document.getElementById('guessButton').style.display = 'none';       // Hide Guess button
        document.getElementById('playAgainButton').style.display = 'inline-block'; // Show Play Again button
        if (max === 100 && (bestScore === '--' || attempts < bestScore)) {
            bestScore = attempts;
            localStorage.setItem('bestScore', bestScore);
            document.getElementById('bestScore').textContent = `Best Score for 100: ${bestScore}`;
        }
        triggerBalloonBlast();
    }
}

function triggerBalloonBlast() {
    const container = document.getElementById('balloon-container');
    container.style.display = 'block';
    for (let i = 0; i < 10; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = `${Math.random() * 100}vw`;
        balloon.style.animationDelay = `${Math.random() * 0.5}s`;
        container.appendChild(balloon);
        setTimeout(() => balloon.remove(), 2000);
    }
    setTimeout(() => container.style.display = 'none', 2000);
}
