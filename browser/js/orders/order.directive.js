'use strict';

app.directive('order', function(OrderFactory) {
  return {
    restrict: 'E',
    templateUrl: '/js/orders/order.detail.html',
    scope: {
    	order: '='
    }
  };
});
