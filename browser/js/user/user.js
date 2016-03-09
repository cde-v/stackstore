app.config(function ($stateProvider) {
    $stateProvider.state('user', {
        url: '/member/:id',
        templateUrl: 'js/user/user.detail.html',
        controller: function($scope, orders, reviews, AuthService){
            $scope.orders = orders;
            $scope.reviews = reviews;
            var setUser = function() {
                AuthService.getLoggedInUser()
                .then(function(user) {
                    $scope.user = user;
                    $scope.user.photoUrl = (user.photoUrl === "#") ? '/img/kanye-west.jpg': user.photoUrl;
                });
            };
            setUser();
        },
        data: {
            adminOnly: false,
            authenticatedOnly: false
        },
        resolve: {
        	orders: function($stateParams, $http){
                return $http.get('/api/users/' + $stateParams.id + '/orders')
                .then(function(orders){
                    return orders.data;
                });
            },
            reviews: function($stateParams, $http) {
                return $http.get('/api/users/' + $stateParams.id + '/reviews')
                .then(function(res){
                    return res.data;
                });

            }

        }
    });
});
// app.factory('userFactory', function($http){
//     return {
//         getUserOrders: function(){
//             return $http.get('/api/users/' + $stateParams.id + '/orders')
//         }
//     }

// })