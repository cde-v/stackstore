//use auth services?

app.factory('CartFactory', function($http, $localStorage, $rootScope, $state, AuthService) {
  var Cart = {
    auth: {},
    unauth: {}
  };

  var cartFactory = {};
  var loggedIn;

  AuthService.getLoggedInUser().then(user => {
    if(user){
      loggedIn = true;
      setCartAuth(user.currentCart);
    }else{
      loggedIn = false;
      setCartUnauth();
    }
  });

  var user;
  
  Cart.auth = {
  	cart: [],
    total: 0,
    fetch: function(cartId) {
    	//be able to take find id using user's cart ID
      return $http.get('/api/cart/' + cartId).then(res => {
        angular.copy(res.data.items, Cart.auth.cart);
        Cart.auth.id = res.data._id;
        return res.data.items;
      });
    },
    getTotal: function() {
      var total = 0;
      if (cartFactory.cart) {
        cartFactory.cart.forEach(function(item) {
          total += item.product.price * item.quantity;
        });
      }
      return total;
    },
    addItem: function(product, size, qty) {
      console.log('product', product);
      return $http.put('/api/cart/' + Cart.auth.id + '/' + product._id.toString(), { size: size, quantity: qty })
        .then(res => {
	        angular.copy(res.data.items, cartFactory.cart);
          $state.go('cart');
        });
    },
    editQty: function(id, size, qty) {
      return $http.put('/api/cart/' + Cart.auth.id + '/' + id, { size: size, quantity: qty })
        .then(res => {
	        angular.copy(res.data.items, cartFactory.cart);
        });
    },
    removeItem: function(id, size) {
      return $http.delete('/api/cart/' + Cart.auth.id + '/' + id + '/' + size)
        .then(res => {
	        angular.copy(res.data.items, cartFactory.cart);        	
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

  Cart.unauth = {
    total: 0,
    cart: [],
    fetch: function() {
      if (!$localStorage.items) $localStorage.items = [];
      Cart.unauth.cart = $localStorage.items;
      return Promise.resolve(cartFactory.cart);
    },
    addItem: function(product, size, qty) {
      var found = false;
      if (!qty) Cart.unauth.removeItem(product._id, size);
      else {
        Cart.unauth.cart.forEach(function(item, ind) {
          if (item.product._id === product._id && item.size === size) {
            item.quantity += qty;
            found = true;
          }
        });
      }
      if(!found) Cart.unauth.cart.push({product:product, size: size, quantity:qty});
      angular.copy(Cart.unauth.cart, cartFactory.cart);         
      $state.go('cart');
    },
    removeItem: function(id, size) {
      var idx = -1;
      Cart.unauth.cart.forEach(function(item, ind) {
        if (item.product._id.toString() === id && item.size === size) idx = ind;
      });
      if (idx > -1) Cart.unauth.cart.splice(idx, 1);
      angular.copy(Cart.unauth.cart, cartFactory.cart);         
      return cartFactory.cart;
    },
    editQty: function(id, size, qty) {
      if (!qty) Cart.unauth.removeItem(id, size);
      else {
        Cart.unauth.cart.forEach(function(item, ind) {
          if (item.product._id.toString() === id && item.size === size) item.quantity = qty;
        });
      }
      angular.copy(Cart.unauth.cart, cartFactory.cart);         
      return cartFactory.cart;
    },
    clearCart: function() {
      Cart.unauth.cart = [];
      angular.copy(Cart.unauth.cart, cartFactory.cart);
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
      return cartFactory.cart.reduce(function(prev, curr, ind) {
        return prev + curr.product.price * curr.quantity;
      }, 0);
    }
  };

  $rootScope.$on('auth-login-success', function(event, data) {
    setCartAuth();
    loggedIn = true;
  });

  $rootScope.$on('auth-logout-success', function(event, data) {
    setCartUnauth();
    loggedIn = false;
  });

  function setCartUnauth(){
    Cart.unauth.fetch();
    angular.copy(Cart.unauth, cartFactory);
    console.log('unauth', cartFactory);
  }

  function setCartAuth(cart){
    console.log(cart);
    Cart.auth.fetch(cart.toString()).then(res =>{
      angular.copy(Cart.auth, cartFactory);
      console.log('auth', cartFactory);
    });
  }

  return cartFactory;
});
