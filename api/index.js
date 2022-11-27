const cors = require("cors");
const express = require("express");
const db = require("./config/db");
const userRouter = require("./route/user");
const boardRouter = require("./route/board");
const pixelRouter = require("./route/pixel");

const app = express();

app.use(express.json());

app.use(cors());

// for routers
app.use(userRouter);
app.use(boardRouter);
app.use(pixelRouter);

app.listen(8000, () => {
	console.log(`App server now listening on port ${8000}`);
});
