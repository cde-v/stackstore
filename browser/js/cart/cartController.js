app.controller('CartController', function($rootScope, $scope, CartFactory, cart){
	angular.extend($scope, CartFactory);
	$scope.cart = cart;

	var login = true;
	$scope.toggleUser = function(){
		login = !login;
		if(login) $rootScope.$broadcast('auth-login-success');
		else $rootScope.$broadcast('auth-logout-success');
		$scope.cart = cart;
	}; d
});