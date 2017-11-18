var setTable=(tableIds, orderId, status, cb)=>{
    for (var i=0; i<tableIds.length;i++){
        firebase.database().ref(`table/${table}`).set({orderId:orderId, status: status});
    }
}

module.exports={table}