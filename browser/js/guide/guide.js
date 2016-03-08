app.config(function ($stateProvider) {
    $stateProvider.state('guide', {
        url: '/guide',
        templateUrl: 'js/guide/guide.html',
                data: {
            adminOnly: false,
            authenticatedOnly: false
        },
        
    });
});