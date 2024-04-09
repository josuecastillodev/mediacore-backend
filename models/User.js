const { Schema, model } = require("mongoose");

const UserSchema = Schema({
	email: {
		type: String,
		require: true,
		unique: true,
	},
	username: {
		type: String,
		require: true,
		unique: true,
	},
});

module.exports = model("User", UserSchema);
