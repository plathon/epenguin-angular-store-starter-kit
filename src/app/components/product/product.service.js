(function() {
  'use strict';

  angular
      .module('epenguinAngularGulp')
      .service('product', product);

  /** @ngInject */
  function product($http, api) {

    return {
      list: function (page, pages, category, search) {
        page     = typeof page !== 'undefined' ? page : 1;
        pages    = typeof pages !== 'undefined' ? pages : 2;
        category = typeof category !== 'undefined' ? category : '';
        search   = typeof search !== 'undefined' ? search : '';
        var promise = $http.get( api.path('products.json?page=' + page + '&pages=' + pages + '&search=' + search + '&category=' + category ) ).then(function (res) {
          return res.data
        });
        return promise;
      },
      get: function (product_id) {
        var promise = $http.get( api.path( 'products/' + product_id + '.json' ) ).then(function( res ){
          return res.data;
        });
        return promise;
      },
      related: function ( product, page, pages, except ) {
        page   = typeof page !== 'undefined' ? page : 1;
        pages  = typeof pages !== 'undefined' ? pages : 2;
        except = typeof except !== 'undefined' ? except : 2;
        if ( product.categories.length > 0 ) {
          var promise = $http.get( api.path('products.json?category=' + product.categories[0].id + '&page=' + page + '&pages=' + pages + '&except=' + except ) ).then(function ( res ) {
            return res.data;
          });
          return promise;
        } else
          return [];
      }
    }

  }

})();
