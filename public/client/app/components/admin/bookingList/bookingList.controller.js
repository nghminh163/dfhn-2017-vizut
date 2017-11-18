class BookingListController {
    constructor($rootScope, $window, $anchorScroll, bookingListService) {
        this.name = 'bookingList';
        this.$rootScope = $rootScope;
    }
}

BookingListController.$inject = [
    '$rootScope', '$window', '$anchorScroll',
    'bookingListService'
];

export default BookingListController;
