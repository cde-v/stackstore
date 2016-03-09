app.config(function ($stateProvider) {
    $stateProvider.state('user', {
        url: '/member/:id',
        templateUrl: 'js/user/user.detail.html',
        controller: function($scope, orders){
            $scope.orders = orders;
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
                    console.log(orders);
                    return orders.data;
                })
        	}
            // reviews: function($stateParams) {
            //     return $http.get('/api/users/' + $stateParam.id + '/orders')
            // }

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