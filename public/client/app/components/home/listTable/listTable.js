import angular from 'angular';
import uiRouter from 'angular-ui-router';
import listTableComponent from './listTable.component';
import listTableService from './listTable.service';
let listTableModule = angular.module('listTable', [
    uiRouter
])

    .component('listTable', listTableComponent)
    .service('listTableService', listTableService)
    .filter('tableFilter', function () {
        return function (items, filter) {
            switch (filter) {
                case  '': {
                    return items;
                }
                case  '0': {
                    let newItem = [];
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        if (item.status == 0) {
                            newItem.push(item);
                        }
                    }
                    return newItem;
                }
                default: {
                    let newItem = [];
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        if (item.status == 1 || item.status == 2) {
                            newItem.push(item);
                        }
                    }
                    return newItem;
                }
            }
        };
    })
    .name;

export default listTableModule;
