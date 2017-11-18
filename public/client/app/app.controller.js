/**
 * Created by SecretSword on 11/18/17.
 */
class AppController {
    constructor($rootScope, $window, $anchorScroll, appService, $cookies, $cookieStore) {
        this.name = 'home';
        this.appService = appService;
        this.$cookieStore = $cookieStore;
        this.$cookies = $cookies;
        this.$rootScope = $rootScope;
        this.onInit();
    }

    onInit() {
        console.log(this.$cookies.get('user'));
        this.$rootScope.user = this.$cookies.get('user');
        if (!this.$rootScope.user) {
            this.isLogin = true;
        }
        else {
            if (this.$rootScope.user.role === 'admin') {
                this.role = 'admin';
            }
            else {
                this.role = 'user';
            }
        }

    }
}

AppController.$inject = [
    '$rootScope', '$window', '$anchorScroll', '$cookies','$cookieStore',
    'appService'
];

export default AppController;
