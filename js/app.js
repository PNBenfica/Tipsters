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
      when('/sports', {
        templateUrl: 'partials/sports.html',
        controller: 'SportsController'
      }).
      when('/sports/premierleague', {
        templateUrl: 'partials/sportsleague.html',
        controller: 'SportsLeagueController'
      }).
      otherwise({
        redirectTo: '/'
      });
}]);