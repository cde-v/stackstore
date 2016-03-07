app.factory('paymentFactory', function($http, $state, CartFactory, $rootScope){
	
	var payment = {

		checkout: function(info){
				return $http.post('api/cart/checkout/', info)
				.then(function(data){
					//payment success
					CartFactory.clearCart()
					$state.go('home')

				}, function(err){console.log(err)})
		}
	};

	

	return payment;
});