app.config(function($stateProvider) {

  $stateProvider.state('reset', {
    url: '/resetPW',
    templateUrl: 'js/login/reset.html',
    controller: 'resetCtrl'
  });

});

app.controller('resetCtrl', function($scope, AuthService, ResetFactory, $state) {

  $scope.updatePW = function() {
    AuthService.getLoggedInUser().then(function(user) {
      ResetFactory.updatePW($scope.ResetForm, user).then(function(res) {
        $scope.error = null;
        console.log("user", user);
        console.log($scope.ResetForm);
        AuthService.login({ email: user.email, password: $scope.ResetForm.password })
          .then(function() {
            delete $scope.ResetForm;
            $state.go('home');
          }).catch(function() {
            $scope.error = 'Invalid login credentials.';
          });
      });
    });
  };
});

app.factory('ResetFactory', function($http) {
  return {
    updatePW: function(newPW, user) {
      return $http.put('/api/users/updatePW/' + user._id, {
        password: newPW.password
      }).then(function(res) {
        return res.data;
      });
    }
  };
});
