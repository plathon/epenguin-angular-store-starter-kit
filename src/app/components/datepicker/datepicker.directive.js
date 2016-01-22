(function() {
  'use strict';

  angular
    .module('epenguinAngularGulp')
    .directive('datepicker', datepicker);

  /** @ngInject */
  function datepicker(delivery) {

    var directive = {
      restrict: 'E',
      templateUrl: "app/components/datepicker/datepicker.html",
      scope: {
        product: '='
      },
      replace: true,
      link: function postLink( scope, $document ) {

        delivery.get().then(function (data) {

          var productionTime = 0;
          if ( data.has_production ) {
            productionTime = data.production_time / 24;
          }

          //shipping days reference
          var shippingDays = [];
          //days of week store shipp
          if ( !data.sunday )
            shippingDays.push( 1 );
          if ( !data.monday )
            shippingDays.push( 2 );
          if ( !data.tuesday )
            shippingDays.push( 3 );
          if ( !data.wednesday )
            shippingDays.push( 4 );
          if ( !data.thursday )
            shippingDays.push( 5 );
          if ( !data.friday )
            shippingDays.push( 6 );
          if ( !data.saturday )
            shippingDays.push( 7 );

          $document.find('#datepicker').pickadate({
            monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Augosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            weekdaysFull: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
            weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
            showMonthsShort: undefined,
            showWeekdaysFull: undefined,
            // Buttons
            today: 'Hoje',
            clear: 'Limpar',
            close: 'Fechar',
            // Accessibility labels
            labelMonthNext: 'Póximo Mês',
            labelMonthPrev: 'Mês anterior',
            labelMonthSelect: 'Selecione um Mês',
            labelYearSelect: 'Selecione um Ano',
            // Formats
            format: 'd/m/yyyy',
            // Date limits
            min: new Date( (new Date()).setDate( (new Date()).getDate()+productionTime)),
            max: undefined,
            //desabled dates
            disable: shippingDays
          });

        });

      }
    };

    return directive;

  }

})();
