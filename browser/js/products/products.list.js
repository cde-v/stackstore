app.config(function ($stateProvider) {
    $stateProvider.state('productsList', {
        url: '/products',
        templateUrl: 'js/products/products.list.html'
    });
});