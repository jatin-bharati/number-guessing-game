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
    document.getElementById('glitter-container').style.display = 'none';
    document.getElementById('too-high-container').style.display = 'none';
    document.getElementById('too-low-container').style.display = 'none';
}

function checkGuess() {
    const guess = parseInt(document.getElementById('guessInput').value);
    const max = parseInt(document.getElementById('maxNumber').textContent);
    attempts++;

    if (isNaN(guess) || guess < 1 || guess > max) {
        document.getElementById('message').textContent = `Please enter a number between 1 and ${max}!`;
    } else if (guess < secretNumber) {
        document.getElementById('message').textContent = 'Too low! Try again.';
        triggerTooLow();
    } else if (guess > secretNumber) {
        document.getElementById('message').textContent = 'Too high! Try again.';
        triggerTooHigh();
    } else {
        document.getElementById('message').textContent = `You got it in ${attempts} attempts!`;
        document.getElementById('guessButton').style.display = 'none';
        document.getElementById('playAgainButton').style.display = 'inline-block';
        if (max === 100 && (bestScore === '--' || attempts < bestScore)) {
            bestScore = attempts;
            localStorage.setItem('bestScore', bestScore);
            document.getElementById('bestScore').textContent = `Best Score for 100: ${bestScore}`;
        }
        triggerCelebration();
    }
}

function triggerTooHigh() {
    const container = document.getElementById('too-high-container');
    container.style.display = 'block';
    const arrow = document.createElement('div');
    arrow.className = 'hint-arrow too-high';
    container.appendChild(arrow);
    setTimeout(() => {
        arrow.remove();
        container.style.display = 'none';
    }, 1000);
}

function triggerTooLow() {
    const container = document.getElementById('too-low-container');
    container.style.display = 'block';
    const arrow = document.createElement('div');
    arrow.className = 'hint-arrow too-low';
    container.appendChild(arrow);
    setTimeout(() => {
        arrow.remove();
        container.style.display = 'none';
    }, 1000);
}

function triggerCelebration() {
    triggerBalloonBlast();
    triggerGlitterSparkle();
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

function triggerGlitterSparkle() {
    const container = document.getElementById('glitter-container');
    container.style.display = 'block';
    for (let i = 0; i < 20; i++) {
        const glitter = document.createElement('div');
        glitter.className = 'glitter';
        glitter.style.left = `${Math.random() * 100}vw`;
        glitter.style.top = `${Math.random() * 100}vh`;
        glitter.style.animationDelay = `${Math.random() * 0.3}s`;
        container.appendChild(glitter);
        setTimeout(() => glitter.remove(), 1500);
    }
    setTimeout(() => container.style.display = 'none', 1500);
}
