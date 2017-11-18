class NavbarController {
    constructor($rootScope, $window, $anchorScroll, $cookies) {
        this.name = 'navbar';
        this.$rootScope = $rootScope;
        this.$window = $window;
        this.$cookies = $cookies;
    }
    logout() {
        this.$cookies.remove('user');
        this.$window.location.reload();
    }
}
NavbarController.$inject = [
    '$rootScope', '$window', '$anchorScroll', '$cookies'
];

export default NavbarController;
