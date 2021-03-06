app.directive('navbar', function($rootScope, AuthService, AUTH_EVENTS, $state, CartFactory) {

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'js/common/directives/navbar/navbar.html',
    link: function(scope) {

      scope.items = [
        { label: 'Home', state: 'home', alwaysShow: true },
        { label: 'Shop', state: 'productsList', alwaysShow: true },
        { label: 'Guide', state: 'guide', alwaysShow: true },
        { label: 'Cart', state: 'cart', alwaysShow: true },
        { label: 'Login', state: 'login', alwaysShow: false, showToLoggedOut: true },
        { label: 'Signup', state: 'signup', alwaysShow: false, showToLoggedOut: true }
      ];

      scope.user = null;

      scope.isLoggedIn = function() {
        return AuthService.isAuthenticated();
      };

      scope.cartTotal = function(){
        return (CartFactory.cart)? CartFactory.cart.length : 0;
      }
      
      scope.logout = function() {
        AuthService.logout().then(function() {
          $state.go('home');
        });
      };

      var setUser = function() {
        AuthService.getLoggedInUser().then(function(user) {
          scope.user = user;
        });
      };

      var removeUser = function() {
        scope.user = null;
      };

      setUser();

      $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
      $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
      $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

    }

  };

});
