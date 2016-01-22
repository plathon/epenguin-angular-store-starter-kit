(function() {
  'use strict';

  angular
    .module('epenguinAngularGulp')
    .controller('UserCtrl', UserCtrl);

  /** @ngInject */
  function UserCtrl(page, user, $scope, Flash, store) {

    //page
    page.setTitle('Usuário');

    $scope.userFormData = {};

    //get user data
    user.get().then( function (data) {
      $scope.userFormData = data;
    }, function () {
      Flash.create( 'success', 'Não foi possível recuperar dados do usuário, tente novamente em instantes.', 'customAlert' );
    });

    //update password
    $scope.update = function (data) {
      user.update(data).then( function (data) {

        if ( data.error ) {
          var message = data.error;
          Flash.create( 'success', message, 'customAlert' );
        } else {

          var message = data.msg;
          Flash.create( 'success', message, 'customAlert' );

          user.get().then( function (data) {
            $scope.userFormData = data;
            store.set('userData', data);
          }, function () {
            Flash.create( 'success', 'Não foi possível recuperar dados do usuário, tente novamente em instantes.', 'customAlert' );
          });

        }

      });
    }

  }

})();
