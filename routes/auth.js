const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

const { createUser, loginUser } = require("../controllers/auth");
const { validateFields } = require("../middlewares/validateFields");

// PATH = /api/auth

router.post(
	"/user/create",
	[
		check("email", "El Correo es obligatorio").not().isEmpty().isEmail(),
		check("username", "El Username es obligatorio").not().isEmpty(),
		validateFields,
	],
	createUser
);

router.get("/user", loginUser);

module.exports = router;
