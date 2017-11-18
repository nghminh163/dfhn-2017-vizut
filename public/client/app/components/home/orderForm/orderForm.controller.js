class OrderFormController {
    constructor($rootScope, $window, $anchorScroll, orderFormService) {
        this.name = 'orderForm';
        this.$rootScope = $rootScope;

    }

    backToList() {
        this.$rootScope.isOrder = false;
    }
}

OrderFormController.$inject = [
    '$rootScope', '$window', '$anchorScroll',
    'orderFormService'
];

export default OrderFormController;
