app.controller('OrderController', function ($scope, OrderFactory) {
	

	// $scope.getOrderById = function(id) {
 //        return OrderFactory.fetchById()
       
 //      };

      $scope.getAllOrders = function(){
      	return OrderFactory.fetchAll()
      	 .then(function(orders){
        	$scope.orders = orders;
        })
      }

      $scope.getAllOrders();
})