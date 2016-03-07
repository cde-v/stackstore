'use strict';

app.filter('orderFilter', function () {
    return function (orders, status) {
      if(!status) return orders;
        return orders.filter(function (order) {
            return order.status === status;
        });
    };
});
