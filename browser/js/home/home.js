app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
                data: {
            adminOnly: false,
            authenticatedOnly: false
        },
    });
});



