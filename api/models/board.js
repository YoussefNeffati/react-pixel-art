const mongoose = require("mongoose");
const { Schema } = mongoose;
const Board = new Schema({
	title: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	finishedAt: { type: Date, default: Date.now },
	statuts: { type: Boolean, default: false },
	nLines: { type: Number, default: 0 },
	nColumns: { type: Number, default: 0 },
	mode: { type: Boolean, default: false },
	author: { type: Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Board", Board);
