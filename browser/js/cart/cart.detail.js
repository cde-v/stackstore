app.config(function ($stateProvider) {
    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.detail.html',
        controller: 'CartController',
        resolve: {
        	cart: function(CartFactory){
        		return CartFactory.fetch("56d8a65596446dcb5eb7c221");
        	}
        }
    });
});