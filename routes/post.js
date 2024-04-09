const { Router } = require("express");
const { index, show, create, update, remove } = require("../controllers/post");
const router = Router();
const multer = require("multer");

const upload = multer({ dest: "uploads/post" });

const postAssets = upload.fields([
	{ name: "image", maxCount: 1 },
	{ name: "text", maxCount: 1 },
]);

//PATH = /api/post

router.get("/", index);

router.post("/", postAssets, create);

router.get("/:id", show);

router.put("/:id", postAssets, update);

router.delete("/:id", remove);

module.exports = router;
