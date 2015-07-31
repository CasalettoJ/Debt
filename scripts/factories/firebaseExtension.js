(function(){
    'use strict';

    angular
        .module('app')
        .factory('firebaseExtension',firebaseExtension);

    firebaseExtension.$inject = ['$firebaseArray'];

    function firebaseExtension($firebaseArray){
        return $firebaseArray.$extend({
           getTotalPaidAmount: getTotalPaidAmount
        });

        function getTotalPaidAmount(){
            var amount = 0;
            angular.forEach(this.$list, function(rec){
               amount += rec.amount;
            });
            return amount.toFixed(2);
        }
    }
})();