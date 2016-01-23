(function() {
  'use strict';

  angular
    .module('epenguinAngularGulp')
    .controller('ProductCtrl', ProductCtrl);

  /** @ngInject */
  function ProductCtrl( image, api, product, $scope, $http, $routeParams, cart) {

    //page number
    $scope.page     = 1;
    $scope.per      = 2;

    //get product
    product.get( $routeParams.id ).then(function ( data ) {
      $scope.product  = data;
      $scope.gallery  = image.gallery( $scope.product.images, '100', '500' );
      product.related( $scope.product, $scope.page, $scope.per, $scope.product.id ).then(function (data) {
        $scope.related = data;
      });
    });

    //load more
    $scope.loadMore = function () {
      ++$scope.page;
      product.related( $scope.product, $scope.page, $scope.per, $scope.product.id ).then(function ( data ) {
        //load items and push to array
        for (var i = 0; i < data.length; i++){
            $scope.related.push( data[ i ] );
        }
      });
    }

    $scope.addToCart = function (item, qty) {
      cart.addToCart(item, qty);
    }

  }

})();
