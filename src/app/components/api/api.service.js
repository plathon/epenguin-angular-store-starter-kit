(function() {
  'use strict';

  angular
      .module('epenguinAngularGulp')
      .service('api', api);

  /** @ngInject */
  function api() {

    var apiPath = 'http://192.168.25.7:3001/api/v1/';
    var domain  = 'http://192.168.25.7:3001/';

    return {
      path: function (path) {
        return  apiPath + path;
      },
      domain: function (path) {
        return domain + path;
      }
    }

  }

})();
