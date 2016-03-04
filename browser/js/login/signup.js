app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/login/signup.html',
        controller: 'LoginCtrl'
    });

});
