(function() {
  'use strict';

  angular
    .module('epenguinAngularGulp')
    .controller('CartCtrl', CartCtrl);

  /** @ngInject */
  function CartCtrl(page, image, cart, $scope) {

    //page
    page.setTitle('Carrinho de Compras');

    $scope.cartTotal = function () {
      return cart.cartTotal();
    }

    $scope.cartOff = function () {
      return cart.cartOff();
    }

    $scope.cartSubTotal = function () {
      return cart.cartSubTotal();
    }

    $scope.hasCartItems = function () {
      return cart.hasCartItems();
    }

    $scope.totalCartItems = function () {
      return cart.totalCartItems() || 0;
    }

    $scope.getCartItems = function () {
      return cart.getCartItems();
    }

    $scope.removeItemFromCart = function (i) {
      cart.removeItemFromCart(i);
    }

    $scope.emptyCart = function () {
      cart.emptyCart();
    }

    $scope.changeCartItemQty = function ( index, qty ) {
      var cartItems = $scope.getCartItems();
      if ( !cart.changeCartItemQty( index, qty ) )
        return cartItems[index].inventory;
      else
        return qty;
    }

    $scope.isEmptyCart = function () {
      if ( cart.totalCartItems > 0 )
        return false;
      else
        return true;
    }

    $scope.image = image;

  }

})();
