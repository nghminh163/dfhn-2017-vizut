class ListTableController {
    constructor($rootScope, $window, $anchorScroll, listTableService) {
        this.name = 'listTable';
        this.onInit();
        this.filter = '';
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
        ]
    }
}

ListTableController.$inject = [
    '$rootScope', '$window', '$anchorScroll',
    'listTableService'
];

export default ListTableController;
