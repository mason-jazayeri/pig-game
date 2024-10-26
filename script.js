'use strict';

const player1SectionEl = document.querySelector('.player-section.player1');
const player2SectionEl = document.querySelector('.player-section.player2');

const cumulativeScorePlayer1El = document.querySelector(
  '.cumulative-score.player1'
);
const cumulativeScorePlayer2El = document.querySelector(
  '.cumulative-score.player2'
);
const currentScorePlayer1El = document.querySelector('.current-score.player1');
const currentScorePlayer2El = document.querySelector('.current-score.player2');

const diceContainerEl = document.querySelector('.dice');
const diceImgEl = document.querySelector('.dice img');

const newGameBtn = document.querySelector('.btn.new-game');
const rollDiceBtn = document.querySelector('.btn.roll-dice');
const holdBtn = document.querySelector('.btn.hold');

let cumulativeScorePlayer1 = 0;
let cumulativeScorePlayer2 = 0;
let currentScorePlayer1 = 0;
let currentScorePlayer2 = 0;
let activePlayer = 1;
let diceNumber;
console.log(diceNumber);

const startNewGame = () => {
  cumulativeScorePlayer1 = 0;
  cumulativeScorePlayer2 = 0;
  currentScorePlayer1 = 0;
  currentScorePlayer2 = 0;

  currentScorePlayer1El.textContent = 0;
  currentScorePlayer2El.textContent = 0;
  cumulativeScorePlayer1El.textContent = 0;
  cumulativeScorePlayer2El.textContent = 0;

  activePlayer = 1;
  player1SectionEl.classList.add('player-active');
  player2SectionEl.classList.remove('player-active');
  player1SectionEl.classList.remove('player-winner');
  player2SectionEl.classList.remove('player-winner');

  diceContainerEl.classList.add('hidden');
};

startNewGame();

newGameBtn.addEventListener('click', startNewGame);

const generateRandomNumber = (min, max) => {
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
};

const rollDice = () => {
  if (cumulativeScorePlayer1 >= 100 || cumulativeScorePlayer2 >= 100) {
    return;
  } else {
    diceNumber = generateRandomNumber(1, 6);

    diceContainerEl.classList.remove('hidden');

    switch (diceNumber) {
      case 1:
        diceImgEl.src = 'resources/images/dice-numbers/dice-1.png';
        break;
      case 2:
        diceImgEl.src = 'resources/images/dice-numbers/dice-2.png';
        break;
      case 3:
        diceImgEl.src = 'resources/images/dice-numbers/dice-3.png';
        break;
      case 4:
        diceImgEl.src = 'resources/images/dice-numbers/dice-4.png';
        break;
      case 5:
        diceImgEl.src = 'resources/images/dice-numbers/dice-5.png';
        break;
      case 6:
        diceImgEl.src = 'resources/images/dice-numbers/dice-6.png';
        break;
    }

    if (diceNumber > 1 && activePlayer === 1) {
      currentScorePlayer1 += diceNumber;
      currentScorePlayer1El.textContent = currentScorePlayer1;
    } else if (diceNumber === 1 && activePlayer === 1) {
      currentScorePlayer1 = 0;
      currentScorePlayer1El.textContent = currentScorePlayer1;
      activePlayer = 2;
      player1SectionEl.classList.toggle('player-active');
      player2SectionEl.classList.toggle('player-active');
    } else if (diceNumber > 1 && activePlayer === 2) {
      currentScorePlayer2 += diceNumber;
      currentScorePlayer2El.textContent = currentScorePlayer2;
    } else if (diceNumber === 1 && activePlayer === 2) {
      currentScorePlayer2 = 0;
      currentScorePlayer2El.textContent = currentScorePlayer2;
      activePlayer = 1;
      player1SectionEl.classList.toggle('player-active');
      player2SectionEl.classList.toggle('player-active');
    }
    console.log(
      `activePlayer = ${activePlayer}, diceNumber = ${diceNumber}, currentScorePlayer1 = ${currentScorePlayer1}, currentScorePlayer2 = ${currentScorePlayer2}`
    );
  }
};

rollDiceBtn.addEventListener('click', rollDice);

const holdScore = () => {
  if (cumulativeScorePlayer1 >= 100 || cumulativeScorePlayer2 >= 100) {
    return;
  } else {
    if (activePlayer === 1) {
      cumulativeScorePlayer1 += currentScorePlayer1;
      cumulativeScorePlayer1El.textContent = cumulativeScorePlayer1;
      currentScorePlayer1 = 0;
      currentScorePlayer1El.textContent = currentScorePlayer1;
      if (cumulativeScorePlayer1 >= 100) {
        console.log('Player 1 is the winner.');
        player1SectionEl.classList.add('player-winner');
        diceContainerEl.classList.add('hidden');
        return;
      }
      activePlayer = 2;
      player1SectionEl.classList.toggle('player-active');
      player2SectionEl.classList.toggle('player-active');
    } else {
      cumulativeScorePlayer2 += currentScorePlayer2;
      cumulativeScorePlayer2El.textContent = cumulativeScorePlayer2;
      currentScorePlayer2 = 0;
      currentScorePlayer2El.textContent = currentScorePlayer2;
      if (cumulativeScorePlayer2 >= 100) {
        console.log('Player 2 is the winner.');
        player2SectionEl.classList.add('player-winner');
        diceContainerEl.classList.add('hidden');
        return;
      }
      activePlayer = 1;
      player1SectionEl.classList.toggle('player-active');
      player2SectionEl.classList.toggle('player-active');
    }
    console.log(
      `activePlayer = ${activePlayer}, cumulativeScorePlayer1 = ${cumulativeScorePlayer1}, cumulativeScorePlayer2 = ${cumulativeScorePlayer2}`
    );
  }
};

holdBtn.addEventListener('click', holdScore);
