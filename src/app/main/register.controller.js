(function() {
  'use strict';

  angular
    .module('epenguinAngularGulp')
    .controller('RegisterCtrl', RegisterCtrl);

  /** @ngInject */
  function RegisterCtrl(page, api, $scope, $http, $location, store, ngDialog, terms, Flash) {

    //page
    page.setTitle('Cadastro');

    //register method
    $scope.signup = function (paramsData) {
      $http.post( api.path('users/sign_up'), {user: paramsData.user} ).then(function( res ) {
        store.set( 'jwt', res.data.id_token );
        $location.path('/');
      }, function ( err ) {
        Flash.create( 'success', 'Não foi possível cadastrar, verifique os dados digitados.', 'customAlert' );
      });
    }

    //terms and cond open dialog
    $scope.terms_and_cond = function () {
      terms.get().then(function ( data ) {
        ngDialog.open({
          template: '<h2 style="text-align: center">Termos e Condições</h2><br>' + '<p>' + data.terms_and_cond + '</p>',
          plain: true
        })
      });
    }

  }

})();
