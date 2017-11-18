let adminService = ($http) => {

    return {

        demo: (project, callback) => {
            let apiUrl = 'link_demo';
            $http({
                method: 'GET',
                url: URL_API
            }).then(function successCallback(res) {
                callback(res.data);
            }, function errorCallback(res) {
                //log
            });
        },


    }

};

adminService.$inject = ['$http'];

export default adminService;
