const express = require("express");
const boardController = require("../controller/board");
const app = express();

// get board by id
app.get("/board/:id", boardController.getboard);

// get one borad by status false
app.get("/currentboad", boardController.getcurrentboad);

// post board
app.post("/saveboard", boardController.saveboard);

// get all boards
app.get("/boards", boardController.getboards);

// update statut board by id
app.put("/updateboard/:id", boardController.updateboard);

module.exports = app;
