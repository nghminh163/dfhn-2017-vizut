import angular from 'angular';
import uiRouter from 'angular-ui-router';
import loginComponent from './login.component';
import loginService from './login.service';
let loginModule = angular.module('login', [
  uiRouter
])

.component('login', loginComponent)
.service('loginService', loginService)
.name;

export default loginModule;
