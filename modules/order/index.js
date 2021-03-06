const express = require('express');
const Router = express.Router();
const bodyParser = require('body-parser');
const orderController = require('./orderController.js');
const tableController = require('../table/tableController.js');
const async = require('async');
const utils = require('../utils');

Router.post('/createOrder', (req, res) => {
	var orderInfo = {
		userId: req.body.userId,
		description: req.body.description,
		price: req.body.price,
		time: req.body.time,
		tableIds:  req.body.tableIds,
		listing: req.body.listing,
		status: "pending"
	};

	orderController.createOrder(orderInfo, (err, data) => {
		if (err) res.json(utils.genRes(false, null, err));
		else {
			tableController.updateTable(req.body.tableIds, data, 1, (err, data1) => {
				if (err) res.json(utils.genRes(false, null, err));
				else res.json(utils.genRes(true, data));
			});
		}
	});
});

Router.post('/deleteOrder', (req, res) => {
	orderController.deleteOrder(req.body.orderId, (err, data) => {
		if (err) res.json(utils.genRes(false, null, err));
		else res.json(utils.genRes(true));
	});
});

Router.post('/editOrder', (req, res) => {
	var updateInfo = {
		description: req.body.description,
		price: req.body.price,
		tableIds: req.body.tableIds,
		listing: req.body.listing,
		orderId: req.body.orderId
	}

	orderController.editOrder(updateInfo, (err, data) => {
		if (err) res.json(utils.genRes(false, null, err));
		else res.json(utils.genRes(true));
	});
});

Router.post('/getOrder', (req, res) => {
	orderController.getOrder(req.body.orderId, (err, data) => {
		if (err) res.json(err);
		else res.json(data);
	});
});

module.exports = Router;