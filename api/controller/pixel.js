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
		const pixel = new pixelModel(request.body);
		await pixel.save();
		response.status(201).send(pixel);
	} catch (error) {
		response.status(500).send(error);
	}
};
