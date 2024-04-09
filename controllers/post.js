const { response } = require("express");
const Post = require("../models/Post");
const { saveFile } = require("../helpers/saveFile");
const { deleteFile } = require("../helpers/deleteFile");

const index = async (req, res = response) => {
	try {
		let posts = await Post.find();
		return res.status(200).json({
			ok: true,
			posts,
		});
	} catch (error) {
		return res.status(500).json({
			ok: false,
			msg: `Server error: ${error.message}`,
		});
	}
};

const show = async (req, res = response) => {
	const postId = req.params.id;
	try {
		let post = await Post.findById(postId);
		if (!post) {
			return res.status(404).json({
				ok: false,
				msg: "Publicación no encontrada",
			});
		}
		return res.status(201).json({
			ok: true,
			post,
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: `Server error: ${error.message}`,
		});
	}
};

const create = async (req, res = response) => {
	try {
		const image = saveFile(req.files.image[0], "./uploads/post");
		const text = saveFile(req.files.text[0], "./uploads/post");

		const post = new Post({ ...req.body, image, text });
		await post.save();

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
	const postId = req.params.id;
	const uid = req.body.user;
	try {
		const post = await Post.findById(postId);
		if (!post) {
			return res.status(404).json({
				ok: false,
				msg: "Publicación no encontrada",
			});
		}
		if (post.user.toString() !== uid) {
			return res.status(401).json({
				ok: false,
				msg: "La publicación le pertenece a otro usuario",
			});
		}

		deleteFile(post.image);
		deleteFile(post.text);

		const image = saveFile(req.files.image[0], "./uploads/post");
		const text = saveFile(req.files.text[0], "./uploads/post");

		const updatedPost = await Post.findByIdAndUpdate(
			postId,
			{
				...req.body,
				image,
				text,
			},
			{ new: true }
		);

		return res.status(200).json({
			ok: true,
			msg: "Guardado correctamente",
			post: updatedPost,
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: `Server error: ${error.message}`,
		});
	}
};

const remove = async (req, res = response) => {
	const postId = req.params.id;
	try {
		const post = await Post.findById(postId);
		if (!post) {
			return res.status(404).json({
				ok: false,
				msg: "Temática no encontrada",
			});
		}

		deleteFile(post.image);
		deleteFile(post.text);

		await Post.findByIdAndDelete(postId);

		return res.status(200).json({
			ok: true,
			msg: "Eliminado correctamente",
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			ok: false,
			msg: `Server error: ${error.message}`,
		});
	}
};

module.exports = {
	index,
	show,
	create,
	update,
	remove,
};
