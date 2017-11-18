class AdminController {
    constructor($rootScope, $window, $anchorScroll) {
        this.name = 'admin';
        this.$rootScope = $rootScope;
        $rootScope.activeView = 'list';
    }
}

AdminController.$inject = [
    '$rootScope', '$window', '$anchorScroll'
];

export default AdminController;
