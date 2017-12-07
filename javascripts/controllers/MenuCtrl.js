"use strict";

app.controller("MenuCtrl", function($rootScope, $scope, $window, RecipeService){
  $scope.controller = "MenuCtrl";

		$scope.viewLink = (url) =>{
			console.log("url",url);
		    $window.open(url,'_blank');
		};

	const getRecipes = () => {
		RecipeService.getOnMenu($rootScope.uid).then((results) => {
			$scope.recipes = results;
			console.log("results of get recipes", results);
		}).catch((err) => {
			console.log("error in getRecipes on MEnu", err);
		});
	};

	getRecipes();

	$scope.viewLink = (url) =>{
			console.log("url",url);
		    $window.open(url,'_blank');
		};

});