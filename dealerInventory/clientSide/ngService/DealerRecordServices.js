(function () {
    "use strict";

    angular.module(APPNAME)
         .factory('$dealerRecordService', DealerRecordService);

    DealerRecordService.$inject = ['$baseService', '$sabio'];    //  $sabio is a reference to sabio.page object which is created in sabio.js

    function DealerRecordService($baseService, $sabio) {

        var aSabioServiceObject = sabio.services.dealerRecord;

        var newService = $baseService.merge(true, {}, aSabioServiceObject, $baseService);

        return newService;
    }

})();
