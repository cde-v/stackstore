app.factory('paymentFactory', function($http, $state, CartFactory, $rootScope){
	
	var payment = {

		checkout: function(info){
				return $http.post('api/cart/checkout/', info)
				.then(function(data){
					//payment success
					if(data.status === 200){
						Promise.resolve(CartFactory.clearCart())
						.then(res => $state.go('home'));
					}
				}, function(err){
					payment.error = err.data;
					$rootScope.$evalAsync();
					console.log('checkout error', err);
				});
		}
	};

	

	return payment;
});