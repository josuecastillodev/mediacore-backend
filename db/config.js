const mongoose = require("mongoose");

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.DB_CNN);

		console.log("Conexión hecha");
	} catch (error) {
		console.log(error);
		throw new Error("No se pudo inicializar la BD");
	}
};

module.exports = {
	dbConnection,
};
