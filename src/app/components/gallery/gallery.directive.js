(function() {
  'use strict';

  angular
    .module('epenguinAngularGulp')
    .directive('gallery', gallery);

  /** @ngInject */
  function gallery() {

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/gallery/gallery.html',
      scope: {
        gallery: '='
      },
      replace: true,
      link: function postLink($scope, $document) {
        setTimeout(function() {

          var mainImg = $document.find('.main-image').find( 'img' );
          mainImg.attr('src', $scope.gallery.main[ 0 ]);

          $document.find('.thumbnails').find('.thumbnail').find('img').each(function ( i ) {

            $document.find( this ).click(function () {
              mainImg.attr( 'src', $scope.gallery.main[ i ] );
            });

          });
        },1000);
      }
    };

    return directive;

  }

})();
