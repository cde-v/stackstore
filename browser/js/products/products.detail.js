app.config(function ($stateProvider) {
    $stateProvider.state('productsDetail', {
        url: '/products/:itemId',
        templateUrl: 'js/products/products.detail.html',
        controller: 'productDetailCtrl',
                data: {
            adminOnly: false,
            authenticatedOnly: false
        },
		resolve: {
			shoe: function (ProductList, $stateParams) {
				return ProductList.getOne($stateParams.itemId);
			},
			reviews: function(ProductList, shoe){
				return ProductList.getReviews(shoe)
			}
		}
    });
});


app.controller('productDetailCtrl', function ($scope, shoe, ProductList, $state, CartFactory, reviews) {
	$scope.reviews = reviews;
	$scope.shoe = shoe;
	$scope.sizes = ProductList.getAvailSizes($scope.shoe);
	$scope.selSize = 'Size';
	$scope.selectSize = function(size){
		$scope.selSize = size;
	}
	$scope.addItem = CartFactory.addItem;
})

