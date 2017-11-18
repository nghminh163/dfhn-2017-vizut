let loginService = ($http) => {

    const bastApi = 'http://localhost:3003';
    return {
        login: (data, callback) => {
            let apiUrl = bastApi + '/login';
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


    }

};

loginService.$inject = ['$http'];

export default loginService;
