app.config(function ($stateProvider) {
    $stateProvider.state('user', {
        url: '/member/:id',
        templateUrl: 'js/user/user.detail.html',
        controller: function($scope, orders, reviews){
            $scope.orders = orders;
            $scope.reviews = reviews;
        },
        data: {
            adminOnly: false,
            authenticatedOnly: false
        },
        resolve: {
        	orders: function($stateParams, $http){
                console.log('/api/users/' + $stateParams.id + '/orders')
                return $http.get('/api/users/' + $stateParams.id + '/orders')
                .then(function(orders){
                    return orders.data;
                })
            },
            reviews: function($stateParams, $http) {
                return $http.get('/api/users/' + $stateParams.id + '/reviews')
                .then(function(res){
                    console.log(res.data);
                    return res.data;
                })

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