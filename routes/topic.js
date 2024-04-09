const { Router } = require("express");
const { index, show, create, update, remove } = require("../controllers/topic");
const router = Router();
const multer = require("multer");

const upload = multer({ dest: "uploads/topic" });

//PATH = /api/topic

router.get("/", index);

router.post("/", upload.single("banner"), create);

router.get("/:id", show);

router.put("/:id", upload.single("banner"), update);

router.delete("/:id", remove);

module.exports = router;
