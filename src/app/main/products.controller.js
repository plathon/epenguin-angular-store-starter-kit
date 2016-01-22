(function() {
  'use strict';

  angular
    .module('epenguinAngularGulp')
    .controller('ProductsCtrl', ProductsCtrl);

  /** @ngInject */
  function ProductsCtrl(page, api, product, category, image, $scope, $routeParams, $http, $location) {

    /**
    * page title service
    **/
    page.setTitle('Produtos');

    /**
    * settings
    **/
    $scope.category = typeof $routeParams.category !== 'undefined' ? $routeParams.category : '';
    $scope.search   = typeof $routeParams.search !== 'undefined' ? $routeParams.search : '';

    /**
    * pagination data
    **/
    $scope.page = 1;
    $scope.per  = 6;

    /**
    * is empty data on loadmore?
    **/
    $scope.isEmptyDataSet = false;

    //check existence of empty loadmore
    $scope.hasEmptyDataSet = function () {
      return ($scope.isEmptyDataSet) ? true : false;
    }

    product.list( $scope.page, $scope.per, $scope.category, $scope.search ).then(function (data) {
      $scope.products = data;
      //reset empty dataset var
      $scope.isEmptyDataSet = false;
    });

    //check existence of search filters
    $scope.hasFilter = function () {
      if ( $routeParams.category || $routeParams.search )
        return true;
      else
        return false;
    }

    //apply category to search param
    $scope.set_category = function (category) {
      //reset empty dataset var
      $scope.isEmptyDataSet = false;

      $location.path('/products').search({
        search: $routeParams.search,
        category: category
      });
    }

    //search method
    $scope.search_for = function (search) {
      //reset empty dataset var
      $scope.isEmptyDataSet = false;

      $location.path('/products').search({
        search: search,
        category: $routeParams.category
      });
    }

    //load more
    $scope.loadMore = function () {
      ++$scope.page;

      //retrive items with pagination settings attr
      product.list( $scope.page, $scope.per, $scope.category, $scope.search ).then(function(data){

        //load all items
        if ( data.length ) {

          for (var i = 0; i < data.length; i++){
            $scope.products.push( data[ i ] );
          }

        } else {
          $scope.isEmptyDataSet = true;
        }

      });
    }

    //has_products
    $scope.has_products = function () {
      if ( $scope.products && $scope.products.length )
        return true;
      else
        return false;
    }

    //show categories
    category.list().then(function(data){
      $scope.categories = data.data;
    });

    //check category list
    $scope.has_some_category = function () {
      if ( $scope.categories && $scope.categories.length )
        return true;
      else
        return false;
    }

  }

})();
