const express = require('express');
const Router = express.Router();
const bodyParser = require('body-parser');
const userController = require('./userController.js');
const utils = require('../utils');

Router.post("/login", (req, res) => {
	var email = req.body.email;
	var password = req.body.password;
	console.log(email, password);
	userController.signIn(email, password, (err, userInfo)  => {
		if (err)
			return res.json(utils.genRes(false, null, err));
		req.session.userInfo = userInfo;
		req.session.loggedIn = true;
		res.json(utils.genRes(true, userInfo));
	});
});

Router.post("/signup", (req, res) => {
	userController.signUp({
		name: req.body.name,
		password: req.body.password,
		phone: req.body.phone,
		email: req.body.email
	}, (err, data) => {
		if (err) res.send(utils.genRes(false, null, err));
		else res.send(utils.genRes(true));
	});
});

Router.get("/userInfo", (req, res) => {
	console.log(req.session.id);
	if (req.session.loggedIn)
		res.json(utils.genRes(true, req.session.userInfo));
	else
		res.json(utils.genRes(false, null, "Not logged in"));
});

Router.get("/logout", (req, res) => {
	req.session.destroy();
	res.json(utils.genRes(true));
});

module.exports = Router;