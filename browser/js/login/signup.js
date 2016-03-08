app.config(function($stateProvider) {

  $stateProvider.state('signup', {
    url: '/signup',
    templateUrl: 'js/login/signup.html',
    controller: 'signupCtrl',
            data: {
            adminOnly: false,
            authenticatedOnly: false
        },
  });

});

app.controller('signupCtrl', function($scope, AuthService, SignupFactory, $state) {

  $scope.createUser = function() {

    SignupFactory.createUser($scope.SignupForm).then(function(res) {
      $scope.error = null;
      AuthService.login($scope.SignupForm).then(function() {
        delete $scope.SignupForm;
        $state.go('home');
      }).catch(function() {
        $scope.error = 'Invalid login credentials.';
      });
    });
  };
});

app.factory('SignupFactory', function($http) {
  return {
    createUser: function(newUserData) {
      console.log(newUserData);
      return $http.post('/api/users/signup', {
        firstName: newUserData.firstName,
        lastName: newUserData.lastName,
        email: newUserData.email,
        password: newUserData.password
      }).then(function(res) {
        return res.data;
      });
    }
  };
});
