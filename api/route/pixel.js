const pixelController = require("../controller/pixel");
const express = require("express");
const app = express();

// get pixel by board id
app.get("/boardAndPixels/:idboard", pixelController.getpixel);

// post pixel
app.post("/savepixel", pixelController.savepixel);

// get one pixel by x, y and board id
app.post("/getpixel", pixelController.getonepixel);

// number of pixels by user id
app.get("/pixelsuser/:iduser", pixelController.getnumberofpixelsUser);

// count number of times that x and y are used
app.get("/getnumbersoftimes", pixelController.getnumbersoftimes);

module.exports = app;
