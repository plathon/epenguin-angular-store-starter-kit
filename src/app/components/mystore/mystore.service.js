(function() {
  'use strict';

  angular
      .module('epenguinAngularGulp')
      .service('mystore', mystore);

  /** @ngInject */
  function mystore($http, api) {

    return {
      get: function () {
        var promise = $http.get( api.path( 'stores' ) ).then(function ( res ) {
          return res.data;
        });
        return promise;
      }
    }

  }

})();
