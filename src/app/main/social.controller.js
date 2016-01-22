(function() {
  'use strict';

  angular
    .module('epenguinAngularGulp')
    .controller('SocialCtrl', SocialCtrl);

  /** @ngInject */
  function SocialCtrl(social, $scope) {

    social.get().then(function (data) {
      $scope.social = data;
    });

    $scope.validate = function ( socialNetwork ) {
      if ( typeof socialNetwork !== 'undefined'  && socialNetwork != '' )
        return true;
      else
        return false;
    }

  }

})();
