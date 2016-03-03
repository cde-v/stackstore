//localStorage

app.factory('CartFactory', function($http){
	var Cart = {};

	//if logged in, keep changes in database
	//if guest user, keep cart in localstorage

	Cart.fetch = function(){
		return $http.get('/').then(res => res.data);
	};

	Cart.addItem = function(id, size, qty){
		return $http.put('/' + id, {size:size, quantity: qty})
			.then(res => res.data);
	};

	Cart.removeItem = function(id, size){
		return $http.delete('/' + id + '/' + size)
			.then(res => res.data);
	};

	Cart.clearCart = function(){
		return $http.delete('/');
	};

	Cart.checkout = function(shipAddress, billAddress){
		return $http.post('/checkout', {shipAddress:shipAddress, billAddress:billAddress})
			.then(res => res.data);
	};

	return Cart;

});