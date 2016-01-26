(function() {
  'use strict';

  angular
      .module('epenguinAngularGulp')
      .service('cart', cart);

  /** @ngInject */
  function cart(store, Flash) {

    return {
      /**
      * add to cart
      **/
      addToCart: function (item, qty, options) {
        //default values
        options = typeof options !== 'undefined' ? options : [];
        qty     = typeof qty !== 'undefined' ? parseInt(qty) : 1;
        var message = '';
        //qty products
        if ( qty > item.quantity || qty <= 0 ) {
          message = 'Não há quantidade em estoque suficiente para suprir a quantidade solicitada. Quantidade Máxima: ' + item.quantity + ' produto(s)';
          Flash.create('success', message, 'customAlert');
          return false;
        }
        //check cart is nul and set data
        var cart = store.get( 'cart' );
        if ( !cart ) {
          cart = { items: [{
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
            images: item.images,
            quantity: qty,
            inventory: item.quantity,
            options: options
          }],
            off: 0,
            sub_total: item.price,
            total: item.price,
            total_items: qty,
            shipping: 0
          };
          store.set( 'cart', cart )
          message = 'Produto adicionado no carrinho com sucesso. <br/><a href="#/cart">Click para Finalizar Compra</a>';
          Flash.create('success', message, 'customAlert');
        } else {
          if ( !this._itemAlreadyExists( item.id ) )
          {
            cart.items.push( {
              id: item.id,
              name: item.name,
              description: item.description,
              price: item.price,
              images: item.images,
              quantity: qty,
              inventory: item.quantity,
              options: options
            } );
            //cart.sub_total   = cart.sub_total + item.price;
            //cart.total       = cart.total + item.price;
            //cart.total_items = cart.total_items + qty;
            store.set( 'cart', cart )
            message = 'Produto adicionado no carrinho com sucesso. <br><a href="#/cart">Click para Finalizar Compra</a>';
            Flash.create('success', message, 'customAlert');
          } else {
            message = 'O produto Selecionado já encontra-se no carrinho. <br><a href="#/cart">Click para Finalizar Compra</a>';
            Flash.create('success', message, 'customAlert');
          }
        }
        this._updateCartQty();
        this._updatePrices();
      },
      //check item exists on cart
      _itemAlreadyExists: function (id) {
        var cart    = store.get( 'cart' );
        if ( cart )
        {
          var cartLen = cart.items.length;
          for ( var i = 0; i < cartLen; i++ ) {
            if ( cart.items[ i ].id == id )
              return true;
          }
        }
        return false;
      },
      //private - update cart quantity
      _updateCartQty: function () {
        var cart    = store.get( 'cart' );
        if ( cart )
        {
          var cartLen = cart.items.length;
          var currentQty = 0;
          for ( var i = 0; i < cartLen; i++ ) {
            currentQty += parseInt( cart.items[ i ].quantity );
          }
          cart.total_items = currentQty;
          store.set( 'cart', cart );
        }
      },
      //private - update cart price
      _updatePrices: function () {
        var cart = store.get( 'cart' );
        var cartLen = cart.items.length;
        var currentprice = 0;
        for ( var i = 0; i < cartLen; i++ ) {
          currentprice += parseFloat( cart.items[ i ].price * cart.items[ i ].quantity );
        }
        cart.total     = currentprice;
        cart.sub_total = currentprice;
        store.set( 'cart', cart );
      },
      //get cart items
      getCartItems: function () {
        if ( !store.get( 'cart' ) )
          return [];
        else
          return store.get( 'cart' ).items;
      },
      //change item qty in shopcart
      changeCartItemQty: function ( index, qty ) {
        var cart = store.get( 'cart' );
        if ( isNaN(qty) || qty > cart.items[ index ].inventory || qty <= 0 ) {
          var message = 'Não há quantidade em estoque suficiente para suprir a quantidade solicitada. Quantidade Máxima: ' + cart.items[ index ].inventory + ' produto(s)';
          Flash.create('success', message, 'customAlert');
          return false;
        }
        cart.items[index].quantity = qty;
        store.set( 'cart', cart );
        this._updateCartQty();
        this._updatePrices();
        return true;
      },
      //remove item from shopcart
      removeItemFromCart: function (index) {
        var cart = store.get( 'cart' );
        cart.total_items -= cart.items[index].quantity;
        cart.items.splice( index, 1 );
        store.set( 'cart', cart );
        this._updateCartQty();
        this._updatePrices();
      },
      //remove item from shopcart
      totalCartItems: function () {
        var cart = store.get( 'cart' );
        if ( cart )
        {
          if (!cart.total_items)
            return 0;
          else
            return cart.total_items
        }
      },
      //remove item from shopcart
      hasCartItems: function () {
        var cart = store.get( 'cart' );
        if (cart && cart.items.length > 0)
          return true;
        else
          return false;
      },
      cartTotal: function () {
        var cart = store.get( 'cart' );
        if (!cart)
          return 0;
        else
          return cart.total
      },
      cartSubTotal: function () {
        var cart = store.get( 'cart' );
        if (!cart)
          return 0;
        else
          return cart.sub_total
      },
      cartOff: function () {
        var cart = store.get( 'cart' );
        if (!cart)
          return 0;
        else
          return cart.off
      },
      //clear shopcart
      emptyCart: function () {
        store.remove( 'cart' );
      }

    }

  }

})();
