app.config(function ($stateProvider) {
    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.detail.html',
        controller: 'CartController',
        resolve: {
            cart: function(CartFactory){
                return CartFactory.fetch("56dc33fddd900c7b81cc1156");
            }
        }
    });
});

app.controller('CartController', function($rootScope, $scope, CartFactory, cart){
    $scope.CartFactory = CartFactory;
    $scope.CartFactory.cart = cart;
    var login = true;
    $scope.toggleUser = function(){
        login = !login;
        if(login) $rootScope.$broadcast('auth-login-success');
        else $rootScope.$broadcast('auth-logout-success');
    };
});