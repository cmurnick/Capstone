"use strict";

app.controller("FavoriteCtrl", function ($location, $rootScope, $scope, $window, AuthService, IngredientService, RecipeService) {
	$scope.controller = "FavoriteCtrl";

	const getRecipes = () => {
		RecipeService.getFavoriteRecipes(AuthService.getCurrentUid()).then((results) => {
			console.log("get Recipes on Fav page:", results);
			$scope.recipes = results;
		}).catch((err) => {
			console.log("error in getRecipes", err);
		});
	};

	getRecipes();

	$scope.addToMenu = (recipe) => {
		recipe.uid = AuthService.getCurrentUid();
		recipe.onMenu = true;
		let updatedRecipe = RecipeService.createRecipeObject(recipe);
		RecipeService.updateRecipe(updatedRecipe, recipe.id).then((result) => {

		}).catch((err) => {
			console.log("error in update movie", err);
		});
	};

	$scope.deleteRecipe = (recipeId) => {
		RecipeService.deleteRecipe(recipeId).then((results) => {
			IngredientService.getIngredientsByRecipe(recipeId).then((ingredients) => {
				console.log("ingredient", ingredients);
				ingredients.forEach((ingredient) => {
					IngredientService.deleteIngredient(ingredient.id);
				});
			});
		}).catch((err) => {
			console.log("error in DeleteRecipe", err);
		});
		getRecipes();
	};

	$scope.viewLink = (url) => {
		console.log("url", url);
		$window.open(url, '_blank');
	};


});




