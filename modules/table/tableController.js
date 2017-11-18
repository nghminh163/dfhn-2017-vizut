const firebase = require('firebase-admin');

var updateTable = (tableIds, orderId, status, cb) => {
	var updates = {};
	tableIds.forEach(ids => {
		updates[`/table/${ids}`] =  {
			status: status,
			orderId: orderId,
			name: ids
		};
	});
	firebase.database().ref().update(updates);
	cb(null);
}

var updateTableByOrderId = (orderId, status) => {
	firebase.database().ref(`order/${orderId}/tableIds`).once('value').then(res => {
		var tblIds = res.val();
		let updated2 = {};
		tblIds.forEach(id => {
			updated2[`table/${id}/status`] = status;
		});
		firebase.database().ref().update(updated2);
	});
}
	
module.exports = {updateTable: updateTable, updateTableByOrderId: updateTableByOrderId}