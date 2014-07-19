viewsModule.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when("/near-me", {
    templateUrl : "./home/near-me.html",
    controller : 'NearMeCtrl'
  });
}]);

viewsModule.controller('NearMeCtrl', ['$scope', 'geolocation', 'owmNearby', '$location', 'owmHistory',
                              function($scope,   geolocation,   owmNearby,   $location,   owmHistory) {
  $scope.loading = true;

  owmHistory.push({ name : "Near Me", isNearMe : true });
  geolocation.getLocation().then(function(data) {
    owmNearby(data.coords.latitude, data.coords.longitude).then(function(result) {
      $location.path('/cities/' + result.city.id);
      $scope.loading = false;
    }); 
  });
}]);
