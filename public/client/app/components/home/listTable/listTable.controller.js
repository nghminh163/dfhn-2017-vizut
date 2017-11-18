class ListTableController {
    constructor($rootScope, $window, $anchorScroll, $firebaseArray, listTableService) {
        this.name = 'listTable';
        this.$rootScope = $rootScope;
        this.filter = '';
        this.activeTable = {};
        this.$firebaseArray = $firebaseArray;
        this.selectedTable = [];

        firebase.database().ref('table/').on('value', (res) => {
            let arrays = Object.keys(res.val());
            let ref = firebase.database().ref('table/');
            this.listTable = this.$firebaseArray(ref);
            console.log(this.listTable);

            // setTimeout(() => {
            //     this.listTable.forEach((item) => {
            //         if (item.orderId === $rootScope.user.id) {
            //             this.selectedTable.push(item);
            //             item.isSelect = true;
            //         }
            //     });
            //     console.log(this.listTable);
            // }, 10);
        });
    }

    addNew() {

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
        console.log('??');
        this.$rootScope.isOrder = true;
        this.$rootScope.activeTable = this.activeTable;
        console.log(this.$rootScope.activeTable);
        this.$rootScope.selectedTable = this.selectedTable;
    }

    deltaiOrder() {
        console.log(this.$rootScope.user);
        this.$rootScope.isOrder = true;
    }
}

ListTableController.$inject = [
    '$rootScope', '$window', '$anchorScroll', '$firebaseArray',
    'listTableService'
];

export default ListTableController;
