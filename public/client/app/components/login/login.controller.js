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
        this.loginService.login(this.formData, (res) => {
            if(res.status) {
                this.toastr.success("Login thành công");
                this.$rootScope.user = res.result;
                this.$cookieStore.put('user', this.$rootScope.user);
                this.$window.location.reload();
            }
            else {
                this.toastr.error(res.message);
            }
        })
    }

    registerForm() {
        this.loginService.register(this.formData, (res) => {
            if(res.status) {
                this.toastr.success("Đăng ký thành công");
                this.$rootScope.user = this.formData;
                this.$cookieStore.put('user', this.$rootScope.user);
                this.$window.location.reload();
            }
            else {
                this.toastr.error(res.message);
            }
        })
    }
}

LoginController.$inject = [
    '$rootScope', '$window', '$anchorScroll', 'toastr', '$cookies', '$cookieStore',
    'loginService'
];

export default LoginController;
