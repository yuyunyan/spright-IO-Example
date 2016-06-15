(function () {
    "use strict";

    angular.module(APPNAME)
         .factory('$dealerRecordService', DealerRecordService);

    DealerRecordService.$inject = ['$baseService', '$spright'];    

    function DealerRecordService($baseService, $spright) {

        var aSprightServiceObject = spright.services.dealerRecord;

        var newService = $baseService.merge(true, {}, aSprightServiceObject, $baseService);

        return newService;
    }

})();
