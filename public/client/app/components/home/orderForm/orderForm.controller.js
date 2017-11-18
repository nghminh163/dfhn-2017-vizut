class OrderFormController {
    constructor($rootScope, $window, $anchorScroll, orderFormService, $firebaseArray, toastr, $cookieStore) {
        this.name = 'orderForm';
        this.$rootScope = $rootScope;
        this.$cookieStore = $cookieStore;
        this.toastr = toastr;
        this.orderFormService = orderFormService;
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
        if ($rootScope.user.order) {
            this.total = 0;
            this.orderFormService.getOrder({orderId: $rootScope.user.order}, (res) => {
                this.formData = res;
                this.formData.date = new Date(this.formData.time);
                this.formData.listing.forEach((menu) => {
                    this.listMenu.forEach((item) => {
                        if (item.name == menu.name) {
                            item.number = menu.number;
                            this.total += item.number*item.price;
                        }
                    })
                });

            })
        }
        this.timeDefault = {
            hstep: 1,
            mstep: 15,
            ismeridian: true
        };

        firebase.database().ref('menu/').on('value', (res) => {
            let arrays = Object.keys(res.val());
            let ref = firebase.database().ref('menu/');
            this.listMenu = $firebaseArray(ref);
            console.log(this.listMenu);

        });
    }

    openDatePicker() {
        this.isOpenDate = true;
    }

    countPrice() {
        this.total = 0;
        this.listMenu.forEach((item) => {
            if (item.number && item.number > 0) {
                this.total += item.number*item.price;
            }
        })
    }

    backToList() {
        this.$rootScope.isOrder = false;
    }

    submitPay() {
        this.formData.listing = [];
        for (let i=0; i<this.listMenu.length; i++) {
            if (this.listMenu[i].number > 0) {
                this.formData.listing.push({
                    id: this.listMenu[i].id,
                    image: this.listMenu[i].image,
                    name: this.listMenu[i].name,
                    number: this.listMenu[i].number,
                    price: this.listMenu[i].price,
                });
            }
        }
        this.formData.time = this.formData.date;
        this.formData.price = this.total;
        this.formData.tableIds = [this.$rootScope.activeTable.$id];
        this.formData.userId = this.$rootScope.user.userId;
        console.log(this.formData);
        this.orderFormService.submitOrder(this.formData, (res) => {
            console.log(res);
            if (res.status) {
                this.toastr.success('Thành Công');
                this.$rootScope.user.order = res.result;
                this.$cookieStore.put('user', this.$rootScope.user);
                this.$rootScope.isOrder = false;
            }
        });
    }
}

OrderFormController.$inject = [
    '$rootScope', '$window', '$anchorScroll',
    'orderFormService', '$firebaseArray', 'toastr', '$cookieStore'
];

export default OrderFormController;
