app.config(function ($stateProvider) {
    $stateProvider.state('productsList', {
        url: '/products',
        templateUrl: 'js/products/products.list.html',
        controller: 'productCtrl',
                data: {
            adminOnly: false,
            authenticatedOnly: false
        },
		resolve: {
			products: function (ProductList) {
				return ProductList.getAll();
			}
		}
    });
});

app.controller('productCtrl', function ($scope, $state, products, $rootScope, ProductList) {
	$scope.brands=Object.keys(_.groupBy(products, 'brand'));

	$scope.catalog = products;

	$scope.search={};
	$scope.brand = function(brand){
		$scope.search.brand = brand;
	}
	$scope.style = function(style){
		$scope.search.style = style;
	}
	
	$scope.order = function(predicate, rev) {
		$scope.reverse = (rev) ? $scope.reverse=true : $scope.reverse=false;
		$scope.predicate = predicate;
	};
	$scope.sizes = function(size){
		$scope.selectedSize=size;
	}
	$scope.selectedSize = null; 
	
	$rootScope.$on('$stateChange', scrollToTarget('1'));

	$scope.editProduct = {};
  $scope.editSizes = {};

  $scope.catalog = products;

  $scope.removeProduct = function(shoe) {
    ProductList.destroy(shoe.itemId)
      .then(function() {
        $state.reload();
      });
  };

  $scope.updateSizes = function(shoe) {
    var temp = shoe;
    ProductList.update(shoe.itemId, temp)
      .then(function() {
        $state.reload();
      });
  };

  $scope.updateProduct = function(shoe) {
    ProductList.update(shoe.itemId, $scope.editProduct[shoe.name])
      .then(function() {
        $state.reload();
      });
  };
})

app.filter('sizeSelect', function(){
	return function(input, size ){
		if(!size) return input
		return input.filter(function(el){
			if(el.sizes[size]) return true
		})
	}
})

app.factory('ProductList', function ($http) {

	return{
		getAll: function(){
			return $http.get('/api/products/')
			.then(function(products){
				return products.data
			})
		},
		getOne: function(product){
			return $http.get('/api/products/'+product)
			.then(function(product){
				// console.log(product.data)
				return product.data
			})
		},

		destroy: function(product){
			return $http.delete('/api/products/'+product)
			.then(function(product){
				return product.data
			})
		},

		add: function(product){
			return $http.post('/api/products/', product)
			.then(function(product){
				return product.data
			})
		},

		update: function(product, info){
			return $http.put('/api/products/'+ product, info)
			.then(function(product){
				return product.data
			})
		},

		getAvailSizes: function(shoe){
			var sizes=[];
			for(var key in shoe.sizes){
				if(shoe.sizes[key])sizes.push(key)
			};
			return sizes;
		},

		getReviews: function(shoe){
			return $http.get('/api/reviews/item/'+ shoe._id)
			.then(function(reviews){
				return reviews.data
			})
		}
	};
})



// app.directive('productCard', [function () {
// 	return {
// 		restrict: 'E',
// 		link: function (scope, iElement, iAttrs) {
			
// 		},
// 		template: ''
// 	}
// }])


