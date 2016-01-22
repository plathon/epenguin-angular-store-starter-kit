(function() {
  'use strict';

  angular
      .module('epenguinAngularGulp')
      .service('order', order);

  /** @ngInject */
  function order(api, $http) {

    return {
      get: function () {
        var promise = $http.get( api.path( 'orders.json' ) ).then(function( res ) {
          return res.data;
        });
        return promise;
      },
      show: function (id) {
        var promise = $http.get( api.path( 'orders/'+ id +'.json' ) ).then(function( res ) {
          return res.data;
        });
        return promise;
      }
    }

  }

})();
