const md5 = require('md5');
const firebase = require("firebase-admin");

var signUp = (obj, cb)=> {
	var objs = {
		name: obj.name,
		password: md5(obj.password),
		phone: obj.phone,
		email: obj.email,
		role: "user"
	}
	firebase.database().ref('users').push(objs);
	cb(null, objs);
}

var signIn = (email, password, cb) => {
	var password = md5(password);

	firebase.database().ref('users').orderByChild("email").equalTo(email).once("value").then(res=>{
		var check = res.val();
		if (!check) return cb("Wrong email or password");

		firebase.database().ref('users').orderByChild("email").equalTo(email).once('child_added').then(res=>{
			child = res.key;
			firebase.database().ref(`users/${child}`).once('value')
			.then(res => {
				var arr=res.val();
				var psw = arr.password;
				
				var obj = {
					name: arr.name,
					phone: arr.phone,
					role: arr.role,
					userId: child
				};

				if(psw === password) {return cb(null, obj);}
				else return cb("Wrong email or password");              
			});
		});
	});
}

module.exports = {signIn: signIn, signUp: signUp}