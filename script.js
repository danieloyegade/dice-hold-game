'use strict';

// const { doc } = require('prettier');

// Selecting elements
const selectPlayer0El = document.querySelector('.player--0');
const selectPlayer1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions

let finalScoresArr, currentScoreVar, activePlayer, gameState;

gameState = true;
finalScoresArr = [0, 0];
currentScoreVar = 0;
activePlayer = 0;
score1El.textContent = 0;
score0El.textContent = 0;

const init = () => {
  hideDice();
  gameState = true;
  currentScoreVar = 0;
  setCurrentEl(currentScoreVar);
  setScore(0, 0);
  setScore(1, 0);
  finalScoresArr[0] = 0;
  finalScoresArr[1] = 0;

  document.getElementById(`name--${activePlayer}`).textContent =
    `PLAYER ${activePlayer}` === 'PLAYER 0' ? 'PLAYER 1' : 'PLAYER 2';

  selectPlayer0El.classList.remove('player--winner');
  selectPlayer1El.classList.remove('player--winner');
  selectPlayer0El.classList.add('player--active');
  selectPlayer1El.classList.remove('player--active');
};

// DRY functions

const setScore = (activePlayer, finalScore) => {
  if (activePlayer === 0) {
    score0El.textContent = finalScore;
  } else {
    score1El.textContent = finalScore;
  }
};

const hideDice = () => diceEl.classList.add('hidden');
hideDice();
const showDice = () => diceEl.classList.remove('hidden');

const setCurrentEl = num => {
  document.querySelector(`#current--${activePlayer}`).textContent = num;
  //   document.querySelector(`#current--1`).textContent = num;
};

const toggleActivePlayer = () => {
  currentScoreVar = 0;
  setCurrentEl(currentScoreVar);
  activePlayer = activePlayer === 0 ? 1 : 0;
  selectPlayer0El.classList.toggle('player--active');
  selectPlayer1El.classList.toggle('player--active');
};

//  Rolling dice functionality

btnRoll.addEventListener('click', () => {
  if (gameState) {
    //   Generate random number
    const diceRoll = Math.trunc(Math.random() * 6) + 1;
    // Display random dice number
    showDice();
    diceEl.src = `dice-${diceRoll}.png`;

    // Check if the roll was 1, if so: change player
    if (diceRoll !== 1) {
      //  add dice number to player's current score
      currentScoreVar += diceRoll;
      setCurrentEl(currentScoreVar);
    } else {
      toggleActivePlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (gameState) {
    // score is transferred to global score of active player
    finalScoresArr[activePlayer] += currentScoreVar;
    setScore(activePlayer, finalScoresArr[activePlayer]);
    //  check if score >= 100
    if (finalScoresArr[activePlayer] >= 10) {
      //   end game
      hideDice();
      gameState = false;
      document.getElementById(`name--${activePlayer}`).textContent = 'Winner!';
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`player--${activePlayer}`)
        .remove('player--active');
    } else {
      //   switch players
      toggleActivePlayer();
    }
  }
});

btnNew.addEventListener('click', init);
