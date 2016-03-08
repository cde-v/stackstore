app.config(function ($stateProvider) {
    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.detail.html',
        data: {
            adminOnly: false,
            authenticatedOnly: true
        },
        controller: 'CartController'
    });
});

app.controller('CartController', function($rootScope, $scope, CartFactory){
    $scope.CartFactory = CartFactory;

    var login = true;
    $scope.toggleUser = function(){
        login = !login;
        if(login) $rootScope.$broadcast('auth-login-success');
        else $rootScope.$broadcast('auth-logout-success');
    };
});