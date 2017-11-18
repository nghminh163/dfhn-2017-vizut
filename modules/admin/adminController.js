const firebase = require('firebase-admin');

var getOrders = (cb) => {
	firebase.database().ref('order').on('value', res => {
		// console.log(res.val());
		cb(null, res.val());
	});
}

module.exports = {getOrders: getOrders}