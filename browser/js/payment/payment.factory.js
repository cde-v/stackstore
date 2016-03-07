app.factory('paymentFactory', function($http, $state, CartFactory, AuthService, $rootScope){
	
	var payment = {

		checkout: function(info){
			AuthService.getLoggedInUser()
			.then(function(user){
				if(user){
					return $http.post('checkout/'+user.cart, info)
					.then(function(data){
						//payment success
						$state.go('home')

					}, function(err){console.log(err)})
				}
			})
		}

	};

	

	return payment;
});