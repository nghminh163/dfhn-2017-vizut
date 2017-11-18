const express = require('express');
const utils = require('../utils');
const adminController = require('./adminController.js');
const Router = express.Router();

Router.use((req, res, next) =>{
	if (!req.session.userInfo.role === 'admin') 
		return res.send(utils.genRes(false, null, 'You are not an admin'));
	next();
});

Router.get("/orders", (req, res) => {
	adminController.getOrders((err, data) => {
		if (err) res.json(err);
		else res.json(data);
	});
});

module.exports = Router;