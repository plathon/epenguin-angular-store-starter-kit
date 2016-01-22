(function() {
  'use strict';

  angular
      .module('epenguinAngularGulp')
      .service('delivery', delivery);

  /** @ngInject */
  function delivery(api, $http) {

    return {
      get: function () {
        var promise = $http.get( api.path( 'deliveries.json' ) ).then( function( res ) {
          return res.data;
        } );
        return promise;
      }
    }

  }

})();
