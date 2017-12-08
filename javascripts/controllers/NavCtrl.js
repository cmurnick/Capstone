"use strict";

app.controller("NavCtrl", function ($location, $rootScope, $scope, $window, AuthService) {
	$scope.logoutUser = () => {
		$rootScope.navbar = false;
		$window.localStorage.clear();
		AuthService.logout();
		$location.path('/auth');
	};
});