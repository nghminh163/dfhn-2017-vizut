let homeService = ($http) => {

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

homeService.$inject = ['$http'];

export default homeService;
