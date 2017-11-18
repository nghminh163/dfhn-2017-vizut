const express = require('express');
const Router = express.Router();
const utils = require('../utils');
const paymentController = require('./paymentController.js');

Router.post("/pay", (req, res) => {
	var data = {
		orderId: req.body.orderId,
		ccn: req.body.ccn,
		ccv: req.body.ccv,
		expiry: req.body.expiry,
		amount: req.body.amount
	}

	paymentController.processPayment(data, (err, data) => {
		if (err) res.send(utils.genRes(false, null, err));
		else res.send(utils.genRes(true, data));
	});
});

module.exports = Router;