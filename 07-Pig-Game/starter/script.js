'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnRollEl = document.querySelector('.btn--roll');
const btnNewEl = document.querySelector('.btn--new');
const btnHoldEl = document.querySelector('.btn--hold');
const playerEl = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const currentScoreEl = document.getElementById('current--0');
const currentScore1El = document.querySelector('#current--1');
let score, currentScore, activePlayer, playing;

const freshGame = function () {
  activePlayer = Math.trunc(Math.random() * 2);
  console.log(`Comienza el juego el player ${activePlayer + 1}`);
  currentScore = 0;
  score = [0, 0];
  playing = true;

  score0El.textContent = currentScore;
  score1El.textContent = currentScore;
  currentScoreEl.textContent = currentScore;
  currentScore1El.textContent = currentScore;

  diceEl.classList.add('hidden');
  playerEl.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  playerEl.classList.remove('player--active');
  player1El.classList.remove('player--active');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
};

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerEl.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Roll functionality
btnRollEl.addEventListener('click', function () {
  if (playing) {
    // generateEl randon dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(`Roll dice: ${dice}`);
    // print dice
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');
    // check for rolled 1, if is true switch next 🤽‍♂️
    if (dice === 1) {
      switchPlayer();
    } else {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    }
  }
});

btnHoldEl.addEventListener('click', function () {
  if (playing) {
    // add current score active player's score
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    // check if player's score >= 100, then finish the 🕹
    if (score[activePlayer] >= 100) {
      diceEl.classList.add('hidden');
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
    } else {
      switchPlayer();
    }
  }
});

btnNewEl.addEventListener('click', freshGame);

// Play 🎮
freshGame();
