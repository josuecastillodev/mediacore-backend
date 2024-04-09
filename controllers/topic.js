const { response } = require("express");
const Topic = require("../models/Topic");
const { saveFile } = require("../helpers/saveFile");
const { deleteFile } = require("../helpers/deleteFile");

const index = async (req, res = response) => {
	try {
		let topics = await Topic.find();
		return res.status(200).json({
			ok: true,
			topics,
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: `Server error: ${error.message}`,
		});
	}
};

const show = async (req, res = response) => {
	const topicId = req.params.id;
	try {
		let topic = await Topic.findById(topicId);
		if (!topic) {
			return res.status(404).json({
				ok: false,
				msg: "Temática no encontrada",
			});
		}
		return res.status(201).json({
			ok: true,
			topic,
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: `Server error: ${error.message}`,
		});
	}
};

const create = async (req, res = response) => {
	const { name } = req.body;

	try {
		let topic = await Topic.findOne({ name });
		if (topic) {
			return res.status(400).json({
				ok: false,
				msg: "Ya existe una temática con este nombre",
			});
		}

		const banner = saveFile(req.file, "./uploads/topic");
		const types = [
			req.body.image == 1,
			req.body.video == 1,
			req.body.text == 1,
		];

		topic = new Topic({ name, types, banner });
		await topic.save();

		return res.status(200).json({
			ok: true,
			msg: "Guardado correctamente",
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: `Server error: ${error.message}`,
		});
	}
};

const update = async (req, res = response) => {
	const topicId = req.params.id;
	try {
		const topic = await Topic.findById(topicId);
		if (!topic) {
			return res.status(404).json({
				ok: false,
				msg: "Temática no encontrada",
			});
		}

		deleteFile(topic.banner);

		const banner = saveFile(req.file, "./uploads/topic");
		const types = [
			req.body.image == 1,
			req.body.video == 1,
			req.body.text == 1,
		];
		const { name } = req.body;

		const updatedTopic = await Topic.findByIdAndUpdate(
			topicId,
			{
				name,
				banner,
				types,
			},
			{ new: true }
		);

		return res.status(200).json({
			ok: true,
			msg: "Guardado correctamente",
			topic: updatedTopic,
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			ok: false,
			msg: `Server error: ${error.message}`,
		});
	}
};

const remove = async (req, res = response) => {
	const topicId = req.params.id;
	try {
		const topic = await Topic.findById(topicId);
		if (!topic) {
			return res.status(404).json({
				ok: false,
				msg: "Temática no encontrada",
			});
		}

		deleteFile(topic.banner);

		await Topic.findByIdAndDelete(topicId);

		return res.status(200).json({
			ok: true,
			msg: "Eliminado correctamente",
		});
	} catch (error) {}
};

module.exports = {
	index,
	show,
	create,
	update,
	remove,
};
