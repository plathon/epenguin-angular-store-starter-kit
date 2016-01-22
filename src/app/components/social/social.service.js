(function() {
  'use strict';

  angular
      .module('epenguinAngularGulp')
      .service('social', social);

  /** @ngInject */
  function social(api, $http) {

    return {
      get: function () {
        var promise = $http.get( api.path('socials.json') ).then(function (res) {
          return res.data;
        });
        return promise;
      }
    }

  }

})();
