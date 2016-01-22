(function() {
  'use strict';

  angular
      .module('epenguinAngularGulp')
      .service('user', user);

  /** @ngInject */
  function user(api, $http) {

    return {
      get: function () {
        var promise = $http.get( api.path( 'users.json' ) ).then( function( res ) {
          return res.data;
        } );
        return promise;
      },
      update: function (data) {
        var promise = $http.post( api.path( 'users.json' ), { user: data } ).then( function( res ) {
          return res.data;
        } );
        return promise;
      },
      forgotPassword: function (data) {
        var promise = $http.post( api.path( 'users/forgot_password.json' ), { email: data } ).then( function( res ) {
          return res.data;
        } );
        return promise;
      },
      resetPassword: function (data) {
        var promise = $http.post( api.path( 'users/reset_password.json' ), { token: data } ).then( function( res ) {
          return res.data;
        } );
        return promise;
      }
    }

  }

})();
