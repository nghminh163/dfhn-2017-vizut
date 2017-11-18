import angular from 'angular';
import uiRouter from 'angular-ui-router';
import orderFormComponent from './orderForm.component';
import orderFormService from './orderForm.service';
let orderFormModule = angular.module('orderForm', [
  uiRouter
])

.component('orderForm', orderFormComponent)
.service('orderFormService', orderFormService)
.name;

export default orderFormModule;
