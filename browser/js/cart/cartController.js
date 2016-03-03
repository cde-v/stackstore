app.controller('CartController', function($scope, AuthService, $localStorage, CartFactory){
	$scope.$storage = $localStorage;
	$scope.shipping = 0;
	var loggedIn = AuthService.isAuthenticated(); //set based on user

	//function that runs on load and on login/logout
	if(!loggedIn){
		if(!$scope.$storage) $scope.$storage = {items: []};

		$scope.cart = $scope.$storage.items;

		$scope.addItem = function(productId, size, quantity){
			$scope.$storage.items.push({
				product: productId,
				size: size,
				quantity: quantity
			});
		};

		$scope.removeItem = function(productId, size){
			var idx = -1;
			$scope.$storage.items.forEach(function(item, ind){
				if(item.product === id && item.size === size){
					idx = ind;
				}
			});

			if(idx > -1) $scope.$storage.items.splice(idx, 1);
		};

		$scope.clearCart = function(){
			$scope.$storage.items = [];
		};

		$scope.checkout = function(){
			//send addresses and info; 
		};
	}else{
		angular.extend($scope, CartFactory);
		$scope.fetch().then(cart => $scope.cart = cart.items);
	}
});