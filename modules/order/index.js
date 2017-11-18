const express = require('express');
const Router = express.Router();
const bodyParser = require('body-parser');

Router.post('/createOrder', (req, res) => {
	var orderInfo = {
		userId: req.body.userId,
		tableIds: req.body.tableIds,
		description: req.body.description,
		price: req.body.price
	}


});

Router.post('/deleteOrder', (req, res) => {

});

module.exports = Router;