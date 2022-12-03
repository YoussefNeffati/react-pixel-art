const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		default: "Anonymous"
	},
	password: {
		type: String,
		default: ""
	},
	role: {
		type: String,
		default: "user"
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
