const { Schema, model } = require("mongoose");

const TopicSchema = Schema({
	name: {
		type: String,
		require: true,
		unique: true,
		trim: true,
	},
	banner: {
		type: String,
		require: true,
	},
	types: {
		type: Array,
		require: true,
	},
});

module.exports = model("Topic", TopicSchema);
