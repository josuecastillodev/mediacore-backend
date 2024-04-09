const fs = require("node:fs");

const saveFile = (file, destination) => {
	const newPath = `${destination}/${file.originalname}`;
	console.log(file);
	fs.renameSync(file.path, newPath);

	return newPath;
};

module.exports = {
	saveFile,
};
