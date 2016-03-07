app.config(function($stateProvider) {
  $stateProvider.state('adminUsersList', {
    url: '/admin/users',
    templateUrl: 'js/admin/admin.users.list.html',
    controller: 'adminUserCtrl',
    resolve: {
      users: function(UserList) {
        return UserList.getAll();
      }
    }
  });
});

app.controller('adminUserCtrl', function($scope, $state, users, UserList) {
  console.log(users);

  $scope.users = users;

  $scope.toggleAdmin = user => UserList.toggleAdmin(user);

  $scope.toggleNeedsPasswordReset = user => UserList.toggleNeedsPasswordReset(user);

  $scope.removeUser = user => UserList.destroy(user);

});

app.factory('UserList', function($http, $state) {

  return {
    getAll: function() {
      return $http.get('/api/users/')
        .then(function(users) {
          return users.data;
        });
    },
    destroy: function(user) {
      return $http.delete('/api/users/' + user._id)
        .then(function(user) {
          $state.reload();
          return user.data;
        });
    },
    toggleAdmin: function(user) {
      return $http.put('/api/users/toggleAdmin/' + user._id)
        .then(function(product) {
          $state.reload();
          return product.data;
        });
    },
    toggleNeedsPasswordReset: function(user) {
      return $http.put('/api/users/toggleNeedsPasswordReset/' + user._id)
        .then(function(product) {
          $state.reload();
          return product.data;
        });
    }
  };
});
