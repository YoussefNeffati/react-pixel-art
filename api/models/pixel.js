const mongoose = require("mongoose");
const { Schema } = mongoose;
const Pixel = new Schema({
	x: { type: Number, required: true },
	y: { type: Number, required: true },
	color: { type: String, required: true },
	board: { type: Schema.Types.ObjectId, ref: "Board" },
	user: { type: Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Pixel", Pixel);
