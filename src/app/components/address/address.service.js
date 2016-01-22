(function() {
  'use strict';

  angular
      .module('epenguinAngularGulp')
      .service('address', address);

  /** @ngInject */
  function address(api, $http) {

    //var addresses = [];

    return {
      get: function () {
        var promise = $http.get( api.path( 'addresses.json' ) ).then( function( res ) {
          return res.data;
        } );
        return promise;
      },
      getAddressByZipcode: function ( zipcode ) {
        var promise = $http.get( api.path( 'addresses/addresszipcode' ), {
          params : {
            zipcode: zipcode
          }
        } ).then( function( res ) {
          return res.data[0];
        } );
        return promise;
      },
      getShippingPrice: function (id) {
        var promise = $http.get( api.path( 'shipping_price.json?address=' + id ) ).then( function( res ) {
          return res.data;
        } );
        return promise;
      },
      save: function ( data ) {
        var promise = $http.post( api.path( 'addresses.json' ), {address: data} ).then( function( res ) {
          return res.data;
        } );
        return promise;
      },
      remove: function (id) {
        var promise = $http.delete( api.path( 'addresses/' + id ) ).then( function( res ) {
          return res.data;
        } );
        return promise;
      }
    }

  }

})();
