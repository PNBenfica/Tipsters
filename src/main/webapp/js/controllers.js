'use strict';

/**
 * The root tipstersApp module.
 *
 * @type {tipstersApp|*|{}}
 */
var tipstersApp = tipstersApp || {};

/**
 * @ngdoc module
 * @name tipstersControllers
 *
 * @description
 * Angular module for controllers.
 *
 */
tipstersApp.controllers = angular.module('tipstersControllers', ['ui.bootstrap']);




/**
 * @ngdoc controller
 * @name FeedCtrl
 *
 * @description
 * A controller used for the Feed page.
 */

tipstersApp.controllers.controller('FeedCtrl',
    function ($scope, $log, oauth2Provider, HTTP_ERRORS) {
		$scope.started = false;
		$scope.posts = [{tipsterName: "Fernando Silva", tipsterImage:"img/user1.png", like:false, watchList:false, postTime:"6 min", events:[{name:"Arouca vs Benfica", selection:"Under 0.5 Goals - 1st Half", odd:3.20},{name:"Sporting vs Tondela", selection:"Tondela Over 1.5 Golos - 1st Half", odd:5.9} ] }, 
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", like:false, watchList:false, postTime:"8 min", events:[{name:"Sporting vs Tondela", selection:"Tondela Over 1.5 Golos - 1st Half", odd:5.9}] }, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/user2.png", like:false, watchList:false, postTime:"2 min", events:[{name:"Benfica vs Estoril", selection:"Benfica wins", odd:1.82}] }, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/user1.png", like:false, watchList:false, postTime:"16 min", events:[{name:"Benfica vs Porto", selection:"Benfica wins", odd:1.22}] }, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/user2.png", like:false, watchList:false, postTime:"48 min", events:[{name:"Gil Vicente vs Estoril", selection:"Benfica wins", odd:1.64}] }];
		
		$scope.likePost = function (post) {
    		post.like = !post.like;
    	};
    	
    	$scope.addToWatchList = function (post) {
    		post.watchList = !post.watchList;
    	};
    	
    	$scope.sort = function () {
    		$scope.posts.sort(function(a, b){
    			  return a.odd == b.odd ? 0 : +(a.odd > b.odd) || -1;
    			});
    	};
    })
;


/**
 * @ngdoc controller
 * @name FeedCtrl
 *
 * @description
 * A controller used for the Feed page.
 */

tipstersApp.controllers.controller('WatchListCtrl',
    function ($scope, $log, oauth2Provider, HTTP_ERRORS) {
	$scope.posts = [{tipsterName: "Fernando Silva", tipsterImage:"img/user2.png", like:false, watchList:true, postTime:"6 min", events:[{name:"Arouca vs Benfica", selection:"Under 0.5 Goals - 1st Half", odd:3.20},{name:"Sporting vs Tondela", selection:"Tondela Over 1.5 Golos - 1st Half", odd:5.9} ] }, 
	                {tipsterName: "Paula Cainço", tipsterImage:"img/user2.png", like:false, watchList:true, postTime:"8 min", events:[{name:"Sporting vs Tondela", selection:"Tondela Over 1.5 Golos - 1st Half", odd:5.9}] }, 
	                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", like:false, watchList:true, postTime:"2 min", events:[{name:"Benfica vs Estoril", selection:"Benfica wins", odd:1.82}] }, 
	                {tipsterName: "Pedro Teixeira", tipsterImage:"img/user1.png", like:false, watchList:true, postTime:"16 min", events:[{name:"Benfica vs Porto", selection:"Benfica wins", odd:1.22}] }, 
	                {tipsterName: "Pedro Teixeira", tipsterImage:"img/user2.png", like:false, watchList:true, postTime:"48 min", events:[{name:"Gil Vicente vs Estoril", selection:"Benfica wins", odd:1.64}] }];
		
	$scope.likePost = function (post) {
    		post.like = !post.like;
    	};
    	
    	$scope.addToWatchList = function (post) {
    		post.watchList = !post.watchList;
    	};
    })
;



/**
 * @ngdoc controller
 * @name FeedCtrl
 *
 * @description
 * A controller used for the Feed page.
 */

