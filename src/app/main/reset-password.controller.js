(function() {
  'use strict';

  angular
    .module('epenguinAngularGulp')
    .controller('ResetPasswordCtrl', ResetPasswordCtrl);

  /** @ngInject */
  function ResetPasswordCtrl( user, $scope, Flash, $routeParams, $location ) {

    $scope.reset_password = function (data) {
      data.token = $routeParams.token;
      user.resetPassword( data ).then(function (data) {
        if ( data.error ) {
          var message = data.error;
          Flash.create( 'success', message, 'customAlert' );
        } else {
          var message = data.msg;
          Flash.create( 'success', message, 'customAlert' );
          $location.path('/auth');
        }
      }, function () {
        Flash.create( 'success', 'Não foi possível alterar senha, tente novamene em instantes.', 'customAlert' );
      });
    }

  }

})();
