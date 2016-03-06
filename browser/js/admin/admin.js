app.config(function ($stateProvider) {
    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: 'js/admin/admin.html',
        resolve: {
        	orders: function(OrderFactory){
        		return OrderFactory.fetchAll();
        	}
        },
        controller: function($scope, orders){
        	$scope.orders = orders;
        	console.log(orders);
        }
    });
});