app.config(function($stateProvider) {
  $stateProvider.state('adminProductsList', {
    url: '/admin/products',
    templateUrl: 'js/admin/admin.products.list.html',
    controller: 'adminProductCtrl',
    resolve: {
      products: function(ProductList) {
        return ProductList.getAll();
      }
    }
  });
});

app.controller('adminProductCtrl', function($scope, $state, products, ProductList) {
  $scope.editProduct = {};
  $scope.catalog = products;
  $scope.removeProduct = function(shoe) {
    ProductList.destroy(shoe.itemId)
      .then(function() {
        $state.reload();
      });
  };
  $scope.updateProduct = function(shoe) {
    console.log(shoe);
    console.dir($scope, {depth: null});
    ProductList.update(shoe.itemId, $scope.editProduct[shoe.name])
      .then(function() {
        $state.reload();
      });
  };

});
