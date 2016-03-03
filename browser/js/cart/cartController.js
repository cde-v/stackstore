app.controller('CartController', function($scope, $localStorage, CartFactory){
	$scope.$storage = $localStorage;
	$scope.shipping = 0;


});