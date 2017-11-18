import angular from 'angular';
import Login from './login/login';
import Home from './home/home';
import Admin from './admin/admin';

let componentModule = angular.module('app.components', [
    Login,
    Admin,
    Home
])
    .name;

export default componentModule;
