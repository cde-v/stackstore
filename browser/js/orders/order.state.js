'use strict';

app.config(function ($stateProvider) {

  $stateProvider.state('order', {
    url: '/:id',
    templateUrl: '/js/orders/order.detail.html',
    controller: 'OrderController',
    resolve: {
      theOrder: function (OrderFactory, $stateParams) {
        return OrderFactory.fetchById($stateParams.id);
      }
    }
  });

});
