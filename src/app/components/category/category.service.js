(function() {
  'use strict';

  angular
      .module('epenguinAngularGulp')
      .service('category', category);

  /** @ngInject */
  function category(api, $http, promiseCache) {

    return {
      list: function () {
        return promiseCache({
          promise: function() {
            return $http.get( api.path('categories.json') );
          },
          ttl: -1
        });
      }
    }

  }

})();
