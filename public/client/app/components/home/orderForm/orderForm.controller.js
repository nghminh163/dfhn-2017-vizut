class OrderFormController {
    constructor($rootScope, $window, $anchorScroll, orderFormService) {
        this.name = 'orderForm';
        this.$rootScope = $rootScope;
        this.formData = {
            date: null
        };

        this.format = 'dd-MMMM-yyyy';
        this.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };
        this.timeDefault = {
            hstep: 1,
            mstep: 15,
            ismeridian: true
        }

    }

    openDatePicker() {
        this.isOpenDate = true;
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
