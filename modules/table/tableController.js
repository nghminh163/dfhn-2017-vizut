var table=(tableIds, orderId)=>{
    for (var i=0; i<tableIds.length;i++){
        firebase.database().ref(`table/${table}`).set({orderId:orderId, status:1});
    }
}

module.exports={table}