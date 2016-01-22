(function() {
  'use strict';

  angular
      .module('epenguinAngularGulp')
      .service('payment', payment);

  /** @ngInject */
  function payment(api, $http) {

    return {
      get: function () {
        var promise = $http.get( api.path('payments') ).then(function (res) {
          return res.data;
        });
        return promise;
      },

      pay: function ( data ) {
        var promise = $http.post( api.path( 'orders/pay' ), data ).then(function (res) {
          return res.data;
        });
        return promise;
      }
    }

  }

})();
