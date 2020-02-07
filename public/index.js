/*
 * Name: Jenny Rong
 * Date: Nov 13, 2019
 * Section: CSE 154 AC
 *
 * This is the client side JS(index.js) to implement the UI for index.html;
 * It contains all the functions to request the new API.
 */

"use strict";
(function() {

  window.addEventListener("load", init);

  /**
   * Setup event listeners for start button.
   * disable the submit button in the beginning.
   */
  function init() {
    id("start-btn").addEventListener("click", requestWelcome);
    id("submmit-btn").disable = true;
  }

  /**
   * Makes a request to /name/:name to get the welcome message,
   * enable the summit button and set up the EventListener.
   */
  function requestWelcome() {
    id("error").textContent = "";
    let name = id("name-in").value;

    fetch("/name/" + name)
      .then(checkStatus)
      .then(resp => resp.text())
      .then(resp => {
        id("welcome").textContent = resp;
      })
      .catch(handleError);

    id("submmit-btn").disable = false;
    id("submmit-btn").addEventListener("click", requestInfo);
  }

  /**
   * Makes a request to /info/name/message/email to get the information for each message card.
   */
  function requestInfo() {
    id("error").textContent = "";
    let name = id("name-in").value;
    let message = id("message-in").value;
    let email = id("email-in").value;

    fetch("/info/" + name + "/" + message + "/" + email)
      .then(checkStatus)
      .then(resp => resp.json())
      .then(getInfo)
      .catch(handleError);
  }

  /**
   * generate each message with all the information requested from the API.
   * @param {object} data - json response with the name, email, and message information;
   */
  function getInfo(data) {
    let card = gen("div");
    let name = gen("h3");
    name.textContent = "> " + data.name;
    card.appendChild(name);

    let email = gen("p");
    email.textContent = "> email: " + data.email;
    card.appendChild(email);

    let message = gen("p");
    message.textContent = data.message;
    card.appendChild(message);

    card.classList.add("card");
    id("message-list").appendChild(card);

    id("submmit-btn").disable = true;
    id("name-in").value = "";
    id("message-in").value = "";
    id("email-in").value = "";
    id("welcome").textContent = "";
  }

  /* ------------------------------ Helper Functions  ------------------------------ */
  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} response - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise rejected
   *                    Promise result
   */
  function checkStatus(response) {
    if (!response.ok) {
      throw Error("Error in request: " + response.statusText);
    }
    return response;
  }

  /**
   * Handle any errors caused in the fetch request/response process by displaying a helpful message
   * to the user on the page
   * @param {object} err -  errors caused in the fetch process.
   */
  function handleError(err) {
    let error = document.createElement("p");
    error.textContent = err;
    id("error").appendChild(error);
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID
   * @return {object} DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Returns an new element with the tag name.
   * @param {string} tagName - the string name of the element to create
   * @returns {object} - the DOM element created with the text
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }
})();
