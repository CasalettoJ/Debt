(function(){
    'use strict';
    angular
        .module('app')
        .controller('main',main);

    main.$inject = ['firebaseExtension'];

    function main(firebaseExtension){
        var vm = this;

        //Firebase connection
        var firebaseRef = new Firebase('https://jakesdebt.firebaseIO.com');
        vm.firebase = new firebaseExtension(firebaseRef);

        //Models
        vm.loading = true;
        vm.loadingAction = false;
        vm.newPayment = {date: '', amount: '', note: '', number: ''};
        vm.initialAmount = 2500.00;
        vm.paidAmount = 0.00;
        vm.remainingAmount = vm.initialAmount - vm.paidAmount;

        //Function Binding
        vm.addPayment = addPayment;
        vm.removePayment = removePayment;

        //Initialization
        initialize();

        //Function Definitions
        function initialize() {
            vm.firebase.$loaded()
                .then(function (data) {
                    console.log("firebase data loaded.");
                    updateAmounts();
                }, function (error) {
                    console.log("firebase data was not loaded: " + error);
                }).finally(function () {
                    vm.loading = false;
            });
        }

        function addPayment(){
            vm.loadingAction = true;
            if(vm.newPayment.amount && vm.newPayment.amount != ''){
                vm.newPayment.date = new Date().toDateString();
                vm.newPayment.number = vm.firebase.length+1;
                vm.firebase.$add(vm.newPayment)
                    .then(function(data){
                        console.log("Success adding item.");
                        updateAmounts();
                    }, function(error){
                        console.log("Error adding item: " + error);
                    }).finally(function(){
                        vm.loadingAction = false;
                });
            }
            vm.newPayment = {date: '', amount: '', note: ''};
        }

        function removePayment(item){
            vm.loadingAction = true;
            vm.firebase.$remove(item)
                .then(function(data){
                    console.log("Success removing item.");
                    updateAmounts();
                }, function(error){
                    console.log("Error removing item: " + error);
                }).finally(function(){
                    vm.loadingAction = false;
            });
        }

        function updateAmounts(){
            vm.paidAmount = vm.firebase.getTotalPaidAmount();
            vm.remainingAmount = vm.initialAmount - vm.paidAmount;
        }
    }

})();