
var tipstersApp = tipstersApp || {};


tipstersApp.run( function($rootScope, $location) {
   	$rootScope.$watch(function() { 
      return $location.path(); 
    },
    function(a){  
      $rootScope.$broadcast('urlChange');
    });
});


tipstersApp.controller('FeedController', function($scope) {
     
});
 
 
tipstersApp.controller('RankingsController', function($scope) {
 
});
 
 
tipstersApp.controller('ProfileController', function($scope) {
 
});