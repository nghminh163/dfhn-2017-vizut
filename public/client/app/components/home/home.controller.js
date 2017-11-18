class HomeController {
    constructor($rootScope, $window, $anchorScroll, homeService) {
        this.name = 'home';
        this.$rootScope = $rootScope;
    }
}

HomeController.$inject = [
    '$rootScope', '$window', '$anchorScroll',
    'homeService'
];

export default HomeController;
