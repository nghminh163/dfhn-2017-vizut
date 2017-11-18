const md5 = require('md5');
const firebase = require("firebase-admin");

var serviceAccount = require("../../dfhn-vizut-firebase-adminsdk-7b9v6-6b7890226b.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://dfhn-vizut.firebaseio.com"
});

var signUp = (obj, cb)=> {
	firebase.database().ref('users').push({
		name: obj.name,
		password: md5(obj.password),
		phone: obj.phone,
		email: obj.email
	});
	cb(null);
}

var signIn = (email, password, cb) => {
	var password = md5(password);
	console.log(email);
	firebase.database().ref('users').orderByChild("email").equalTo(email).on("child_added", (snapshot)=>{
		child = snapshot.key;
		if (!child) return cb("Wrong email or password");

		firebase.database().ref(`users/${child}`).once('value')
		.then(res => {var arr=res.val();
			var psw = arr.password;
			
			var obj = {
				name: arr.name,
				phone: arr.phone,
				role: arr.role,
				userId: child
			};

			if(psw === password) return cb(null, obj);
			else return cb("Wrong email or password");              
		})
	})
}

module.exports = {signIn: signIn, signUp: signUp}

