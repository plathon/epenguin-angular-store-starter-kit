(function() {
  'use strict';

  angular
    .module('epenguinAngularGulp')
    .controller('AddressCtrl', AddressCtrl);

  /** @ngInject */
  function AddressCtrl(api, $scope, $http, address, Flash) {

    //NAV variable
    $scope.addressFormData = {};
    $scope.address_tab = false;
    $scope.current_address = false;

    //get user addresses
    address.get().then(function (data) {
      $scope.addresses = data;
    }, function (err) {
      Flash.create( 'success', 'Ocorreu um erro ao tentar recuperar os enderecos, tente novamente em instantes.', 'customAlert' );
    });

    //write address by zipcode
    $scope.getAddressByZipcode = function (zipcode) {
      address.getAddressByZipcode( zipcode ).then(function ( data ) {
        $scope.current_address = data;
        //static
        $scope.addressFormData.city         = data.id_cidade;
        $scope.addressFormData.neighborhood = data.id_bairro;
        $scope.addressFormData.state        = data.uf;
        //dynamic
        $scope.addressFormData.country    = 'Brasil';
        $scope.addressFormData.state_name = $scope.current_address.uf;
        $scope.addressFormData.city_name  = $scope.current_address.cidade;
        $scope.addressFormData.address    = $scope.current_address.tipo_logradouro + " " + $scope.current_address.logradouro;
        $scope.addressFormData.neighborhood_name = $scope.current_address.bairro;
      }, function () {
        Flash.create( 'success', 'Não foi possível recuperar endereço, tente novamente em instantes.', 'customAlert' );
      } );
    }

    //delete address
    $scope.removeAddress = function (i, id) {
      address.remove( id ).then(function (data) {
        var message = data.msg;
        Flash.create( 'success', message, 'customAlert' );
        $scope.addresses.splice( i, 1 );
      }, function () {
        Flash.create( 'success', 'Não foi possível remover endereço, tente novamente em instantes.', 'customAlert' );
      });
    }

    //insert address
    $scope.saveAddress = function (paramsData) {
      //send request to server
      address.save(paramsData).then(function (data) {

        var message = data.msg;
        Flash.create( 'success', message, 'customAlert' );

        $scope.addressFormData = {};
        $scope.address_tab = false;
        $scope.current_address = false;

        address.get().then(function (data) {
          $scope.addresses = data;
        }, function () {
          Flash.create( 'success', 'Não foi possível recuperar endereço, tente novamente em instantes.', 'customAlert' );
        });

      }, function () {
        Flash.create( 'success', 'Não foi possível cadastrar endereço, tente novamente em instantes.', 'customAlert' );
      });
    }

    //has_address
    $scope.has_address = function () {
      if ( $scope.addresses ) {
        if ( $scope.addresses.length > 0 )
          return true;
        else
          return false;
      }
    }

  }

})();
