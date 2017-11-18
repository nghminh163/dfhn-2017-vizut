var updateTable = (tableIds, orderId, status, cb) => {
	let postData = {};

	tableIds.forEach(ids => {
		postData[ids] = {
			status: status,
			orderId: orderId
		}
	});
	
	var updates = {};
	updates['/table'] = postData;
	firebase.database().ref().update(updates);
	cb(null);
}
	
module.exports={table}