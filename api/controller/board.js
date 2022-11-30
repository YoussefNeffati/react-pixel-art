const boardModel = require("../models/board");
const userModel = require("../models/user");

// get board by id
exports.getboard = async (request, response) => {
	try {
		const board = await boardModel.findById(request.params.id);
		if (!board) response.status(404).send("No item found");
		response.status(200).send(board);
	} catch (error) {
		response.status(500).send(error);
	}
};

// get current borad by status false and finishedAt > now
exports.getcurrentboad = async (request, response) => {
	try {
		const board = await boardModel.find({ statuts: false, finishedAt: { $gt: Date.now() } });
		if (!board) {
			response.status(404).send("No item found");
			// create board if not exist
			const board = new boardModel(request.body);
			await board.save();
		}
		response.status(200).send(board);
	} catch (error) {
		response.status(500).send(error);
	}
};

// post board if not exist status true and return board
exports.saveboard = async (request, response) => {
	try {
		// search user by username
		const user = await userModel.findOne({ username: request.body.username });
		request.body.author = user._id;
		request.body.delai = request.body.delaimin * 60 + request.body.delaisec;
		const board = new boardModel(request.body);
		await board.save();
		response.status(201).send(board);
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
