const pixelModel = require("../models/pixel");

// get pixel by board id
exports.getpixel = async (request, response) => {
	try {
		const pixels = await pixelModel.find({ board: request.params.idboard });
		if (!pixels) response.status(404).send("No item found");
		response.status(200).send(pixels);
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
		const pixel = await pixelModel
			.findOne({
				x: request.body.x,
				y: request.body.y,
				board: request.body.board
			})
			.populate("user");
		if (!pixel) response.status(404).send("No item found");
		response.status(200).send(pixel);
	} catch (error) {
		response.status(500).send(error);
	}
};
