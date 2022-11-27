const express = require("express");
const userController = require("../controller/user");

const app = express();

// add user
app.post("/adduser", userController.adduser);

// get all users
app.get("/users", userController.getusers);

// get user by id
app.get("/users/:id", userController.getuser);

module.exports = app;
