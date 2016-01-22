(function() {
  'use strict';

  angular
    .module('epenguinAngularGulp')
    .run(runBlock);

  /** @ngInject */
  function runBlock($rootScope, $location, jwtHelper, store, user, mystore, SweetAlert) {

    mystore.get().then(function ( data ) {
      if ( !data.available ) {
        SweetAlert.swal("Atenção", "Não estamos efetivando vendas no momento.", "error");
      }
    });

    $rootScope.title = "Store";
    $rootScope.subtitle = "Main";
    $rootScope.userData = null;
    /**
    * logout!
    **/
    $rootScope.logout = function () {
      store.remove('jwt');
      store.remove('userData');
      $location.path('/');
    }

    /**
    * Get logged use data
    **/
    $rootScope.getUserData = function () {
      return store.get('userData');
    }

    /**
    * is logout?
    **/
    $rootScope.isLogged = function () {
      if ( !store.get('jwt') || jwtHelper.isTokenExpired( store.get( 'jwt' ) ) ) {
        store.remove('userData');
        return false;
      } else
        return true;
    }

    /**
    * check if has token and teken expires
    * redirect to login (auth) page
    **/
    $rootScope.$on('$routeChangeStart', function(e, to) {

      if (!store.get('jwt') || jwtHelper.isTokenExpired(store.get('jwt'))) {
        if (to.data && to.data.requiresLogin) {
          e.preventDefault();
          $location.path('/auth');
        }
      }

    });

  }

})();
