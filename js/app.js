//Define an angular module for our app
var tipstersApp = angular.module('tipstersApp', []);
 
//Define Routing for app
tipstersApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/feed.html',
        controller: 'FeedController'
    }).
      when('/Rankings', {
        templateUrl: 'partials/rankings.html',
        controller: 'RankingsController'
      }).
      when('/profile', {
        templateUrl: 'partials/profile.html',
        controller: 'ProfileController'
      }).
      otherwise({
        redirectTo: '/'
      });
}]);