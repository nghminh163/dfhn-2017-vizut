const firebase = require('firebase-admin');
const tableController = require('../table/tableController.js');

var processPayment = (obj, cb) => {
	tableController.updateTableByOrderId(obj.orderId, 2);
	cb(null);
}

module.exports = {processPayment: processPayment}