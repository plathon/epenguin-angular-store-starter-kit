(function() {
  'use strict';

  angular
      .module('epenguinAngularGulp')
      .service('image', image);

  /** @ngInject */
  function image() {

    var imageRemoteBaseUrl = "https://s3.amazonaws.com/epenguin-images-vresized/";

    return {
      hasImage: function (images) {
        if ( images && images.length > 0 ) {
          return true;
        } else {
          return false;
        }
      },
      url: function (images, type) {
        if ( images && images.length > 0 ) {
          type = typeof type !== 'undefined' ? type : '300';
          return imageRemoteBaseUrl + type + "_store/" + images[0].image_id;
        } else {
          return false;
        }
      },
      gallery: function ( images, thumb, main ) {
        if ( images && images.length > 0 ) {
          thumb = typeof thumb !== 'undefined' ? thumb : '300';
          main  = typeof main !== 'undefined' ? main : '500';
          var gLen = images.length;
          var gallery = {
            thumb: [],
            main:  []
          };
          for ( var i = 0; i < gLen; i++ ) {
            gallery.thumb.push( imageRemoteBaseUrl + thumb + "_store/"  + images[i].image_id );
            gallery.main.push( imageRemoteBaseUrl + main + "_store/"  + images[i].image_id );
          }
          return gallery;
        } else {
          return false;
        }
      }
    }

  }

})();
