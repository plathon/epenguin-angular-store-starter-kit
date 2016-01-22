(function() {
  'use strict';

  angular
    .module('epenguinAngularGulp')
    .directive('productcard', productcard);

  /** @ngInject */
  function productcard(image, cart) {

    var directive = {
      restrict: 'E',
      templateUrl: "app/components/productcard/productcard.html",
      scope: {
        product: '='
      },
      replace: true,
      link: function postLink( scope ) {
        scope.image = image;
        scope.cart  = cart;
      }
    };

    return directive;

  }

})();
