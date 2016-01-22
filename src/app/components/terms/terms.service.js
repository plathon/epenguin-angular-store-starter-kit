(function() {
  'use strict';

  angular
      .module('epenguinAngularGulp')
      .service('terms', terms);

  /** @ngInject */
  function terms(api, $http) {

    return {
      get: function () {
        var promise = $http.get( api.path('terms.json') ).then(function (res) {
          return res.data;
        });
        return promise;
      }
    }

  }

})();
