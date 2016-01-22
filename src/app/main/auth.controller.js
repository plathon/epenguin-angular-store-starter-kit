(function() {
  'use strict';

  angular
    .module('epenguinAngularGulp')
    .controller('AuthCtrl', AuthCtrl);

  /** @ngInject */
  function AuthCtrl(user, page, api, $scope, $http, $location, store, Flash) {

    //page
    page.setTitle('Autenticação');

    //login method
    $scope.signin = function (paramsData) {

      $http.get( api.path('users/sign_in'), {
        params : paramsData
      }).then(function( res ) {

        store.set( 'jwt', res.data.id_token );

        /**
        * Get And Set logged use data
        **/
        user.get().then(function ( data ) {
          store.set('userData', data);
        });

        $location.path('/');

      }, function ( err ) {
        Flash.create( 'success', 'Não foi possível acessar, verifique os dados digitados.', 'customAlert' );
      });
    }

  }

})();
