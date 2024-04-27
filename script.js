'use strict';

//    Selecting Element
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
// the selector for  an "id" is "#", the selector for a "class" is "."
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// const scores = [0, 0]; //we store the playeres in an ARRAY //
// let currentScore = 0;
// let activePlayer = 0; //.. player  1 is 'active player' 0//
// let playing = true;

// //   Starting Condition
// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEl.classList.add('hidden');

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; // if the activePlayer is '0', then we want the new active player to be '1' and 'else' it should be '0'
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// The Rolling Dice Functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // Add dice to current score
      currentScore = currentScore + dice; // o igual a 👉 currentScore += dice;//

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //  1. Add current score to active player's score
    scores[activePlayer] += currentScore; // o igual a 👉 scores[activePlayer] = scores[activePlayer] + currentScore o igual a 👉
    //scors[1] = score[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    // Finish to the next player
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener(
  'click',
  init
  // playing === true;
  // diceEl.classList.remove('hidden');
  // document.getElementById(`score--${activePlayer}`).textContent = 0;
  // document.getElementById(`current--${activePlayer}`).textContent = 0;
  // //
  // document.querySelector('.player--0').classList.add('player--active');
  // //
  // document
  //   .querySelector(`.player--${activePlayer}`)
  //   .classList.remove('player--winner');
  // document
  //   .querySelector(`.player--${activePlayer}`)
  //   .classList.add('player--active');
);
