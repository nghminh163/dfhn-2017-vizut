//Thêm, sửa, xóa
//idor, id users, idtable, description, price, person, time
var order=(userId, tableIds, description, price, person, time,status)=> {
        firebase.database().ref('order').push({
            userId: userId,
            description: description,
            price: price,
            time: time,
            tableIds:  tableIds,
            status: "pending"
        }
        )

}