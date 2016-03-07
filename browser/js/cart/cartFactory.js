//use auth services?

app.factory('CartFactory', function($http, $localStorage, $rootScope) {
  var Cart = {
    auth: {},
    unauth: {}
  };

  $rootScope.$storage = $localStorage.items;

  Cart.auth = {
  	cart: [],
    total: 0,
    fetch: function(cartId) {
    	//be able to take find id using user's cart ID
      return $http.get('/api/cart/' + cartId).then(res => {
        // angular.copy(res.data.items, Cart.auth.cart);
        Cart.auth.id = res.data._id;
        return res.data.items;
      });
    },
    getTotal: function() {
      Cart.auth.total = 0;
      if (Cart.auth.cart) {
        Cart.auth.cart.forEach(function(item) {
          Cart.auth.total += item.product.price * item.quantity;
        });
      }
      return Cart.auth.total;
    },
    addItem: function(product, size, qty) {
      return $http.put('/api/cart/' + Cart.auth.id + '/' + product._id.toString(), { size: size, quantity: qty })
        .then(res => {
	        angular.copy(res.data.items, Cart.auth.cart);
        });
    },
    editQty: function(id, size, qty) {
      return $http.put('/api/cart/' + Cart.auth.id + '/' + id, { size: size, quantity: qty })
        .then(res => {
	        angular.copy(res.data.items, Cart.auth.cart);
        });
    },
    removeItem: function(id, size) {
      return $http.delete('/api/cart/' + Cart.auth.id + '/' + id + '/' + size)
        .then(res => {
	        angular.copy(res.data.items, Cart.auth.cart);        	
        });
    },
    clearCart: function() {
      return $http.delete('/api/cart/' + Cart.auth.id);
    },
    checkout: function(shipAddress, billAddress) {
      return $http.post('/api/cart/' + Cart.auth.id + '/checkout', { shipAddress: shipAddress, billAddress: billAddress })
        .then(res => res.data);
    }
  };

  //add total and cart and addtotal to main object
  Cart.unauth = {
    total: 0,
    cart: [],
    fetch: function() {
      if (!$localStorage.items) $localStorage.items = [];
      Cart.unauth.cart = $localStorage.items;
      return Cart.unauth.cart;
    },
    addItem: function(product, size, qty) {
      Cart.unauth.cart.push({ product: product, size: size, quantity: qty });
      return Cart.unauth.cart;
    },
    removeItem: function(id, size) {
      //using index of to find index of property id
      var idx = -1;
      Cart.unauth.cart.forEach(function(item, ind) {
        if (item.product._id.toString() === id && item.size === size) idx = ind;
      });
      if (idx > -1) Cart.unauth.cart.splice(idx, 1);
      return Cart.unauth.cart;
    },
    editQty: function(id, size, qty) {
      if (!qty) Cart.unauth.removeItem(id, size);
      else {
        Cart.unauth.cart.forEach(function(item, ind) {
          if (item.product._id.toString() === id && item.size === size) item.quantity = qty;
        });
      }
      return Cart.unauth.cart;
    },
    clearCart: function() {
      Cart.unauth.cart = [];
    },
    checkout: function(shipAddress, billAddress) {
      return $http.post('/api/cart/checkout', {
          shipAddress: shipAddress,
          billAddress: billAddress,
          cart: Cart.unauth.cart
        })
        .then(res => res.data);
    },
    getTotal: function() {
      return Cart.unauth.cart.reduce(function(prev, curr, ind) {
        return prev + curr.product.price * curr.quantity;
      }, 0);
    }
  };

  var cartFactory = {};

  function setCartUnauth(){
  	Cart.unauth.fetch();
  	cartFactory = Cart.unauth;
  	// angular.copy(Cart.unauth, cartFactory);
  	console.log('unauth', cartFactory);
  }

  function setCartAuth(){
    Cart.auth.fetch("56d8a65596446dcb5eb7c221").then(res =>{
    	// cartFactory = Cart.auth;
	    angular.copy(Cart.auth, cartFactory);
	    console.log('auth', cartFactory);
    });
  };

  if(loggedIn) {
  	setCartAuth();
  }
  else {
  	setCartUnauth();
  }

  $rootScope.$on('auth-login-success', function(event, data) {
    setCartAuth();
  });

  $rootScope.$on('auth-logout-success', function(event, data) {
    setCartUnauth();
  });

  return cartFactory;
});
