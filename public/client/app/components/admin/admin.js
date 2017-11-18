import angular from 'angular';
import uiRouter from 'angular-ui-router';
import adminComponent from './admin.component';
import adminService from './admin.service';
let adminModule = angular.module('admin', [
  uiRouter
])

.component('admin', adminComponent)
.service('adminService', adminService)
.name;

export default adminModule;
