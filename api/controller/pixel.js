const pixelModel = require("../models/pixel");
const userModel = require("../models/user");
const boardModel = require("../models/board");

// get pixel by board id
exports.getpixel = async (request, response) => {
	try {
		const boardAndPixels = await pixelModel.find({ board: request.params.idboard }).populate("board");
		if (!boardAndPixels) response.status(404).send("No item found");
		let boardAndPixelsDetails = {};
		boardAndPixelsDetails.pixels = boardAndPixels;
		boardAndPixelsDetails.board = await boardModel.findById(request.params.idboard);
		boardAndPixelsDetails.author = await userModel.findById(boardAndPixelsDetails.board.author);
		response.status(200).send(boardAndPixelsDetails);
	} catch (error) {
		response.status(500).send(error);
	}
};

// post pixel
exports.savepixel = async (request, response) => {
	try {
		// verify if pixel exist
		const pixel = await pixelModel.findOne({
			x: request.body.x,
			y: request.body.y,
			board: request.body.board
		});
		if (pixel) {
			// update pixel
			pixel.color = request.body.color;
			pixel.user = request.body.user;
			pixel.createdAt = Date.now();
			await pixel.save();
			response.status(200).send(pixel);
		} else {
			// create pixel
			const pixel = new pixelModel(request.body);
			await pixel.save();
			response.status(201).send(pixel);
		}
	} catch (error) {
		response.status(500).send(error);
	}
};

// get one pixel by x, y and board id
exports.getonepixel = async (request, response) => {
	try {
		var pixel = await pixelModel
			.findOne({
				x: request.body.x,
				y: request.body.y,
				board: request.body.board
			})
			.populate("user");
		if (!pixel) {
			pixel = {};
		}
		response.status(200).send(pixel);
	} catch (error) {
		response.status(500).send(error);
		console.log("error", error);
	}
};

// number of pixels by user id

exports.getnumberofpixelsUser = async (request, response) => {
	try {
		const pixels = await pixelModel.find({ user: request.params.iduser }).populate("board");
		response.status(200).send(pixels);
	} catch (error) {
		response.status(500).send(error);
	}
};
