app.config(function ($stateProvider) {
    $stateProvider.state('payment', {
        url: '/payment',
        templateUrl: 'js/payment/payment.html',
                data: {
            adminOnly: false,
            authenticatedOnly: false
        },
        controller:'paymentController'
    });
});