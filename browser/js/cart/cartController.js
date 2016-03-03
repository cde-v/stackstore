app.controller('CartController', function($scope, AuthService, $localStorage, CartFactory){
	$scope.$storage = $localStorage;
	var loggedIn = AuthService.isAuthenticated(); //set based on user

	//function that runs on load and on login/logout
	if(!loggedIn){
		angular.extend($scope, CartFactory.auth);
	}else{
		angular.extend($scope, CartFactory.auth);
	}
});