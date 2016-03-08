app.config(function($stateProvider) {

  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'js/login/login.html',
    controller: 'LoginCtrl',
            data: {
            adminOnly: false,
            authenticatedOnly: false
        },
  });

});

app.controller('LoginCtrl', function($scope, AuthService, $state) {
  $scope.login = {};

  $scope.error = null;

  $scope.sendLogin = function(loginInfo) {
    $scope.error = null;

    AuthService.login(loginInfo).then(function() {

      AuthService.getLoggedInUser()
        .then(function(user) {
          if(user.needsPasswordReset) $state.go('reset');
          else $state.go('home');
        });
    }).catch(function() {
      $scope.error = 'Invalid login credentials.';
    });
  };
});
