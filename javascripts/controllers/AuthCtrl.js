"use strict";

app.controller("AuthCtrl", function($location, $rootScope, $scope, AuthService){
	$scope.authenticate = () => {
		AuthService.authenticateGoogle().then((result) => {
			$rootScope.navbar = true;
			$scope.$apply(() => {
				$location.url('/search');
			});
			
		}).catch((err) => {
			console.log("error in authenticateGoogle", err);
		});
	};
});