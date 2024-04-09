const { Schema, model } = require("mongoose");

const PostSchema = Schema({
	title: {
		type: String,
		require: true,
		trim: true,
	},
	description: {
		type: String,
		require: true,
	},
	image: {
		type: String,
		require: false,
	},
	text: {
		type: String,
		require: false,
	},
	video: {
		type: String,
		require: false,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	topic: {
		type: Schema.Types.ObjectId,
		ref: "Topic",
		required: true,
	},
});

module.exports = model("Post", PostSchema);
