(function() {
  'use strict';

  angular
    .module('epenguinAngularGulp')
    .directive('timepicker', timepicker);

  /** @ngInject */
  function timepicker(delivery) {

    var directive = {
      restrict: 'E',
      templateUrl: "app/components/timepicker/timepicker.html",
      scope: {
        product: '='
      },
      replace: true,
      link: function postLink( scope, element, $document ) {

        delivery.get().then(function (data) {

          $document.find('#timepicker').pickatime({
            // Translations and clear button
            clear: 'Limpar',
            //date format
            format: 'H:i',
            // Time limits
            min: data.has_production ? [data.work_from, 0] : undefined,
            max: data.has_production ? [data.work_to, 0] : undefined,
            // Time intervals
            interval: 60
          });

        });

      }
    }

    return directive;

  }

})();