tipstersApp.controllers.controller('RankingsCtrl',
    function ($scope, $log, oauth2Provider, HTTP_ERRORS) {

	$scope.submitted = false;

	/**
     * Holds the tipsters currently displayed in the page.
     * @type {Array}
     */
    $scope.tipstersRankInfo = [{tipsterName: "Fernando Silva", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"26%", numberTips:125, averageOdds:1.56, ROI:"5.2%"}, 
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"3.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"3.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"3.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"2.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"2.8%"}, 
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"3.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"3.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"3.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"2.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"2.8%"}, 
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"3.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"3.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"3.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"2.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"2.8%"}, 
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"3.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"3.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"3.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"2.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"2.8%"}, 
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"3.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"3.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"3.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"2.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"2.8%"}, 
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"3.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"3.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"3.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"2.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"2.8%"}, 
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"3.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"3.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"3.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"2.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"2.8%"}, 
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"3.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"3.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"3.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"2.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"2.8%"}, 
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"3.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"3.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"3.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"2.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"2.8%"}, 
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"3.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"3.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"3.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"2.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"2.8%"}, 
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"3.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"3.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"3.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"2.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"2.8%"}, 
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"3.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"3.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"3.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"2.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"2.8%"}, 
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"3.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"3.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"3.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"2.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"2.8%"}, 
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", winStreak:3, winPercent:"25%", numberTips:133, averageOdds:1.36, ROI:"4.2%"}, 
		                {tipsterName: "Nuno Cainço", tipsterImage:"img/undefinedUser.png", winStreak:1, winPercent:"35%", numberTips:25, averageOdds:1.46, ROI:"4.2%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"},
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:0, winPercent:"18%", numberTips:43, averageOdds:1.54, ROI:"4.1%"}, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", winStreak:7, winPercent:"24%", numberTips:12, averageOdds:1.47, ROI:"3.9%"}];
    /**
     * Namespace for the pagination.
     * @type {{}|*}
     */
    $scope.pagination = $scope.pagination || {};
    $scope.pagination.currentPage = 0;
    $scope.pagination.pageSize = 10;
    /**
     * Returns the number of the pages in the pagination.
     *
     * @returns {number}
     */
    $scope.pagination.numberOfPages = function () {
        return Math.ceil($scope.tipstersRankInfo.length / $scope.pagination.pageSize);
    };

    /**
     * Returns an array including the numbers from 1 to the number of the pages.
     *
     * @returns {Array}
     */
    $scope.pagination.pageArray = function () {
        var pages = [];
        var numberOfPages = $scope.pagination.numberOfPages();
        for (var i = 0; i < numberOfPages; i++) {
            pages.push(i);
        }
        return pages;
    };
    
    $scope.isPageVisible = function(page) {
    	page++;
    	return $scope.pagination.currentPage - $scope.pagination.currentPage % 10 < page && $scope.pagination.currentPage - $scope.pagination.currentPage % 10 + 11 > page;
    }

    /**
     * Checks if the target element that invokes the click event has the "disabled" class.
     *
     * @param event the click event
     * @returns {boolean} if the target element that has been clicked has the "disabled" class.
     */
    $scope.pagination.isDisabled = function (event) {
        return angular.element(event.target).hasClass('disabled');
    };
});





/**
 * @ngdoc controller
 * @name RootCtrl
 *
 * @description
 * The root controller having a scope of the body element and methods used in the application wide
 * such as user authentications.
 *
 */
