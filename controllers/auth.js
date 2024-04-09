const { response } = require("express");
const User = require("../models/User");

const createUser = async (req, res = response) => {
	const { email, username } = req.body;

	try {
		let user = await User.find({ $or: [{ email }, { username }] });
		if (user.length > 0) {
			console.log(user);
			if (user.length > 1 || user[0].email == email) {
				return res.status(400).json({
					ok: false,
					msg: "El correo se encuentra en uso",
				});
			} else {
				return res.status(400).json({
					ok: false,
					msg: "El username se encuentra en uso",
				});
			}
		}

		user = new User(req.body);

		await user.save();

		return res.status(201).json({
			ok: true,
			uid: user.id,
			username: user.username,
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: "Server error",
		});
	}
};

const loginUser = async (req, res = response) => {
	const { email } = req.body;
	try {
		let user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({
				ok: false,
				msg: "No se encontró ningún usuario con ese correo",
			});
		}
		return res.status(200).json({
			ok: true,
			uid: user.id,
			username: user.username,
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: "Server error",
		});
	}
};

module.exports = {
	createUser,
	loginUser,
};
