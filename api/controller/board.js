const boardModel = require("../models/board");

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
