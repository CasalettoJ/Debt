(function(){
    'use strict';

    angular
        .module('app')
        .factory('firebaseExtension',firebaseExtension);

    firebaseExtension.$inject = ['$firebaseArray'];

    function firebaseExtension($firebaseArray){
        return $firebaseArray.$extend({
            getTotalPaidAmount: getTotalPaidAmount,
            getHighestNumber: getHighestNumber
        });

        function getTotalPaidAmount(){
            var amount = 0;
            angular.forEach(this.$list, function(rec){
               amount += rec.amount;
            });
            return amount.toFixed(2);
        }

        function getHighestNumber(){
            var number = 0;
            angular.forEach(this.$list, function(rec){
                number = (rec.number > number) ? rec.number : number;
            });
            return number;
        }
    }
})();