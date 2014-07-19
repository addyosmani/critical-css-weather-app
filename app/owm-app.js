angular.module('owmApp', ['owmAppViews', 'ngRoute', 'ngAnimate'])
  .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({
      redirectTo : '/'
    });
  }])
