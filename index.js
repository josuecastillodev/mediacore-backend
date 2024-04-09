const express = require("express");
require("dotenv").config();
const { dbConnection } = require("./db/config");

const app = express();

//BD
dbConnection();

app.use(express.static("public"));

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/topic", require("./routes/topic"));
app.use("/api/post", require("./routes/post"));

app.listen(process.env.PORT, () => {
	console.log(`Run server in port ${process.env.PORT}...`);
});
