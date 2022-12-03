const cors = require("cors");
const express = require("express");
const db = require("./config/db");
const userRouter = require("./route/user");
const boardRouter = require("./route/board");
const pixelRouter = require("./route/pixel");
const userModel = require("./models/user");

const app = express();

app.use(express.json());

app.use(cors());

// for routers
app.use(userRouter);
app.use(boardRouter);
app.use(pixelRouter);

// create user admin if not exist
userModel.findOne({ role: "admin" }, (error, user) => {
	if (error) {
		console.log(error);
	} else if (!user) {
		const admin = new userModel({
			name: "admin",
			password: "admin",
			role: "admin"
		});
		admin.save();
		console.log("admin created");
	}
});

app.listen(8000, () => {
	console.log(`App server now listening on port ${8000}`);
});
