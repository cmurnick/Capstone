"use strict";

app.controller("FavoriteCtrl", function($location, $rootScope, $scope, RecipeService){
  $scope.controller = "FavoriteCtrl";

  const getRecipes = () => {
		RecipeService.getFavoriteRecipes($rootScope.uid).then((results) => {
			console.log("get Recipes on Fav page:", results);
		$scope.recipes = results;
	}).catch((err) => {
		console.log("error in getRecipes", err);
	});
	};

	getRecipes();

});