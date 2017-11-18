const express = require('express');
const Router = express.Router();
const bodyParser = require('body-parser');
const md5 = require('md5');
const userController = require('./userController.js');

Router.post("/login", (req, res) => {
	var email = req.body.email;
	var password = req.body.password;
	res.json({
		role: "user",
		id: "123",
		name: "Test"
	});
});

Router.get("/userInfo", (req, res) => {
	
});



module.exports = Router;