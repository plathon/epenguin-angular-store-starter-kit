(function() {
  'use strict';

  angular
    .module('epenguinAngularGulp')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/product/:id?', {
        templateUrl: 'app/main/product.html',
        controller: 'ProductCtrl',
        controllerAs: 'product'
      })
      .when('/products', {
        templateUrl: 'app/main/products.html',
        controller: 'ProductsCtrl',
        controllerAs: 'products'
      })
      .when('/cart', {
        templateUrl: 'app/main/cart.html',
        controller: 'CartCtrl',
        controllerAs: 'cart'
      })
      .when('/register', {
        templateUrl: 'app/main/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
      })
      .when('/auth', {
        templateUrl: 'app/main/auth.html',
        controller: 'AuthCtrl',
        controllerAs: 'auth'
      })
      .when('/forgot-password', {
        templateUrl: 'app/main/forgot-password.html',
        controller: 'ForgotPasswordCtrl',
        controllerAs: 'ForgotPassword'
      })
      .when('/reset-password', {
        templateUrl: 'app/main/reset-password.html',
        controller: 'ResetPasswordCtrl',
        controllerAs: 'ResetPassword'
      })
      .when('/account', {
        templateUrl: 'app/main/account.html',
        data: {
          requiresLogin: true
        }
      })
      .when('/address', {
        templateUrl: 'app/main/address.html',
        controller: 'AddressCtrl',
        controllerAs: 'address',
        data: {
          requiresLogin: true
        }
      })
      .when('/user', {
        templateUrl: 'app/main/user.html',
        controller: 'UserCtrl',
        controllerAs: 'user',
        data: {
          requiresLogin: true
        }
      })
      .when('/order', {
        templateUrl: 'app/main/order.html',
        controller: 'OrderCtrl',
        controllerAs: 'order',
        data: {
          requiresLogin: true
        }
      })
      .when('/checkout', {
        templateUrl: 'app/main/checkout.html',
        controller: 'CheckoutCtrl',
        controllerAs: 'checkout',
        data: {
          requiresLogin: true
        }
      })
      .when('/history', {
        templateUrl: 'app/main/history.html',
        data: {
          requiresLogin: false
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
