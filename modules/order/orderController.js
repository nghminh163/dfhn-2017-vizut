//Thêm, sửa, xóa
//idor, id users, idtable, description, price, person, time
const firebase = require("firebase-admin");
const tableController = require("../table/tableController.js");

var serviceAccount = require("../../dfhn-vizut-firebase-adminsdk-7b9v6-6b7890226b.json");

// firebase.initializeApp({
//   credential: firebase.credential.cert(serviceAccount),
//   databaseURL: "https://dfhn-vizut.firebaseio.com"
// });

var createOrder = (obj, cb)=> {
	cb(null, firebase.database().ref('order').push({
			userId: obj.userId,
			description: obj.description,
			price: obj.price,
			time: obj.time,
			tableIds:  obj.tableIds,
			listing: obj.listing,
			status: "pending"
	}).key);
}

var deleteOrder = (orderId, cb)=>{
	var updated = {
	}

	firebase.database().ref(`order/${orderId}/tableIds`).once('value').then(res=>{
		var tblIds=res.val();
		tblIds.forEach(id => {
			updated[`table/${id}/orderId`] = null;
			updated[`table/${id}/status`] = 0;
		});
		firebase.database().ref().update(updated);
		firebase.database().ref(`order/${orderId}`).remove();
	});
	cb(null);
}

var editOrder = (obj, cb)=> {
	var updated = {
	}

	if(obj.description)	updated[`order/${obj.orderId}/description`] = obj.description;
	if(obj.price)	updated[`order/${obj.orderId}/price`] = obj.price;
	if(obj.listing) updated.listing = obj.listing;
	if(obj.tableIds) {
		obj.tableIds.forEach(id => {
			updated[`table/${id}/orderId`] = obj.orderId;
			updated[`table/${id}/status`] = 1;
		});
		updated[`order/${obj.orderId}/tableIds`] = obj.tableIds;
		firebase.database().ref('order/'+obj.orderId+'/tableIds').once('value').then(res=>{
			var tblIds=res.val();
			let updated2 = {};
			tblIds.forEach(id => {
				updated2[`table/${id}/orderId`] = null;
				updated2[`table/${id}/status`] = 0;
			});
			firebase.database().ref().update(updated2).then(() => {
				firebase.database().ref().update(updated);
			});
		});
	}
	cb(null);
}

module.exports = {createOrder, deleteOrder, editOrder};