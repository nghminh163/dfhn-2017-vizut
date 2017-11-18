//Thêm, sửa, xóa
//idor, id users, idtable, description, price, person, time
const firebase = require("firebase-admin");

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
	firebase.database().ref(`order/${orderId}`).remove();
	firebase.database().ref('table').orderByChild("orderId").equalTo(orderId).once("child_added").then(res=> {
		console.log(res.key);
		let child = res.key;
		firebase.database().ref(`table/${child}/orderId`).remove(); 
		firebase.database().ref(`table/${child}`).set({status: 0}); 
  });
	cb(null);
}

var editOrder = (obj, cb)=> {
	var updated = {
	}

	if(obj.description)	updated.description = obj.description;
	if(obj.price)	updated.price = obj.price;
	if(obj.tableIds) updated.tableIds = obj.tableIds;
	if(obj.listing) updated.listing = obj.listing;	

	firebase.database().ref(`order/${obj.orderId}`).update(updated);
	cb(null);
}

module.exports = {createOrder, deleteOrder, editOrder};