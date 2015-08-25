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
		$scope.posts = [{tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", like:false, watchList:false, postTime:"2 min", event:"Benfica vs Estoril", selection:"Benfica wins", odd:1.82 }, 
		                {tipsterName: "Fernando Silva", tipsterImage:"img/undefinedUser.png", like:false, watchList:false, postTime:"6 min", event:"Arouca vs Benfica", selection:"Under 0.5 Goals - 1st Half", odd:3.20 }, 
		                {tipsterName: "Paula Cainço", tipsterImage:"img/undefinedUser.png", like:false, watchList:false, postTime:"8 min", event:"Sporting vs Tondela", selection:"Tondela Over 1.5 Golos - 1st Half", odd:5.9 }, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", like:false, watchList:false, postTime:"16 min", event:"Benfica vs Porto", selection:"Benfica wins", odd:1.22 }, 
		                {tipsterName: "Pedro Teixeira", tipsterImage:"img/undefinedUser.png", like:false, watchList:false, postTime:"48 min", event:"Gil Vicente vs Estoril", selection:"Benfica wins", odd:1.64 }];

    	
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
     * Remove a notification
     * @param notificationIndex
     */
	$scope.removeNotification = function (notificationIndex){
		$scope.notifications.splice(notificationIndex, 1);
		if (!$scope.hasNotifications())
			$scope.toggleRightSidebar();
	}
	
	$scope.hasNotifications = function(){
		return $scope.notifications.length > 0;
	}
	
	$scope.toggleRightSidebar = function(){
		var notificationWrapper = document.querySelector('#right_wrapper');
		notificationWrapper.classList.toggle('toggled');
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
