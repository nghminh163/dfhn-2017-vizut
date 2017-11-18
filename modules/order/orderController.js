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

module.exports = {createOrder};