const express = require('express');
const CONFIGS = require('./config.js');
const user = require('./modules/user');
const bodyParser = require('body-parser');
var app = express();

var serviceAccount = require("./dfhn-vizut-firebase-adminsdk-7b9v6-6b7890226b.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dfhn-vizut.firebaseio.com"
});

app.use(bodyParser.json({extended : true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
app.use("/", express.static(__dirname + "/public"));

app.use(user);

app.get("/", (req, res) => {
	res.send("It works!");
});

app.listen(CONFIGS.port, CONFIGS.ip, () => {
	console.log(`Listening on ${CONFIGS.ip}:${CONFIGS.port}`);
});