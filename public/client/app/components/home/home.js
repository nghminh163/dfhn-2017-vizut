import angular from 'angular';
import uiRouter from 'angular-ui-router';
import homeComponent from './home.component';
import listTable from './listTable/listTable'
import orderForm from './orderForm/orderForm'
import homeService from './home.service';
let homeModule = angular.module('home', [
    uiRouter,
    listTable,
    orderForm
])

    .component('home', homeComponent)
    .service('homeService', homeService)
    .name;

export default homeModule;
