//use auth services?

app.factory('CartFactory', function($http, $localStorage, $rootScope) {
  var Cart = {
    auth: {},
    unauth: {}
  };

  $rootScope.$storage = $localStorage.items;

  //if logged in, keep changes in database
  //if guest user, keep cart in localstorage
  Cart.auth = {
    total: 0,
    getTotal: function() {
      Cart.auth.cart.forEach(function(item) {
        Cart.auth.total += item.product.price * item.quantity;
      });
      return Cart.auth.total;
    },
    fetch: function(cartId) {
      return $http.get('/api/cart/' + id).then(res => {
        Cart.auth.cart = res.data.items;
        return Cart.auth.cart;
      });
    },
    addItem: function(product, size, qty, cartId) {
      return $http.put('/api/cart/' + cartId + '/' + product._id.toString(), { size: size, quantity: qty })
        .then(res => res.data);
    },
    editQty: function(id, size, qty, cartId) {
      return $http.put('/api/cart/' + cartId + '/' + id, { size: size, quantity: qty })
        .then(res => res.data);
    },
    removeItem: function(id, size, cartId) {
      return $http.delete('/api/cart/' + cartId + '/' + id + '/' + size)
        .then(res => res.data);
    },
    clearCart: function(cartId) {
      return $http.delete('/api/cart/' + cardId);
    },
    checkout: function(shipAddress, billAddress, cartId) {
      return $http.post('/api/cart/' + cartId + '/checkout', { shipAddress: shipAddress, billAddress: billAddress })
        .then(res => res.data);
    }
  };

  //add total and cart and addtotal to main object
  Cart.unauth = {
    total: 0,
    getTotal: function() {
      Cart.auth.cart.forEach(function(item) {
        Cart.auth.total += item.product.price * item.quantity;
      })
      return Cart.auth.total;
    },
    fetch: function() {
      if(!$localStorage.items) $localStorage.items = [];
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
    getTotal: function(){
    	return Cart.unauth.cart.reduce(function(prev,curr){
    		return prev + curr.product.price;
    	},0);
    }
  };
 
 var cartFactory = Cart.unauth;
 cartFactory.fetch();
  //for testing
//   Cart.unauth.cart = [{product:{
// _id: "56d8c118cfa354676b011dd7",
// itemId: "ADYB350B",
// brand: "Adidas",
// style: "sneaker",
// name: "Yeezy Boost 350 Black",
// price: 500,
// sizes: {
// 6: 3,
// 7: 0,
// 8: 2,
// 9: 4,
// 10: 5,
// 11: 9,
// 12: 3,
// 13: 0,
// 14: 1
// },
// description: "Made of pure gold",
// __v: 0,
// tags: [
// "yeezy",
// "black",
// "sneaker"
// ],
// prevOrders: 2,
// images: [
// "img/product/Yeezy-Boost-350-b.jpg",
// "img2"
// ]
// }, quantity:1, size:5},{product:{
// _id: "56d8c118cfa354676b011dd8",
// itemId: "ADYB350T",
// brand: "Adidas",
// style: "sneaker",
// name: "Yeezy Boost 350 Tan",
// price: 500,
// sizes: {
// 6: 3,
// 7: 0,
// 8: 2,
// 9: 4,
// 10: 5,
// 11: 9,
// 12: 3,
// 13: 0,
// 14: 1
// },
// description: "Made of pure gold",
// __v: 0,
// tags: [
// "yeezy",
// "tan",
// "sneaker"
// ],
// prevOrders: 2,
// images: [
// "img/product/Yeezy-Boost-350-t.jpg",
// "img2"
// ]
// }, quantity:1, size:5}, {product:{
// _id: "56d8c118cfa354676b011dd9",
// itemId: "ADYB350W",
// brand: "Adidas",
// style: "sneaker",
// name: "Yeezy Boost 350 White",
// price: 500,
// sizes: {
// 6: 3,
// 7: 0,
// 8: 2,
// 9: 4,
// 10: 5,
// 11: 9,
// 12: 3,
// 13: 0,
// 14: 1
// },
// description: "Made of pure gold",
// __v: 0,
// tags: [
// "yeezy",
// "white",
// "sneaker"
// ],
// prevOrders: 2,
// images: [
// "img/product/Yeezy-Boost-350-w.jpg",
// "img2"
// ]
// }, quantity:1, size:5}, {product:{
// _id: "56d8c118cfa354676b011dda",
// itemId: "ADYB750B",
// brand: "Adidas",
// style: "sneaker",
// name: "Yeezy Boost 750 Black",
// price: 800,
// sizes: {
// 6: 3,
// 7: 0,
// 8: 2,
// 9: 4,
// 10: 5,
// 11: 9,
// 12: 3,
// 13: 0,
// 14: 1
// },
// description: "Made of pure gold",
// __v: 0,
// tags: [
// "yeezy",
// "black",
// "sneaker"
// ],
// prevOrders: 2,
// images: [
// "img/product/Yeezy-Boost-750-b.jpg",
// "img2"
// ]
// }, quantity:1, size:5}];
  var loggedIn;

  $rootScope.$on('auth-login-success', function(event, data) {
    loggedIn = true;
    console.log(loggedIn);
    cartFactory = Cart.auth;
    cartFactory.fetch();
  });

  $rootScope.$on('auth-session-timeout', function(event, data) {
    loggedIn = false;
    cartFactory = Cart.unauth;
    cartFactory.fetch();
  });

  return cartFactory;
});
