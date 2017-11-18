const express = require('express');
const CONFIGS = require('./config.js');
const user = require('./modules/user');
const bodyParser = require('body-parser');
const admin = require("firebase-admin");
var app = express();

var serviceAccount = require("./dfhn-vizut-firebase-adminsdk-7b9v6-6b7890226b.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dfhn-vizut.firebaseio.com"
});

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