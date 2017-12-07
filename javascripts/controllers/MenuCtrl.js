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


  $scope.removeFromMenu = (recipe, recipeId) => {
		recipe.onMenu = false;
		let updatedRecipe = RecipeService.createRecipeObject(recipe);
		RecipeService.updateRecipe(updatedRecipe, recipeId).then((result) => {
			getRecipes();
		}).catch((err) => {
			console.log("error in update movie", err);
		});
	};

	$scope.saveFavorite = (recipe, recipeId) => {
		recipe.isFavorite = true;
		let updatedRecipe = RecipeService.createRecipeObject(recipe);
		RecipeService.updateRecipe(updatedRecipe, recipeId).then((result) => {
			getRecipes();
		}).catch((err) => {
			console.log("error in update movie", err);
		});
	};



	$scope.viewLink = (url) =>{
			console.log("url",url);
		    $window.open(url,'_blank');
		};


});