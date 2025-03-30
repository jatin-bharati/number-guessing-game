let secretNumber;
let attempts = 0;
let bestScore = localStorage.getItem('bestScore') || '--';

document.getElementById('bestScore').textContent = `Best Score for 100: ${bestScore}`;
updateMaxNumber();

document.querySelectorAll('input[name="difficulty"]').forEach(radio => {
    radio.addEventListener('change', () => {
        updateMaxNumber();
        resetGame();
    });
});

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
    document.getElementById('message').textContent = '';
    document.getElementById('guessInput').value = '';
    document.getElementById('guessButton').style.display = 'inline-block';
    document.getElementById('playAgainButton').style.display = 'none';
    document.getElementById('balloon-container').style.display = 'none';
}

function checkGuess() {
    const guess = parseInt(document.getElementById('guessInput').value);
    const max = parseInt(document.getElementById('maxNumber').textContent);
    attempts++;

    if (isNaN(guess) || guess < 1 || guess > max) {
        document.getElementById('message').textContent = `Please enter a number between 1 and ${max}!`;
    } else if (guess < secretNumber) {
        document.getElementById('message').textContent = 'Too low! Try again.';
    } else if (guess > secretNumber) {
        document.getElementById('message').textContent = 'Too high! Try again.';
    } else {
        document.getElementById('message').textContent = `You got it in ${attempts} attempts!`;
        document.getElementById('guessButton').style.display = 'none';
        document.getElementById('playAgainButton').style.display = 'inline-block';
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
