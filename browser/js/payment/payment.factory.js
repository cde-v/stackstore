app.factory('paymentFactory', function($http, $state, CartFactory, $rootScope){
	
	var payment = {

		checkout: function(info){
				return $http.post('api/cart/checkout/', info)
				.then(function(data){
					//payment success
					if(data.status === 200){
						CartFactory.clearCart();
						$state.go('home');
					}

				}, function(err){
					payment.error = err.data;
					$rootScope.$evalAsyn();
					console.log('err', err);
				});
		}
	};

	

	return payment;
});