(function() {
  'use strict';

  angular
      .module('epenguinAngularGulp')
      .service('checkout', checkout);

  /** @ngInject */
  function checkout($http, api) {

    return {
      done: function (data) {
        var promise = $http.post( api.path( 'orders.json' ), { order: data } ).then(function ( res ) {
          return res.data
        });
        return promise;
      }
    }

  }

})();
