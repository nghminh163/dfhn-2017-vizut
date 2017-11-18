let tableService = ($http) => {

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

tableService.$inject = ['$http'];

export default tableService;
