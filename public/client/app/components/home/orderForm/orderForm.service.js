let orderFormService = ($http) => {
    const bastApi = 'http://localhost:3003';

    return {

        submitOrder: (data, callback) => {
            let apiUrl = bastApi + '/api/order/createOrder';
            $http({
                method: 'POST',
                data: data,
                url: apiUrl
            }).then(function successCallback(res) {
                callback(res.data);
            }, function errorCallback(res) {
                //log
            });
        },

        getOrder: (data, callback) => {
            let apiUrl = bastApi + '/api/order/getOrder/';
            $http({
                method: 'POST',
                data: data,
                url: apiUrl
            }).then(function successCallback(res) {
                callback(res.data);
            }, function errorCallback(res) {
                //log
            });
        }


    }

};

orderFormService.$inject = ['$http'];

export default orderFormService;
