'use strict';
let score, highScore, secretNumber;

/**
 * Initialize new 🕹
 * @param {String} nombre
 * @returns {Void} not return
 */
const initGame = function (nombre) {
  score = 20;
  highScore = 0;
  document.querySelector('.score').textContent = score;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.number').style.with = '15rem';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  printMessage('Start guessing...');
  document.querySelector('body').style.backgroundColor = '#222';
  console.log(secretNumber);
};

const printMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  const guessValue = Number(document.querySelector('.guess').value);
  console.log(`Guess value ${guessValue} type of ${typeof guessValue}`);
  // There is no input
  if (!guessValue) {
    printMessage('⛔️ No number!');
  }
  // When we have a Winner
  else if (guessValue === secretNumber) {
    printMessage('We have a Winner, 👏 !!YOU!! ✌');
    document.querySelector('.score').textContent = score;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.with = '30rem';
    document.querySelector('.number').textContent = guessValue;
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
  }
  // When is wrong guessValue
  else if (guessValue !== secretNumber) {
    if (score > 1) {
      printMessage(guessValue > secretNumber ? '😸 Too high!' : '😠 Too low!');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      printMessage('You lost the Game 🖕');
      document.querySelector('.score').textContent = 0;
    }
    document.querySelector('body').style.backgroundColor = '#222';
  }
});

// Replay game
document.querySelector('.again').addEventListener('click', initGame);

/**
 * Play 🎲 🕹
 */
initGame();
