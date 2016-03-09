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
				return ProductList.getOne($stateParams.itemId)
				.then(function(shoe){
						var available=false;
						for(var size in shoe.sizes){
							if (shoe.sizes[size]>0) available=true;  
						}
						shoe.available=available;
						return shoe
				});
			},
			reviews: function(ProductList, shoe){
				return ProductList.getReviews(shoe)
			}
		}
    });
});

app.controller('productDetailCtrl', function ($scope, shoe, AuthService, ProductList, $state, CartFactory, reviews, ReviewFactory) {
	reviews.forEach(function(review){
			review.stars = [];
			for (var i = 0; i < review.rating; i++) {
				review.stars.push(true)
			}
	})

	$scope.reviews = reviews;
	$scope.rating = null;
	$scope.body = '';

	$scope.setRating=function(rating){
		$scope.rating = rating;
		$scope.product = shoe._id
		 AuthService.getLoggedInUser()
		 .then(user=> $scope.author=user._id);

	}

	$scope.writeReview = function(){
		if($scope.author && $scope.rating && $scope.body){
			ReviewFactory.add($scope.author, $scope.rating, $scope.body, $scope.product)
		}
	}


	$scope.shoe = shoe;
	$scope.sizes = ProductList.getAvailSizes($scope.shoe);
	$scope.selSize = 'Size';
	$scope.selectSize = function(size){
		$scope.selSize = size;
	}

	$scope.addItem = CartFactory.addItem;


})

app.factory('ReviewFactory', function ($http, $state) {
	return {
		add:function(author, rating, body, product){
			var data = {
				author:author,
				rating:rating,
				body:body,
				product:product
			}
			// console.log(data)
			return $http.post('api/reviews', data)
			.then(data=>{
				$state.reload()
				// productDetailCtrl.reviews.push(data)
			})
		}
	};
})

app.directive('review', function(){
	return {
    	restrict: 'E',
    	templateUrl: 'js/products/review.html'
	}
})