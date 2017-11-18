const firebase = require('firebase-admin');
var db = firebase.database();

var addFood = (name, image, price) => {
	db.ref('menu').push({
		name: name,
		image: image,
		price: price
	});
}