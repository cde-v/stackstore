//use auth services?

app.factory('CartFactory', function($http, $localStorage, $rootScope, $state, AuthService) {
  var Cart = {
    auth: {},
    unauth: {}
  };

  var cartFactory = {};

  AuthService.getLoggedInUser().then(user => {
    if(user){
      setCartAuth(user.currentCart);
    }else{
      setCartUnauth();
    }

    $rootScope.$on('auth-login-success', function(event, data) {
      setCartAuth(user.currentCart);
    });

    $rootScope.$on('auth-logout-success', function(event, data) {
      setCartUnauth();
    });

  });

  var user;
  
  Cart.auth = {
  	cart: [],
    total: 0,
    fetch: function(cartId) {
    	//be able to take find id using user's cart ID
      return $http.get('/api/cart/' + cartId).then(res => {
        // angular.copy(res.data.items, Cart.auth.cart);
        Cart.auth.cart = res.data.items;
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
      return $http.delete('/api/cart/' + Cart.auth.id)
        .then(res => angular.copy([], cartFactory.cart));
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
    getTotal: function() {
      return cartFactory.cart.reduce(function(prev, curr, ind) {
        return prev + curr.product.price * curr.quantity;
      }, 0);
    }
  };

  function setCartUnauth(){
    Cart.unauth.fetch();
    angular.copy(Cart.unauth, cartFactory);
  }

  function setCartAuth(cart){
    Cart.auth.fetch(cart.toString()).then(res =>{
      Cart.auth.cart = res;
      angular.copy(Cart.auth, cartFactory);
      $localStorage.items.forEach(function(item){
        Cart.auth.addItem(item.product, item.size, item.quantity);
      });
      $localStorage.items = [];
    });
  }

  return cartFactory;
});
