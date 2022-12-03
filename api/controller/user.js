const userModel = require("../models/user");

// add user
exports.adduser = async (request, response) => {
	const user = new userModel(request.body);

	try {
		await user.save();
		response.send(user);
	} catch (error) {
		response.status(500).send(error);
	}
};

// get all users
exports.getusers = async (request, response) => {
	const users = await userModel.find({});

	try {
		response.send(users);
	} catch (error) {
		response.status(500).send(error);
	}
};

// get user by id
exports.getuser = async (request, response) => {
	try {
		const user = await userModel.findById(request.params.id);
		if (!user) response.status(404).send("No item found");
		response.status(200).send(user);
	} catch (error) {
		response.status(500).send(error);
	}
};

// delete user
exports.deleteuser = async (request, response) => {
	try {
		const user = await userModel.findByIdAndDelete(request.params.id);
		if (!user) response.status(404).send("No item found");
		response.status(200).send();
	} catch (error) {
		response.status(500).send(error);
	}
};

// update user
exports.updateuser = async (request, response) => {
	try {
		const user = await userModel.findByIdAndUpdate(request.params.id, request.body);
		await user.save();
		response.status(200).send(user);
	} catch (error) {
		response.status(500).send(error);
	}
};
