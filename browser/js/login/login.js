app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, $state) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {
        console.log(loginInfo);
        $scope.error = null;

        AuthService.login(loginInfo).then(function () {
            
            $state.go('home');
        }).catch(function () {

            $scope.error = 'Invalid login credentials.';
        });

    };

});

// app.config(function($stateProvider) {

//   $stateProvider.state('login', {
//     url: '/login',
//     templateUrl: 'js/login/login.html',
//     controller: 'LoginCtrl'
//   });

// });

// app.controller('LoginCtrl', function($scope, AuthService, $state) {

//   $scope.login = {};
//   $scope.error = null;

//   $scope.sendLogin = function(loginInfo) {

//     $scope.error = null;
//     AuthService.login(loginInfo).then(function() {
//       if(AuthService.getLoggedInUser().needsPasswordReset) $state.go('reset');
//       else $state.go('home');
//     }).catch(function() {
//       $scope.error = 'Invalid login credentials b/c catch in login.js.';
//     });

//   };

// });
