app.config(function($stateProvider) {
  $stateProvider.state('adminUsersList', {
    url: '/admin/users',
    templateUrl: 'js/admin/admin.users.list.html',
    controller: 'adminUserCtrl',
    data: {
      adminOnly: true,
      authenticatedOnly: true
    },
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
  var factory = {
    getAll: getAll,
    destroy: destroy,
    toggleAdmin: toggleAdmin,
    toggleNeedsPasswordReset: toggleNeedsPasswordReset
  };
  return factory;

  function getAll() {
    return $http.get('/api/users/')
      .then(function(users) {
        return users.data;
      });
  }

  function destroy(user) {
    return $http.delete('/api/users/' + user._id)
      .then(function(user) {
        $state.reload();
        return user.data;
      });
  }

  function toggleAdmin(user) {
    return $http.put('/api/users/toggleAdmin/' + user._id)
      .then(function(product) {
        $state.reload();
        return product.data;
      });
  }

  function toggleNeedsPasswordReset(user) {
    return $http.put('/api/users/toggleNeedsPasswordReset/' + user._id)
      .then(function(product) {
        $state.reload();
        return product.data;
      });
  }

});