const express = require('express');
const CONFIGS = require('./config.js');
const user = require('./modules/user');
const bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json({extended : true}));
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", express.static(__dirname + "/public"));

app.use(user);

app.get("/", (req, res) => {
	res.send("It works!");
});

app.listen(CONFIGS.port, CONFIGS.ip, () => {
	console.log(`Listening on ${CONFIGS.ip}:${CONFIGS.port}`);
});