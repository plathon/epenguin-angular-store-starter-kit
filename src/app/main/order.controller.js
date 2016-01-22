(function() {
  'use strict';

  angular
    .module('epenguinAngularGulp')
    .controller('OrderCtrl', OrderCtrl);

  /** @ngInject */
  function OrderCtrl(page, order, $scope) {

    //page
    page.setTitle('Pedidos');

    //get user orders
    order.get().then(function (data) {
      $scope.orders = data;
    });

    //get a single user orders
    $scope.showOrder = function (id) {
      order.show(id).then(function (data) {
        $scope.current_order = data;
      });
    }

    $scope.has_orders = function () {
      if ( $scope.orders ) {
        if ( $scope.orders.length > 0 )
          return true;
        else
          return false;
      } else
        return false;
    }

    $scope.has_current = function () {
      if ( !$scope.current_order )
        return false;
      else
        return true;
    }

    $scope.close_current = function () {
      $scope.current_order = null;
    }

  }

})();
