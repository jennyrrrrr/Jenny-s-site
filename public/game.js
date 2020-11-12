/*
 * Name: Jenny Rong
 * Date: Oct 14, 2019
 * Section: CSE 154 AC
 *
 * This is the JS(index.js) to implement the UI for index.html;
 * It contains all the functions to generate the guessing game;
 * Users can interact with the game and guess the sum of the dice;
 */
"use strict";
(function() {
  const DICE_NUM = 10; // constant number used to generate random number from 2 to 12;
  let chanceLeft = 0; // number of chance to guess
  let actualDiceValue = 0; // the value that user gussesed

  window.addEventListener("load", init);

  /**
   * Initializes the page so the start, stop, submit, and new-game button can be clicked.
   */
  function init() {
    id("new-game").addEventListener("click", newGame);
    id("throw-btn").addEventListener("click", changeImg);
    id("stop-btn").addEventListener("click", startGame);
    id("submit").addEventListener("click", checkGuess);
  }

  /**
   * Reload the page to start a new game;
   */
  function newGame() {
    window.location.reload();
  }

  /**
   * Change the image when clicking the throw button;
   */
  function changeImg() {
    id("dice").src = "img/dice-roll.gif";
  }

  /**
   * Change the image,
   * Generate a random number,
   * Set the chance to guess to 2 when click the stop button.
   */
  function startGame() {
    id("dice").src = "img/stop-rolling.jpg";
    actualDiceValue = Math.floor((Math.random() * DICE_NUM) + 2);
    chanceLeft = 2;
  }

  /**
   * Check the guess the user entered and gives feedback on how close the guess was,
   * If the chance lefted is 0, the game will end.
   * If the guess is wrong, a part of the style will change
   * and the number of hearts will decrease.
   */
  function checkGuess() {
    let userGuessValue = parseInt(id("guess").value);
    let resultText = "";

    if (chanceLeft === 0 && userGuessValue !== actualDiceValue) {
      resultText = "YOU LOSE!";
    } else if (userGuessValue === actualDiceValue) {
      resultText = "YOU WIN!";
      wrongAnswerHelper();
    } else if (userGuessValue > actualDiceValue) {
      resultText = "The number is too large, try enter a different number!";
      wrongAnswerHelper();
    } else {
      resultText = "The number is too small, try enter a different number!";
      wrongAnswerHelper();
    }
    removeHeart();
    id("results").textContent = resultText;
  }

  /**
   * Helper function which will be used when the guess of the number is wrong,
   * Change the style and minus the chance lefted by 1;
   */
  function wrongAnswerHelper() {
    changeStyle();
    chanceLeft--;
  }

  /**
   * Change the style of the text when the guess of the number is wrong;
   */
  function changeStyle() {
    id("chance").classList.add("chance-style");
  }

  /**
   * Remove the heart when the guess of the number is wrong;
   */
  function removeHeart() {
    let elements = document.getElementsByClassName("heart-pic");
    elements[0].parentNode.removeChild(elements[0]);
  }

  /**
   * @param {string} name - element ID.
   * @returns {object} - DOM object associated with id.
   */
  function id(name) {
    return document.getElementById(name);
  }
})();