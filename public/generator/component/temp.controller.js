class <%= upCaseName %>Controller {
  constructor($rootScope, $window, $anchorScroll, <%= name %>Service) {
    this.name = '<%= name %>';
  }
}

<%= upCaseName %>Controller.$inject = [
    '$rootScope', '$window', '$anchorScroll',
    '<%= name %>Service'
];

export default <%= upCaseName %>Controller;
