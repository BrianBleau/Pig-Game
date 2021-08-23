"use strict";

const diceEl = document.querySelector(".dice");
const P1ScoreEl = document.getElementById("score--0");
const P2ScoreEl = document.getElementById("score--1");
const current1 = document.getElementById("current--0");
const current2 = document.getElementById("current--1");
const holdEl = document.querySelector(".btn--hold");
const P1El = document.querySelector(".player--0");
const P2El = document.querySelector(".player--1");

let activePlayer = 0;
let scores = [0, 0];
let current = 0;
let score1 = 0;
let score2 = 0;
let playing = true;

const init = function () {
  scores = [0, 0];
  current = 0;
  activePlayer = 0;
  playing = true;

  P1ScoreEl.textContent = 0;
  P2ScoreEl.textContent = 0;
  current1.textContent = 0;
  current2.textContent = 0;

  diceEl.classList.add("hidden");
  P1El.classList.remove("player--winner");
  P2El.classList.remove("player--winner");
  P1El.classList.add("player--active");
  P2El.classList.remove("player--active");
};

init();

const swap = () => {
  if (P1El.classList.contains("player--active")) {
    P1El.classList.remove("player--active");
    P2El.classList.add("player--active");
  } else {
    P1El.classList.add("player--active");
    P2El.classList.remove("player--active");
  }
};

const roll = () => {
  if ((playing = true)) {
    let value = Math.trunc(Math.random() * 6 + 1);

    if (value > 1) {
      diceEl.src = `dice-${value}.png`;
      current += value;
      document.getElementById(`current--${activePlayer}`).textContent = current;
    } else if (value === 1) {
      //next player turn
      swap();
      diceEl.src = `dice-1.png`;
      current = 0;
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      if (activePlayer === 0) {
        activePlayer = 1;
      } else activePlayer = 0;
    }
  }
};

document.querySelector(".btn--roll").addEventListener("click", roll);

holdEl.addEventListener("click", function () {
  scores[activePlayer] += current;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  current1.textContent = 0;
  current2.textContent = 0;
  current = 0;
  if (scores[activePlayer] >= 100) {
    // Finish the game
    playing = false;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--active");
  } else {
    swap();
    if (activePlayer === 0) {
      activePlayer = 1;
    } else activePlayer = 0;
  }
});

document.querySelector(".btn--new").addEventListener("click", init);
