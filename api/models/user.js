const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		default: "Anonymous"
	},
	password: {
		type: String,
		default: ""
	}
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
