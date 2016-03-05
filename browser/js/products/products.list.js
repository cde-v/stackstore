app.config(function ($stateProvider) {
    $stateProvider.state('productsList', {
        url: '/products',
        templateUrl: 'js/products/products.list.html',
        controller: 'productCtrl',
		resolve: {
			products: function (ProductList) {
				return ProductList.getAll();
			}
		}
    });
});

app.controller('productCtrl', function ($scope, products) {
	$scope.catalog = products;
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
				console.log(product.data)
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


