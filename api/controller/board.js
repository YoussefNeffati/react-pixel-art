const boardModel = require("../models/board");
const userModel = require("../models/user");
const pixelModel = require("../models/pixel");
const board = require("../models/board");

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

// search board by name like %name%
exports.searchboard = async (request, response) => {
	try {
		if (request.params.statut === "all") {
			const board = await boardModel.find({ title: { $regex: request.params.name, $options: "i" } });
			response.status(200).send(board);
		} else if (request.params.statut === "progress") {
			const board = await boardModel.find({ title: { $regex: request.params.name, $options: "i" }, statut: false });
			response.status(200).send(board);
		} else if (request.params.statut === "finished") {
			const board = await boardModel.find({ title: { $regex: request.params.name, $options: "i" }, statut: true });
			response.status(200).send(board);
		}
	} catch (error) {
		response.status(500).send(error);
	}
};

// get six last boards by status false
exports.getSixLastBoardsInProgress = async (request, response) => {
	try {
		const boards = await boardModel
			.find({ statut: false, finishedAt: { $gt: Date.now() } })
			.sort({ $natural: 1 })
			.limit(6)
			.populate("author");

		let boardsArray = [];
		for (let i = 0; i < boards.length; i++) {
			const board = boards[i];
			// get pixels by board
			const pixels = await pixelModel.find({ board: board.id });
			boardsArray.push({ board: board, pixels: pixels });
		}
		response.status(200).send(boardsArray);
	} catch (error) {
		response.status(500).send(error);
	}
};

exports.allBoardsAndPixels = async (request, response) => {
	try {
		const boards = await boardModel
			.find({ statut: false, finishedAt: { $gt: Date.now() } })
			.sort({ $natural: 1 })
			.populate("author");

		let ncols = 0;
		let nrows = 0;
		let gtRowfirst = boards[0].nLines;
		let gtRowlast = 0;
		let colToAdd = 0;
		let rowToAdd = 0;
		let allPixels = [];
		let rowfull = 0;
		let colsSB = 0;
		let rowsSB = 0;
		let gtRow = 0;
		let gtCol = 0;
		let nRowFull = 0;
		for (let i = 0; i < boards.length; i++) {
			const board = boards[i];
			// Number of columns of superboard
			if (rowfull < 3) {
				if (board.nLines > gtRow) gtRow = board.nLines;
				if (board.nColumns > gtCol) gtCol = board.nColumns;
			}
			// get pixels by board
			const pixels = await pixelModel.find({ board: board.id });
			for (let j = 0; j < pixels.length; j++) {
				const pixel = pixels[j];
				if (rowfull < 3) {
					pixel.y = pixel.y + colToAdd;
					colToAdd = colToAdd + board.nColumns;
				}
				if (nRowFull == 1) {
				}
				if (nRowFull > 0) {
					pixel.x = pixel.x + rowToAdd;
				}
				if (rowfull === 2) {
					colToAdd = 0;
				}
				allPixels.push(pixel);
			}
			if (rowfull === 2) {
				nRowFull++;
				rowfull = 0;
				rowsSB = rowsSB + gtRow;
				colsSB = colsSB + gtCol;
				rowToAdd = rowToAdd + gtRow;
				gtRow = 0;
				gtCol = 0;
			}
			rowfull++;
		}
		let boardAndPixels = {};
		boardAndPixels.ncols = colsSB;
		boardAndPixels.nrows = rowsSB;
		boardAndPixels.pixels = allPixels;
		response.status(200).send(boardAndPixels);
	} catch (error) {
		response.status(500).send(error);
		console.log("error", error);
	}
};

// get six last boards by status true
exports.getSixLastBoardsFinished = async (request, response) => {
	try {
		const boards = await boardModel.find({ statut: true }).sort({ $natural: 1 }).limit(6).populate("author");

		let boardsArray = [];
		for (let i = 0; i < boards.length; i++) {
			const board = boards[i];
			// get pixels by board
			const pixels = await pixelModel.find({ board: board.id });
			boardsArray.push({ board: board, pixels: pixels });
		}
		response.status(200).send(boardsArray);
	} catch (error) {
		response.status(500).send(error);
	}
};

// get all boards by status
exports.getAllBoardsByStatut = async (request, response) => {
	try {
		if (request.params.statut === "all") {
			const boards = await boardModel.find().populate("author");
			response.status(200).send(boards);
		} else if (request.params.statut === "progress") {
			const boards = await boardModel.find({ statut: false }).populate("author");
			response.status(200).send(boards);
		} else if (request.params.statut === "finished") {
			const boards = await boardModel.find({ statut: true }).populate("author");
			response.status(200).send(boards);
		}
	} catch (error) {
		response.status(500).send(error);
	}
};
