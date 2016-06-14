(function () {
    "use strict";

    angular.module(APPNAME)
        .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {

            $routeProvider.when('/list', {
                templateUrl: '/Scripts/sabio/application/dealerInventory/templates/list.html',
                controller: 'listController',
                controllerAs: 'list'
            }).when('/edit/:recordID', {
                templateUrl: '/Scripts/sabio/application/dealerInventory/templates/edit.html',
                controller: 'vehicleEditController',
                controllerAs: 'edit'
            }).when('/create', { 
                templateUrl: '/Scripts/sabio/application/dealerInventory/templates/edit.html',
                controller: 'vehicleEditController',
                controllerAs: 'edit'
            }).when('/media/:recordID', { 
                templateUrl: '/Scripts/sabio/application/dealerInventory/templates/media.html',
                controller: 'vehicleMediaController',
                controllerAs: 'ava'
            }).when('/video/:recordID', { 
                templateUrl: '/Scripts/sabio/application/dealerInventory/templates/video.html',
                controller: 'vehicleVideoController',
                controllerAs: 'vvc'
            });

            $locationProvider.html5Mode(false);

        }]);

})();

