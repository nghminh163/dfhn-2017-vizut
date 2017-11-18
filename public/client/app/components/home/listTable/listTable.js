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
                default: {
                    let newItem = [];
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        if (item.status == filter) {
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
