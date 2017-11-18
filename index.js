const express = require('express');
const CONFIGS = require('./config.js');
const user = require('./modules/user');
const order = require('./modules/order');
const table = require('./modules/table');
const bodyParser = require('body-parser');
const session = require('express-session');

var app = express();

app.use(session({
	secret: "thisisalongsecretkey",
	maxAge: 1000*60*60*24*30,
	resave: false,
	saveUninitialized: true
}));


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

app.use("/", express.static(__dirname + "/public/dist"));

app.use("/api/user", user);

app.use("/api/order", order);

// app.use("/api/table", table);

app.get("/", (req, res) => {
	res.send("It works!");
});

app.listen(CONFIGS.port, CONFIGS.ip, () => {
	console.log(`Listening on ${CONFIGS.ip}:${CONFIGS.port}`);
});