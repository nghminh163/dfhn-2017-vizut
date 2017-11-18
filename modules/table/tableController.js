const firebase = require('firebase-admin');

var updateTable = (tableIds, orderId, status, cb) => {
	var updates = {};
	tableIds.forEach(ids => {
		updates[`/table/${ids}`] =  {
			status: status,
			orderId: orderId
		};
	});
	firebase.database().ref().update(updates);
	cb(null);
}
	
module.exports={updateTable: updateTable}