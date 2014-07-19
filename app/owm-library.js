angular.module('owmLibrary', [])

  .constant('OWM_API_PREFIX', 'http://api.openweathermap.org/data/2.5/forecast')
  .constant('OWM_LAT_LNG_PATH', '/?lat={{ lat }}&lon={{ lng }}')
  .constant('OWM_CITY_PATH', '/?id={{ id }}')
  .constant('OWM_FIND_CITY_PATH', '/?q={{ q }}')
  .constant('OWM_CITIES_JSON_FILE', './owm-cities.json')

  .factory('owmUSCities', ['$http', '$q', 'OWM_CITIES_JSON_FILE',
                   function($http,   $q,   OWM_CITIES_JSON_FILE) {
    return function() {
      var defer = $q.defer();
      $http.get(OWM_CITIES_JSON_FILE, { cache : true })
        .success(function(cities) {
          defer.resolve(cities);
        });
      return defer.promise;
    }
  }])

  .factory('owmRequest', ['$http', '$q', 'OWM_API_PREFIX',
                  function($http,   $q,   OWM_API_PREFIX) {
    return function(path) {
      var defer = $q.defer();
      $http.get(OWM_API_PREFIX + path)
        .success(function(data) {
          defer.resolve(data);
        })
      return defer.promise;
    }
  }])

  .factory('owmFindCity',    ['owmRequest', '$interpolate', 'OWM_FIND_CITY_PATH', 'OWM_CITY_PATH',
                      function(owmRequest,   $interpolate,   OWM_FIND_CITY_PATH,   OWM_CITY_PATH) {
    return function(q) {
      var path;
      if(q.match(/^\d+$/)) {
        path = $interpolate(OWM_CITY_PATH)({
          id : q
        });
      } else {
        path = $interpolate(OWM_FIND_CITY_PATH)({
          q : q
        });
      }
      return owmRequest(path);
    }
  }])

  .factory('owmNearby', ['owmRequest', '$interpolate', 'OWM_LAT_LNG_PATH',
                 function(owmRequest,   $interpolate,   OWM_LAT_LNG_PATH) {
    return function(lat, lng) {
      var path = $interpolate(OWM_LAT_LNG_PATH)({
        lat : lat,
        lng : lng
      });
      return owmRequest(path);
    }
  }])
