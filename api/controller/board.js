const boardModel = require("../models/board");
const userModel = require("../models/user");

// get board by id
exports.getboard = async (request, response) => {
	try {
		const board = await boardModel.findById(request.params.id).populate("author");
		if (!board) response.status(404).send("No item found");
		response.status(200).send(board);
	} catch (error) {
		response.status(500).send(error);
	}
};

// get current borad by status false and finishedAt > now
exports.getcurrentboad = async (request, response) => {
	try {
		var board = await boardModel.findOne({ statut: false, finishedAt: { $gt: Date.now() } }).populate("author");
		if (!board) {
			board = [];
		}
		response.status(200).send(board);
	} catch (error) {}
};

// post board if not exist status true and return board
exports.saveboard = async (request, response) => {
	try {
		// search user by username
		const user = await userModel.findOne({ name: request.body.author });
		request.body.author = user._id;
		request.body.delai = request.body.delaimin * 60 + request.body.delaisec;
		request.body.finishedAt = Date.parse(request.body.finishedAt);
		const board = new boardModel(request.body);
		await board.save();
		response.status(201).send(board);
		// update all board if finishedAt < now
		await boardModel.updateMany({ statut: false, finishedAt: { $lt: Date.now() } }, { statut: true });
	} catch (error) {
		response.status(500).send(error);
	}
};

// get all boards
exports.getboards = async (request, response) => {
	try {
		const boards = await boardModel.find({});
		response.status(200).send(boards);
	} catch (error) {
		response.status(500).send(error);
	}
};

// update statut board by id
exports.updateboard = async (request, response) => {
	try {
		const board = await boardModel.updateOne({ _id: request.params.id }, { statut: true });
		console.log("board", board);
		response.status(200).send(board);
	} catch (error) {
		response.status(500).send(error);
	}
};

// delete board by id and pixels
exports.deleteboard = async (request, response) => {
	try {
		const board = await boardModel.findByIdAndDelete(request.params.id);
		if (!board) response.status(404).send("No item found");
		const pixels = await pixelModel.deleteMany({ board: board._id });
		console.log("pixels", pixels);
		response.status(200).send();
	} catch (error) {
		response.status(500).send(error);
	}
};

// update informations board by id
exports.updateboardinfo = async (request, response) => {
	try {
		const board = await boardModel.updateOne({ _id: request.params.id }, request.body);
		response.status(200).send(board);
	} catch (error) {
		response.status(500).send(error);
	}
};
