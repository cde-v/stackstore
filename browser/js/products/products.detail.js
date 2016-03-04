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

app.controller('productDetailCtrl', function ($scope, shoe, ProductList) {
	$scope.shoe = shoe;
	$scope.sizes = ProductList.getAvailSizes($scope.shoe)
	$scope.selSize = 'Size';
	$scope.selectSize = function(size){
		$scope.selSize = size;
	}
	$scope.addItem=function(itemid, size, qty, cartId){
		console.log(itemid, size, qty, cartId);
	}
})

