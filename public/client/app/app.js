import 'jquery';
import angular from 'angular';
import 'angular-sanitize';
import 'angular-cookies';
import uiRouter from 'angular-ui-router';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';

import 'normalize.css';
import 'angular-toastr/dist/angular-toastr.min.css';
import 'angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.min.css';

import 'bootstrap-loader';
import 'angular-animate';
import 'angular-toastr';
import 'angular-ui-bootstrap';
import 'ngbootbox';
import 'moment/moment.js';
import 'angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.min';

import appSerivce from './app.service';

angular.module('app', [
    'ngAnimate',
    'ngCookies',
    'ui.bootstrap',
    'toastr',
    'ngSanitize',
    'ngBootbox',
    'bootstrapLightbox',
    uiRouter,
    Common,
    Components
])
    .config(($locationProvider, LightboxProvider) => {
        "ngInject";
        $locationProvider.html5Mode(true).hashPrefix('!');
        LightboxProvider.templateUrl = './assets/lightbox-template.html';
    })
    .service('appService', appSerivce)
    .component('app', AppComponent);
