(function() {
  'use strict';

  angular
    .module('epenguinAngularGulp')
    .controller('ForgotPasswordCtrl', ForgotPasswordCtrl);

  /** @ngInject */
  function ForgotPasswordCtrl( user, $scope, Flash) {

    $scope.email = '';

    $scope.send_password_instructions = function (email) {
      if ( email ) {
        user.forgotPassword( email ).then(function (data) {
          if ( data.error ) {
            var message = data.error;
            Flash.create( 'success', message, 'customAlert' );
          } else {
            var message = data.msg;
            Flash.create( 'success', message, 'customAlert' );
          }
        });
      }
    }

  }

})();
