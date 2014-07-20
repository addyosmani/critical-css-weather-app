viewsModule.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when("/cities/:city", {
    templateUrl : "./cities/city.html",
    controller : 'CityCtrl',
    resolve : {
      cityDetails : ['owmFindCity', '$route', function(owmFindCity, $route) {
        return owmFindCity($route.current.params.city);
      }]
    }
  });
}]);

viewsModule.controller('CityCtrl', ['$scope', 'cityDetails', 'owmHistory',
                            function($scope,   cityDetails,   owmHistory) {
  owmHistory.push(cityDetails.city);
  $scope.city = cityDetails.city;
  if($scope.city.country == 'CA') {
    $scope.city.country = 'Canada';
  }
  $scope.forecast = _.map(cityDetails.list, function(item) {
    var a = item.dt_txt.split(/[^0-9]/);
    item.dt_txt = new Date (a[0],a[1]-1,a[2],a[3],a[4],a[5] );
    return item;
  });
}])
