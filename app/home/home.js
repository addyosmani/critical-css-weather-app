viewsModule.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when("/", {
    templateUrl : "./home/home.html",
    controller : 'HomeCtrl'
  });
}]);

viewsModule.controller('HomeCtrl', ['$scope', 'owmUSCities', 'owmHistory',
                            function($scope,   owmUSCities,   owmHistory) {
  owmHistory.push({ name : "Home", isHome : true });
  owmUSCities().then(function(cities) {
    $scope.cities = cities;
  });
}]);
