/*
 * Name: Jenny Rong
 * Date: Nov 7, 2019
 * Section: CSE 154 AC
 *
 * This is the server side JS(app.js) to implement the UI for index.html;
 */

"use strict";

const express = require("express");
const app = express();

const ERROR_NUM = 400;
const PORT_NUM = 8080;

/**
 * Get the name of the user and welcome the user
 * Request Format:/name/:name,
 * Pass the name as a param and request for a welcome message and return plain text.
 */
app.get("/name/:name", function(req, res) {
  res.type("text");
  if (req.params["name"]) {
    res.send("Welcome, " + req.params["name"] +
    "! Please leave your message below and we'll get back to you ASAP!");
  } else {
    res.status(ERROR_NUM).send("Error: name can't be empty!");
  }
});

/**
 * Get information for the message cards
 * Request Format:/info/:name/:message/:email
 * Pass the name, message, and email as params to request a message card to show on the website.
 * return a JSON format of all the information.
 */
app.get("/info/:name/:message/:email", function(req, res) {
  if (req.params["name"] && req.params["message"] && req.params["email"]) {
    let name = req.params["name"];
    let message = req.params["message"];
    let email = req.params["email"];

    res.type("json");
    res.json({"name": name, "message": message, "email": email});
  } else {
    res.status(ERROR_NUM).send("Error: missing name, email or message.");
  }
});

app.use(express.static("public"));
app.listen(PORT_NUM);
