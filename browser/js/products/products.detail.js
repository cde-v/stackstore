app.config(function ($stateProvider) {
    $stateProvider.state('productsDetail', {
        url: '/products/:itemId',
        templateUrl: 'js/products/products.detail.html',
        controller: 'productDetailCtrl',
		resolve: {
			shoe: function (ProductList, $stateParams) {
				return ProductList.getOne($stateParams.itemId);
			}
		}
    });
});


app.controller('productDetailCtrl', function ($scope, shoe, ProductList, $state, CartFactory) {

	$scope.shoe = shoe;
	$scope.sizes = ProductList.getAvailSizes($scope.shoe);
	$scope.selSize = 'Size';
	$scope.selectSize = function(size){
		$scope.selSize = size;
	}
	// $scope.test=function(){
	// 	if($scope.selSize!=='Size'){
	// 		$state.go('cart') 
	// 		console.log('added to cart')
	// 		$scope.selSize = 'Size'
	// 	}
	// }
	$scope.addItem = CartFactory.addItem;
})

