'use strict';
window.app = angular.module('StackStore', ['fsaPreBuilt', 'ui.router', 'ngAnimate', 'ngStorage', 'anim-in-out']);

app.config(function($urlRouterProvider, $locationProvider) {
  // This turns off hashbang urls (/#about) and changes it to something normal (/about)
  $locationProvider.html5Mode(true);
  // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
  $urlRouterProvider.when('/auth/google', function () {
    window.location.reload();
  });
  $urlRouterProvider.otherwise('/');
});

// This app.run is for controlling access to specific states.
app.run(function($rootScope, AuthService, $state) {

  // The given state requires an authenticated user.
  var destinationStateRequiresAuth = function(state) {
    return state.data && state.data.authenticatedOnly;
  };

  var destinationStateRequiresAdmin = function(state) {
    return destinationStateRequiresAuth(state) && state.data.adminOnly;
  };

  // $stateChangeStart is an event fired
  // whenever the process of changing a state begins.
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
    if(!destinationStateRequiresAuth(toState) || AuthService.isAdmin()) {
      // The destination state does not require authentication or user is an admin
      // Short circuit with return.
      return;
    }

    // Cancel navigating to new state.
    event.preventDefault();

    AuthService.getLoggedInUser().then(function(user) {
      // If a user is retrieved, then renavigate to the destination
      // (the second time, AuthService.isAuthenticated() will work)
      // otherwise, if no user is logged in, go to "login" state.
      if(!user) {
        $state.go('login');
      } else if(toState.data.adminOnly && !user.isAdmin) {
        $state.go('home');
      } else if(user) {
        $state.go(toState.name, toParams);
      } else {
        $state.go('login');
      }
    });

  });

});
