(function() {
  'use strict';

  angular
      .module('epenguinAngularGulp')
      .service('page', page);

  /** @ngInject */
  function page($rootScope) {

    return {
      setTitle: function (title) {
        $rootScope.subtitle = title;
      }
    }

  }

})();
