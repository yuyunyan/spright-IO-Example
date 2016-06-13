(function () {
    "use strict";

    angular.module(APPNAME)
        .controller('vehicleEditController', VehicleEditController);

    VehicleEditController.$inject = ['$scope', '$baseController', "$vehicleService", "$UpgradeDealerService", '$AddressesService', '$routeParams',
        '$evaEntityService', '$evaAttributeService', '$schemaFormService', '$evaRecordService', "$location", "$dealerRecordService"];

    function VehicleEditController(
        $scope
        , $baseController
        , $vehicleService
        , $UpgradeDealerService
        , $AddressesService
        , $routeParams
        , $evaEntityService
        , $evaAttributeService
        , $schemaFormService
        , $evaRecordService
        , $location
        , $dealerRecordService) {

        var vm = this;//this points to a new {}
        $baseController.merge(vm, $baseController);
        vm.recordID = vm.$routeParams.recordID;


        vm.items = null;


        //EVA 
        vm.schema = null;
        vm.form = null;
        vm.model = {};
        vm.attributeArray = null; //attr array from schemasvc 

        vm.$vehicleService = $vehicleService;
        vm.$UpgradeDealerService = $UpgradeDealerService;
        vm.$AddressesService = $AddressesService;
        vm.$scope = $scope;

        //EVA 
        vm.$evaEntityService = $evaEntityService;
        vm.$evaAttributeService = $evaAttributeService;
        vm.$schemaFormService = $schemaFormService;
        vm.$evaRecordService = $evaRecordService;
        vm.$dealerRecordService = $dealerRecordService;


        //-- this line to simulate inheritance

        //this is a wrapper for our small dependency on $scope
        vm.notify = vm.$vehicleService.getNotifier($scope);
        vm.onSubmit = _onSubmit;
        
        //this is like the sabio.startUp function
        init();

        function init() {
            if (vm.recordID) {
                console.log("This is an UPDATE");
                $evaRecordService.listValuesByRecordId(vm.recordID, _getValuesSuccess, _getValuesError);//get call; get values to popluate the  from 
                $evaEntityService.loadInfo(193, _entitiesLoaded, _entityAjaxErr);//get call; For the from itself
                //193; 

            }
            else {
                console.log("this is a NEW record");
                $evaEntityService.loadInfo(193, _entitiesLoaded, _entityAjaxErr);
                //Hardcode Entity number 193(Vehicle); 
            }
            
        }
        function _getValuesSuccess(data) {
            // console.log("Values get call = ", data.item.value);
            vm.notify(function () {
                vm.model = vm.$schemaFormService.valuesToModel(data.item.value);
            });
        };

        function _getValuesError() {
            console.log("error on Values GET call");
        };



        function _entitiesLoaded(data) {
            //if record load record
            //Convert data from ajax call to format that schemaForm can recognize
            vm.notify(function () {
                vm.schema = vm.$schemaFormService.entityToSchema(data.item);
                vm.form = vm.$schemaFormService.attributesToForm(data.item);
                vm.attributeArray = vm.$schemaFormService.attributeArray; //get the data 
                console.log("schema is = ", vm.schema);
                console.log("form is = ", vm.form);
            });

        };


        function _entityAjaxErr() {
            console.log("Error loading entities");
        };

        function _onSubmit(schemaForm) {
            var attrArray = vm.attributeArray;
            var payload = {
                EntityID: 193,
                WebsiteId: 1120
                //Values: [{ make: toyota }, {year:1994}]
            };
            payload.values = [];
            angular.forEach(attrArray[0], function (value, key) {//extra array? use index zero becuase target array is lovated there

                var valueObj = {};
                valueObj.attributeID = value.id;

                if (vm.model[value.slug])//still accessing object with [] "go find property attached to model that matches slug"
                {
                    console.log("model value", vm.model[value.slug]);


                    valueObj.valueString = vm.model[value.slug];

                    payload.values.push(valueObj);
                }

            });

            if (vm.recordID) {

                $evaRecordService.update(vm.recordID, payload, _onRecordUpdateSuccess, _onRecordUpdateError);
                //value update here
            }
            else {
                console.log("text monday",payload);
                $evaRecordService.add(payload, _onRecordSubmitSuccess, _onRecordSubmitError);
            };

           

        };

        function _onRecordSubmitSuccess(data) {
            console.log("Record has been sumbitted - POST");
            vm.$alertService.success("Record Submitted.");
            vm.recordID = data.item;
            var payload = {
                RecordID: data.item,

            }
            $dealerRecordService.addRecord(payload, _onAddRecordSuccess, _onaddRecordSubmitError);
            console.log("save recordID", payload);

        };
        function _onRecordSubmitError() {
            console.log("error on form submission - POST Error");
            vm.$alertService.error("Error");
        };
        function _onaddRecordSubmitError() {
            vm.$alertService.error("Add record error");
        }
        function _onAddRecordSuccess() {
            vm.$alertService.success("save RecordID");
        }

        //success handler for submitting form
        function _onRecordUpdateSuccess() {
            console.log("Record has been updated - PUT");
            vm.$alertService.success("Record Updated.");
            $location.path('/list');
        };

        //error handler for submitting form
        function _onRecordUpdateError() {
            console.log("error on record update - PUT Error");
            vm.$alertService.error("Error");
        };
       
       




    }
})();
