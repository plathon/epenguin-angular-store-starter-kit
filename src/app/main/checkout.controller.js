(function() {
  'use strict';

  angular
    .module('epenguinAngularGulp')
    .controller('CheckoutCtrl', CheckoutCtrl);

  /** @ngInject */
  function CheckoutCtrl($pgCheckout, api, payment, delivery, address, checkout, cart, $scope, $location, ngDialog, store, Flash, mystore, SweetAlert) {
    //checkout form data
    $scope.checkoutFromData = {};

    //will shipp product?
    $scope.checkoutFromData.willShip = true;

    //not shipping and no payment
    $scope.checkoutFromData.localPayment = false;

    //insert and select address form/tab
    $scope.addressFormData = {};
    $scope.address_tab = false;
    $scope.current_address = false;

    //the costumer will take product
    $scope.checkoutFromData.iWillRetriveTheProduct = false;

    //address selected and ship price
    $scope.checkoutFromData.address = null;
    $scope.shipping_price = null;

    //user address
    address.get().then(function (data) {
      $scope.addresses = data;
    });

    //delivery data info
    delivery.get().then(function (data) {
      $scope.deliveryData = data;
    });

    //payment data info
    payment.get().then(function (data) {
      $scope.paymentData = data;
    });

    //pass cart to view
    $scope.cart = cart;

    $scope.getShippingPrice = function ( data ) {
      address.getShippingPrice( data ).then(function (data) {
        if ( data.error ) {
          var message = data.error;
          Flash.create( 'success', message, 'customAlert' );
          $scope.shipping_price = null;
        } else if (data) {
          var message = "Endereço Selecionado.";
          Flash.create( 'success', message, 'customAlert' );
          $scope.shipping_price = data;
        }
      });
    }

    $scope.getTotal = function () {
      if ( $scope.shipping_price )
        return cart.cartTotal() + $scope.shipping_price;
      else
        return cart.cartTotal();
    }

    //write address by zipcode
    $scope.getAddressByZipcode = function (zipcode) {
      address.getAddressByZipcode( zipcode ).then(function ( data ) {
        $scope.current_address = data;
        //static
        $scope.addressFormData.city         = data.id_cidade;
        $scope.addressFormData.neighborhood = data.id_bairro;
        $scope.addressFormData.state        = data.uf;
        //dynamic
        $scope.addressFormData.country = 'Brasil';
        $scope.addressFormData.state_name = $scope.current_address.uf;
        $scope.addressFormData.city_name  = $scope.current_address.cidade;
        $scope.addressFormData.address    = $scope.current_address.tipo_logradouro + " " + $scope.current_address.logradouro;
        $scope.addressFormData.neighborhood_name = $scope.current_address.bairro;
      } );
    }

    $scope.address_tab_toogle = function () {
      $scope.address_tab = !$scope.address_tab;
    }

    $scope.saveAddress = function (paramsData) {
      address.save(paramsData).then(function (data) {
        var message = data.msg;
        Flash.create( 'success', message, 'customAlert' );

        $scope.addressFormData = {};
        $scope.address_tab = false;
        $scope.current_address = false;

        address.get().then(function (data) {
          $scope.addresses = data;
        });
      });
    }

    $scope.openCheckout = function () {
      ngDialog.open({
        template: 'views/cart.html'
      });
    }

    $scope.iWillRetriveTheProductHanddling = function () {
      if ($scope.iWillRetriveTheProduct)
        return true;
      else
        return false;
    }

    /**
    * Do Checkout
    **/

    $scope.doCheckout = function ( data ) {

      mystore.get().then(function ( storeData ) {
        if ( storeData.available ) {

          //create date
          data.cart = cart.getCartItems();
          data.date = {}
          data.date.date     = $('#datepicker').val();
          data.date.time     = $('#timepicker').val();

          checkout.done( data ).then(function ( checkoutRessdata ) {
            if ( checkoutRessdata.error ) {

              var message = checkoutRessdata.error;
              Flash.create( 'success', message, 'customAlert' );

            } else {
              if ( !data.localPayment ) {

                //do payment
                var formatedAmount = checkoutRessdata.amount.toFixed(2).replace(',','').replace('.','');
                var params = {
                  "customerData" :false,
                  "amount": formatedAmount,
                  "createToken": "true",
                  "postback": "",
                  "paymentMethods": "credit_card"
                }

                //open checkout-payment modal
                $pgCheckout.open( params, function ( checkoutData ) {
                  payment.pay({ token: checkoutData.token, amount: formatedAmount, order: checkoutRessdata.order }).then(function ( data ) {
                    if (data.error) {
                      Flash.create( 'success', data.error, 'customAlert' );
                      return false;
                    }
                    SweetAlert.swal("Sucesso!", "Compra concluida com sucesso, utilize o painel do clinte para acompanhar o status do seu pedido.", "success");
                    cart.emptyCart();
                    $location.path('/');
                  });
                });

              } else {

                SweetAlert.swal("Sucesso!", "Compra concluida com sucesso, utilize o painel do clinte para acompanhar o status do seu pedido.", "success");
                cart.emptyCart();
                $location.path('/');

              }
            }
          });

        } else {
          SweetAlert.swal("Atenção", "Não estamos efetivando vendas no momento.", "error");
        }
      });

    }

  }

})();