tipstersApp.controllers.controller('RootCtrl', function ($scope, $location, oauth2Provider) {

	
	$scope.notifications = 
        [{tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", action:"liked", event:"Benfica vs Estoril"}, 
          {tipsterName: "Fernando Silva", tipsterImage:"img/undefinedUser.png", action:"commented", event:"Arouca vs Benfica"}, 
         {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", action:"liked", event:"Sporting vs Tondela"}, 
         {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", action:"commented", event:"Benfica vs Porto"}, 
         {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", action:"commented", event:"Gil Vicente vs Estoril"}];
    
	/**
     * @param notificationIndex
     */
	$scope.removeNotification = function (notificationIndex){
		$scope.notifications.splice(notificationIndex, 1);
		if (!$scope.hasNotifications())
			$scope.toggleNotifications();
	}
	
	$scope.hasNotifications = function(){
		return $scope.notifications.length > 0;
	}

	
	

	$scope.betSlipTips = 
		[{event:"Benfica vs Estoril", selection:"Benfica", odd:1.82 }, 
         {event:"Arouca vs Benfica", selection:"Under 0.5 Goals - 1st Half", odd:3.20 }, 
         {event:"Sporting vs Tondela", selection:"Tondela Over 1.5 Golos - 1st Half", odd:5.9 }, 
         {event:"Benfica vs Porto", selection:"Benfica", odd:1.22 }, 
         {event:"Gil Vicente vs Estoril", selection:"Gil Vicente", odd:1.64 }];
	
	/**
     * @param tipIndex
     */
	$scope.removeSingleTip = function (tipIndex){
		$scope.betSlipTips.splice(tipIndex, 1);
		if (!$scope.hasSingleTips())
			$scope.toggleBetSlip();
	}
	
	$scope.hasSingleTips = function(){
		return $scope.betSlipTips.length > 0;
	}
	

	$scope.betSlipTotalOdd = function(){
		var totalOdd = 1;
		for(var i=0; i<$scope.betSlipTips.length; i++) {
			totalOdd *= $scope.betSlipTips[i].odd;
		}
		return totalOdd.toFixed(2);
	}
	
	
	$scope.toggleBetSlip = function(){
		$scope.toggleClass('#bet-slip-wrapper', 'toggled');
		$scope.removeClass('#notifications-wrapper', 'toggled');
	}
	
	$scope.toggleNotifications = function(){
		$scope.toggleClass('#notifications-wrapper', 'toggled');
		$scope.removeClass('#bet-slip-wrapper', 'toggled');
	}
	
	$scope.toggleClass = function(id, classe){
		var element = document.querySelector(id);
		element.classList.toggle(classe);
	}
	
	$scope.removeClass = function(id, classe){
		var element = document.querySelector(id);
		element.classList.remove(classe);
	}
	
	/**
     * Returns if the viewLocation is the currently viewed page.
     *
     * @param viewLocation
     * @returns {boolean} true if viewLocation is the currently viewed page. Returns false otherwise.
     */
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    /**
     * Returns the OAuth2 signedIn state.
     *
     * @returns {oauth2Provider.signedIn|*} true if siendIn, false otherwise.
     */
    $scope.getSignedInState = function () {
        return oauth2Provider.signedIn;
    };

    /**
     * Calls the OAuth2 authentication method.
     */
    $scope.signIn = function () {
        oauth2Provider.signIn(function () {
            gapi.client.oauth2.userinfo.get().execute(function (resp) {
                $scope.$apply(function () {
                    if (resp.email) {
                        oauth2Provider.signedIn = true;
                        $scope.alertStatus = 'success';
                        $scope.rootMessages = 'Logged in with ' + resp.email;
                    }
                });
            });
        });
    };

    /**
     * Render the signInButton and restore the credential if it's stored in the cookie.
     * (Just calling this to restore the credential from the stored cookie. So hiding the signInButton immediately
     *  after the rendering)
     */
    $scope.initSignInButton = function () {
        gapi.signin.render('signInButton', {
            'callback': function () {
                jQuery('#signInButton button').attr('disabled', 'true').css('cursor', 'default');
                if (gapi.auth.getToken() && gapi.auth.getToken().access_token) {
                    $scope.$apply(function () {
                        oauth2Provider.signedIn = true;
                    });
                }
            },
            'clientid': oauth2Provider.CLIENT_ID,
            'cookiepolicy': 'single_host_origin',
            'scope': oauth2Provider.SCOPES
        });
    };

    /**
     * Logs out the user.
     */
    $scope.signOut = function () {
        oauth2Provider.signOut();
        $scope.alertStatus = 'success';
        $scope.rootMessages = 'Logged out';
    };

    /**
     * Collapses the navbar on mobile devices.
     */
    $scope.collapseNavbar = function () {
        angular.element(document.querySelector('.navbar-collapse')).removeClass('in');
    };

});


/**
 * @ngdoc controller
 * @name OAuth2LoginModalCtrl
 *
 * @description
 * The controller for the modal dialog that is shown when an user needs to login to achive some functions.
 *
 */
tipstersApp.controllers.controller('OAuth2LoginModalCtrl',
    function ($scope, $modalInstance, $rootScope, oauth2Provider) {
        $scope.singInViaModal = function () {
            oauth2Provider.signIn(function () {
                gapi.client.oauth2.userinfo.get().execute(function (resp) {
                    $scope.$root.$apply(function () {
                        oauth2Provider.signedIn = true;
                        $scope.$root.alertStatus = 'success';
                        $scope.$root.rootMessages = 'Logged in with ' + resp.email;
                    });

                    $modalInstance.close();
                });
            });
        };
    });
