class ListTableController {
    constructor($rootScope, $window, $anchorScroll, listTableService) {
        this.name = 'listTable';
        this.$rootScope = $rootScope;
        this.onInit();
        this.filter = '';
        this.activeTable = {}

    }

    onInit() {
        this.listTable = [
            {
                status: 0,
                name: '1',
                orderId: null
            },
            {
                status: 1,
                name: '2',
                orderId: 124
            },
            {
                status: 0,
                name: '3',
                orderId: null
            },
            {
                status: 2,
                name: '4',
                orderId: null
            },
            {
                status: 0,
                name: '5',
                orderId: null
            },
            {
                status: 0,
                name: '6',
                orderId: null
            },
            {
                status: 0,
                name: '7',
                orderId: null
            }
        ];
        this.selectedTable = [];
    }

    selectTable(item) {
        if (!item.isSelect) {
            item.isSelect = true;
            this.selectedTable.push(item);
        }
        else {
            this.selectedTable.splice(this.selectedTable.indexOf(item), 1);
            item.isSelect = false;
        }
    }
    showTableDetail(item) {
        this.activeTable = item;
        // $('#dismiss-modal').trigger('click');
    }

    continueToOrder() {
        this.$rootScope.isOrder = true;
        this.$rootScope.selectedTable = this.selectedTable;
    }
}

ListTableController.$inject = [
    '$rootScope', '$window', '$anchorScroll',
    'listTableService'
];

export default ListTableController;
