(function() {
  'use strict';

  angular
    .module('epenguinAngularGulp')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(page, $scope, $http, api, Flash) {
    //page
    page.setTitle('Principal');
    //title
    $scope.title = "Home";
    $scope.subTitle = "home page products";
    //bestseller
    var productsbestsellerUrl = api.path( 'product/bestseller.json' );
    $http.get( productsbestsellerUrl ).then(function(res){
      $scope.bestsellers = res.data;
    });
    //news
    var newProductsUrl = api.path( 'product/news.json' );
    $http.get( newProductsUrl ).then(function(res){
      $scope.newProducts = res.data;
    });
    //indicated
    var indicatedProductsUrl = api.path( 'product/indicated.json' );
    $http.get( indicatedProductsUrl ).then(function(res){
      $scope.indicatedProducts = res.data;
    });
  }
})();
