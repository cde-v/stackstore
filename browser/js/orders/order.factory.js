'use strict';

app.factory('OrderFactory', function ($http) {
	return {
		fetchAll: function () {
			return $http.get('/api/orders/')
			.then(function (res){
				return res.data;
			})
		},
		fetchById: function (id){
			return $http.get('/api/orders/' + id)
			.then(function (res) {
				return res.data;
			})
		},
		updateOrder: function(id, status){
			return $http.put('/api/orders/' + id, {status: status})
			.then(function (order) {
				if(status === 'Shipped'){
					order.shipDate = Date.now();
				}
				return order.data;
			})
		}
	}		
});