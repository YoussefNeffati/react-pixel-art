const express = require("express");
const boardController = require("../controller/board");
const pixel = require("../models/pixel");
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

// delete board by id
app.delete("/deleteboard/:id", boardController.deleteboard);

// update infos board by id
app.put("/updateinfosboard/:id", boardController.updateboardinfo);

// search board by name
app.get("/searchboard/:name/:statut", boardController.searchboard);

// get six last boards by status false
app.get("/sixLastBoardsInProgress", boardController.getSixLastBoardsInProgress);

// get six last boards by status true
app.get("/sixLastBoardsFinished", boardController.getSixLastBoardsFinished);

// get all boards by status
app.get("/allBoardsByStatus/:statut", boardController.getAllBoardsByStatut);

// get all boards ans pixels
app.get("/allBoardsAndPixels", boardController.allBoardsAndPixels);

module.exports = app;
