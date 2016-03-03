//localStorage

app.factory('CartFactory', function($http, $localStorage){
	var Cart = {
		auth: {},
		unauth: {}
	};
	//if logged in, keep changes in database
	//if guest user, keep cart in localstorage
	Cart.auth.total = 0;

	Cart.auth.getTotal = function(){
		Cart.auth.cart.forEach(function(item){
			Cart.auth.total += item.product.price * item.quantity;
		});
		return Cart.auth.total;
	};

	Cart.auth.fetch = function(cartId){
		return $http.get('/api/cart/' + id).then(res => {
			Cart.auth.cart = res.data.items;
			return Cart.auth.cart;
		});
	};

	//simplify?
	Cart.auth.addItem = function(product, size, qty, cartId){
		return $http.put('/api/cart/' + cartId + '/' + product._id.toString(), {size:size, quantity: qty})
			.then(res => res.data);
	};

	Cart.auth.editQty = function(id, size, qty, cartId){
		return $http.put('/api/cart/' + cartId + '/' + id, {size:size, quantity: qty})
			.then(res => res.data);
	}

	Cart.auth.removeItem = function(id, size, cartId){
		return $http.delete('/api/cart/' + cartId + '/' + id + '/' + size)
			.then(res => res.data);
	};

	Cart.auth.clearCart = function(cartId){
		return $http.delete('/api/cart/' + cardId);
	};

	Cart.auth.checkout = function(shipAddress, billAddress, cartId){
		return $http.post('/api/cart/' + cartId + '/checkout', {shipAddress:shipAddress, billAddress:billAddress})
			.then(res => res.data);
	};

	//add total and cart and addtotal to main object
	Cart.unauth = {
		total:0,
		getTotal: function(){
			Cart.auth.cart.forEach(function(item){
				Cart.auth.total += item.product.price * item.quantity;
			})
			return Cart.auth.total;
		},
		fetch: function(){
			Cart.unauth.cart = $localStorage.items || [];
			return Cart.unauth.cart;
		},
		addItem: function(product, size, qty){
			Cart.unauth.cart.push({product:product, size:size, quantity:qty});
			return Cart.unauth.cart;
		},
		removeItem:function(id, size){
			//using index of to find index of property id
			var idx = -1;
			Cart.unauth.cart.forEach(function(item, ind){
				if(item.product._id.toString() === id && item.size === size) idx = ind;
			});
			if(idx > -1) Cart.auth.cart.splice(idx, 1);
			return Cart.unauth.cart;
		},
		editQty:function(id, size, qty){
			if(!qty) Cart.unauth.removeItem(id, size);
			else{
				Cart.unauth.cart.forEach(function(item, ind){
					if(item.product._id.toString() === id && item.size === size) item.quantity = qty;
				});
			}
			return Cart.unauth.cart;
		},
		clearCart:function(){
			Cart.unauth.cart = [];
		},
		checkout:function(shipAddress, billAddress){
			return $http.post('/api/cart/checkout', {
				shipAddress:shipAddress,
				billAddress:billAddress,
				cart: Cart.unauth.cart})
			.then(res => res.data);
		}

	};

	return Cart;
	

	//toggle functionality MAYBE? on login/logout
	//fetch cart
	//edit item quantity
	//removeItem
	//clearCart
	//checkout
	//keep track of cart


});