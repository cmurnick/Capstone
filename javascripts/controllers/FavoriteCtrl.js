"use strict";

app.controller("FavoriteCtrl", function($location, $rootScope, $scope, $window, RecipeService){
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

	$scope.addToMenu = (recipe) => {
	    recipe.uid = $rootScope.uid;
			recipe.onMenu = true;
			let updatedRecipe = RecipeService.createRecipeObject(recipe);
			RecipeService.updateRecipe(updatedRecipe, recipe.id).then((result) => {
				
			}).catch((err) => {
				console.log("error in update movie", err);
			});	
		};

	$scope.viewLink = (url) => {
		console.log("url", url);
	    $window.open(url,'_blank');
	};
	
});