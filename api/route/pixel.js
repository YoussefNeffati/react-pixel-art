const pixelController = require("../controller/pixel");
const express = require("express");
const app = express();

// get pixel by board id
app.get("/pixels/:idboard", pixelController.getpixel);

// post pixel
app.post("/savepixel", pixelController.savepixel);

module.exports = app;
