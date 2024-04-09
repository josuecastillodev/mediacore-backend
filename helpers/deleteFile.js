const fs = require("node:fs");

const deleteFile = (file) => {
	if (file) {
		fs.unlinkSync(file);
	}
};

module.exports = {
	deleteFile,
};
