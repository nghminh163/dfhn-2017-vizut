import angular from 'angular';
import uiRouter from 'angular-ui-router';
import bookingListComponent from './bookingList.component';
import bookingListService from './bookingList.service';
let bookingListModule = angular.module('bookingList', [
  uiRouter
])

.component('bookingList', bookingListComponent)
.service('bookingListService', bookingListService)
.name;

export default bookingListModule;
