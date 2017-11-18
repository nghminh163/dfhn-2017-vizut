class HomeController {
    constructor($rootScope, $window, $anchorScroll, homeService) {
        this.name = 'home';
        console.log('????');
    }
}

HomeController.$inject = [
    '$rootScope', '$window', '$anchorScroll',
    'homeService'
];

export default HomeController;
