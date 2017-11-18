var table=(tableIds, orderId)=>{
    let postData = {}
    tableIds.forEach(ids =>{
        postData[ids] = {status: "1", orderId: orderId}
    })
  var updates = {};
    updates['/table'] = postData;
  firebase.database().ref().update(updates);
  }
  
  module.exports={table}