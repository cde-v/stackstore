app.controller('OrderController', function($scope, OrderFactory, AuthService) {

	$scope.getAllOrders = function() {
		return OrderFactory.fetchAll()
		.then(function(orders) {
			$scope.orders = orders;
		});
	};
	
	AuthService.getLoggedInUser().then(function(user){
		$scope.user = user;
	});

	$scope.getTotal = function(order) {
		$scope.total = 0;
		order.items.forEach(function(item) {
			$scope.total += item.price * item.quantity;
		});
		return $scope.total;
	};

	$scope.status = [
	'Created',
	'Processing',
	'Shipped',
	'Fulfilled',
	'Canceled'
	];

	$scope.changeStatus = function(order, status){	
		OrderFactory.updateOrder(order._id, status);
		order.status = status; 
	};

	$scope.getAllOrders();

})
