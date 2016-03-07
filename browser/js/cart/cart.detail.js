app.config(function ($stateProvider) {
    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.detail.html',
        controller: 'CartController'
        // resolve: {
        //     cart: function(CartFactory){
        //         return CartFactory.fetch("56ddb0cc24a858528b16acc6");
        //     }
        // }
    });
});

app.controller('CartController', function($rootScope, $scope, CartFactory){
    $scope.CartFactory = CartFactory;
    // $scope.CartFactory.cart = cart;

    var login = true;
    $scope.toggleUser = function(){
        login = !login;
        if(login) $rootScope.$broadcast('auth-login-success');
        else $rootScope.$broadcast('auth-logout-success');
    };
});