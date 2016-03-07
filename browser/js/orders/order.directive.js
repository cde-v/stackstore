'use strict';

app.directive('order', function(OrderFactory) {
  return {
    restrict: 'E',
    templateUrl: '/js/orders/order.detail.html',
    scope: {
    	order: '='
    },
    link: function(scope) {

      scope.hasShipped = function(order) {
        return order.status === 'Shipped';
      };

      scope.getStatus = function(order) {
        return order.status;
      }      
    }
  };
});
