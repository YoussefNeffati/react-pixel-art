const express = require("express");
const boardController = require("../controller/board");
const app = express();

// get board by id
app.get("/boards/:id", boardController.getboard);

module.exports = app;
