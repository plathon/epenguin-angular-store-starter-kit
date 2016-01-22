(function() {
  'use strict';

  angular
    .module('epenguinAngularGulp')
    .config(config);

  /** @ngInject */
  function config($routeProvider, $httpProvider, jwtInterceptorProvider, cfpLoadingBarProvider, $pgCheckoutProvider) {

    $pgCheckoutProvider.setEncryptKey( /* Encrypt Key */ );

    cfpLoadingBarProvider.latencyThreshold = 0;

    //inject jwt interceptor to return the current token
    jwtInterceptorProvider.tokenGetter = function(store) {
      return store.get('jwt');
    }

    $httpProvider.interceptors.push('jwtInterceptor');

    //set store id to header
    $httpProvider.defaults.headers.common['storetoken'] = '1';

  }

})();
