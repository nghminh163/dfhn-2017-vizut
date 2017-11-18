class BookingListController {
    constructor($rootScope, $window, $anchorScroll, bookingListService) {
        this.name = 'bookingList';
        this.$rootScope = $rootScope;
        this.onInit();
    }

    onInit() {
        this.bookingList = [
            {
                name: 'Khach hanng 1',
                order: 'Buffet1',
                table: [{name: '2'}],
                price: 130000000
            },
            {
                name: 'Khanh',
                order: 'Buffet1',
                table: [{name: '2'}],
                price: 130000000
            },
            {
                name: 'Thao',
                order: 'Buffet vip',
                table: [{name: '3'}],
                price: 130000000
            },
            {
                name: 'Khach hanng 3',
                order: 'Buffet1',
                table: [{name: '4'}],
                price: 130000000
            }
        ]
    }
}

BookingListController.$inject = [
    '$rootScope', '$window', '$anchorScroll',
    'bookingListService'
];

export default BookingListController;
