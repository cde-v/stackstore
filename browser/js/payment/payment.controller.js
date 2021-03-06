	Stripe.setPublishableKey('pk_test_OAYbGBOJ1PSBsUJBf8We5KHP');
app.controller("paymentController", function($scope, paymentFactory, CartFactory){
	$scope.ccn = null;
	$scope.cvc = null;
	$scope.exp = null;

	$scope.paymentError = null;
	$scope.errorMsg = function(){
		return paymentFactory.error || $scope.paymentError;
	}

	$scope.checkout = function(){
		var creditCard = {
			number: $scope.ccn,
			cvc: $scope.cvc,
			exp_month: $scope.exp.slice(0, 2),
			exp_year: $scope.exp.slice(3)
		}

	  	var info = {
	  		shipAddress: $scope.shipAddress,
	  		billAddress: $scope.shipAddress
  		}

		// console.log(creditCard, info)
		Stripe.card.createToken(creditCard, function(status, response) {
			if (response.error) {
		   		$scope.paymentError = "Invalid Card Information";
		   		$scope.$evalAsync();
			} else {
	  			info.token = response.id;
	  			info.cart = CartFactory.cart;
	  			paymentFactory.checkout(info);
	  		}
		})
	}

});