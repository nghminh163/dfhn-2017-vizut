const express = require('express');
const CONFIGS = require('./config.js');
var app = express();

app.use("/", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
	res.send("It works!");
});

app.listen(CONFIGS.port, CONFIGS.ip, () => {
	console.log(`Listening on ${CONFIGS.ip}:${CONFIGS.port}`);
});