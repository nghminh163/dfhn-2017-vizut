
var signup= (email, password)=> {
    firebase.database().ref('users').push({email:email, password: md5(password)})
    console.log("Sign up successful");
}
var signin = (email, password, cb)=>{
    let password = md5(password);
    firebase.database().ref('users').orderByChild("email").equalTo(email).on("child_added", (snapshot)=>{
        child=snapshot.key;
        if (!child) {return cb("Wrong email or password");}
            firebase.database().ref(`users/${child}`).once('value')
            .then(res=>{var arr=res.val();
                var psw=arr.password;
                var obj={name: arr.name, phone: arr.phone, role: arr.role, userId: child};
                if(psw === password){
                    cb(obj);
                }
                else{
                    cb("Wrong email or password");              
                }
            })
    })
}

module.exports = {signin, signup}

