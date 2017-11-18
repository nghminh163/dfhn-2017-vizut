class LoginController {
    constructor($rootScope, $window, $anchorScroll, toastr, $cookies, $cookieStore, loginService) {
        this.name = 'login';
        this.loginService = loginService;
        this.$cookies = $cookies;
        this.$cookieStore = $cookieStore;
        this.$window = $window;
        this.$rootScope = $rootScope;
        this.toastr = toastr;
        this.isLogin = true;
        this.formData = {
            email: '',
            password: ''
        };
        console.log(loginService);

    }

    loginForm() {
        this.toastr.success("Login thành công");
        this.loginService.login(this.formData, (res) => {

            if(res.status) {
                console.log(res);
                this.toastr.success("Login thành công");
                this.$rootScope.user = res.result;
                this.$cookieStore.put('user', this.$rootScope.user);
                this.$window.location.reload();
            }
        })
    }
}

LoginController.$inject = [
    '$rootScope', '$window', '$anchorScroll', 'toastr', '$cookies', '$cookieStore',
    'loginService'
];

export default LoginController;
