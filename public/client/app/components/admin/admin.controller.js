class AdminController {
    constructor($rootScope, $window, $anchorScroll) {
        this.name = 'admin';
    }
}

AdminController.$inject = [
    '$rootScope', '$window', '$anchorScroll'
];

export default AdminController;
