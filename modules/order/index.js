const express = require('express');
const Router = express.Router();
const bodyParser = require('body-parser');
const orderController = require('./orderController.js');

Router.post('/createOrder', (req, res) => {
	var orderInfo = {
		userId: req.body.userId,
		tableIds: req.body.tableIds,
		description: req.body.description,
		price: req.body.price,
		time: req.body.time,
		tableIds:  req.body.tableIds,
		status: "pending"
	}

	orderController.createOrder(orderInfo, (err, data) => {
		if (err) res.json(false, null, err);
		else res.json(true, data);
	});
});

Router.post('/deleteOrder', (req, res) => {

});

module.exports = Router;