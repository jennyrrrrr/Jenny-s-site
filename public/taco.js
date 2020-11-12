/*
 * Name: Jenny Rong
 * Date: Oct 30, 2019
 * Section: CSE 154 AC
 *
 * This is the JS(index.js) to implement the UI for index.html;
 * It contains all the functions to generate the all the contributions in taco recipe;
 * Users can interact and get the taco contributions from Tacos API;
 */
"use strict";
(function() {
  // base url for all the contributions in tacos API;
  const URL_BASE = "https://taco-randomizer.herokuapp.com/contributions/";

  window.addEventListener("load", init);

  /**
   * Initializes the page so the find and back button can be clicked.
   * fetch all the contributor's name from Tacos API;
   */
  function init() {
    id("find-btn").addEventListener("click", getData);
    id("back-btn").addEventListener("click", goBack);
    fetch(URL_BASE)
      .then(checkStatus)
      .then(response => response.json())
      .then(addSelection)
      .catch(handleError);
  }

  /**
   * fetch all the contributor's name from Tacos API and the users can click to choose;
   * @param {object} response - json response with all the contributors;
   */
  function addSelection(response) {
    for (let i = 0; i < response.length; i++) {
      let element = response[i];
      let option = document.createElement("option");
      option.value = element.username;
      option.textContent = element.full_name;
      id("select-contributor").appendChild(option);
    }
  }

  /**
   * Fetch the data for all contributors after the find button is clicked;
   */
  function getData() {
    let name = qs("select").value;
    let url = URL_BASE + name + "/";
    fetch(url)
      .then(checkStatus)
      .then(response => response.json())
      .then(genData)
      .catch(handleError);
  }

  /**
   * Generates all the contributions the contributors have made;
   * @param {object} response - json response with all the contributions;
   */
  function genData(response) {
    const CONTRIB = [response.condiments, response.seasonings, response.mixins,
      response.shells, response.base_layers];
    const NAME = ["Condiments", "Seasonings", "Mixins", "Shells", "Base Layers"];
    for (let i = 0; i < NAME.length; i++) {
      let result = document.createElement("li");
      let text = "";
      if (CONTRIB[i].length === 0) {
        text = "NONE";
      } else {
        text = CONTRIB[i].toString();
      }
      result.textContent = NAME[i] + ": " + text;
      id("data").appendChild(result);
    }
    id("find-btn").disabled = true;
  }

  /**
   * Resets the contents and reenable the find buttons;
   */
  function goBack() {
    id('data').innerHTML = "";
    id("find-btn").disabled = false;
  }

  /**
   * Returns the response's result text if successful. If not successful, returns the response.
   * @param {object} response -  response to check for success/error.
   * @return {object} - valid response if successful, otherwise rejected Promise result
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
    qs("#error").appendChild(error);
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} query - CSS query selector.
   * @returns {object} - The first DOM object matching the query.
   */
  function qs(query) {
    return document.querySelector(query);
  }
})();