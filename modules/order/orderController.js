//Thêm, sửa, xóa
//idor, id users, idtable, description, price, person, time

var createOrder = (obj, cb)=> {
	cb(null, firebase.database().ref('order').push({
			userId: userId,
			description: description,
			price: price,
			time: time,
			tableIds:  tableIds,
			status: "pending"
	}).key); 
}

var deleteOrder = (orderId)=>{
	firebase.database().ref(`order/${orderId}`).remove();
	firebase.database().ref('table').orderByChild("orderId").equalTo(orderId).on("child_added", function(snapshot) {
		let child = snapshot.key;
		firebase.database().ref(`table/${child}/orderId`).remove(); 
		firebase.database().ref(`table/${child}`).set({status: 0}); 
	  });
}

var editOrder = (orderId, description,price,tableIds)=> {
if(description){firebase.database().ref(`order/${orderId}/description`).set({description: description})}
if(price){firebase.database().ref(`order/${orderId}/price`).set({price: price})}
if(tableIds){firebase.database().ref(`order/${orderId}/tableIds`).set({tableIds: tableIds})}
}

module.exports = {createOrder, deleleOrder};