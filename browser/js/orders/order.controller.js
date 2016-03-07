app.controller('OrderController', function($scope, OrderFactory) {

  $scope.getAllOrders = function() {
    return OrderFactory.fetchAll()
      .then(function(orders) {
        $scope.orders = orders;
      });
  };

  $scope.getTotal = function(order) {
    $scope.total = 0;
    order.items.forEach(function(item) {
      $scope.total += item.price * item.quantity;
    });
    return $scope.total;
  };
  $scope.getAllOrders();
})
