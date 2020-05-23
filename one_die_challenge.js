/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gamePlaying;

let prevDice;

init();


//when the ROLL_DICE button is clicked
document.querySelector('.btn-roll').addEventListener('click', function() {
  if(gamePlaying){
    // Random number
    let dice = Math.floor(Math.random() * 6 + 1);

    // Display the result
    let diceDOM = document.querySelector('.dice')
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png'; // getting dice images saved in the image source

      if(dice === 6 && prevDice === 6) {
        //Player losses score
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent =scores[activePlayer];
        nextPlayer();
      }else if(dice !== 1) {
        //Increase the score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
      }else {
        //next player
        nextPlayer();
      }
      prevDice = dice;
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if(gamePlaying) {
    //Add current score to GLOBALscore
    scores[activePlayer] += roundScore;

    //Update the UI
    document.querySelector('#score-' + activePlayer).textContent =scores[activePlayer];

    let input = document.querySelector('.game-score').value;
    let winningScore;

    if(input){
      winningScore = input;
    }else{
      winningScore = 100;
    }

    //Check if player won the game
    if(scores[activePlayer] >= winningScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'You\'ve Won!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    }else{
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  //setting player scores back to zero
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent ='0';

  //changing active player
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  //making the die disapper when a 1 thrown before the next turn
  document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector('.dice').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1'
  document.getElementById('name-1').textContent = 'Player 2'
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');

}
