"use strict";

app.controller("SearchCtrl", function($location, $rootScope, $scope, $window, AuthService,  RecipeService, ToastService, IngredientService,  EdamamService) {
	$scope.recipes = [];

	$scope.enterPush = (event) => {
			if(event.keyCode === 13) {
				EdamamService.searchRecipes(event.target.value).then((results) =>{
					console.log("overall Vegan", results);
					$scope.recipes = results.data.hits;
			}).catch((err) => {
				console.log("error in searchMovies", err);
			});
			}
		};



	$scope.saveFavorite= (edRecipe, isFavorited) => {
			edRecipe.recipe.uid = AuthService.getCurrentUid();
			edRecipe.recipe.isFavorite = isFavorited;
	   		edRecipe.recipe.onMenu= false;
			let newRecipe = RecipeService.createRecipeObject(edRecipe.recipe);
			RecipeService.postNewRecipe(newRecipe).then((results) => {
				console.log("saveFavoriteRecipe working from search?", results);
				let ingredientsList = edRecipe.recipe.ingredientLines;
				console.log("ingredientsList", edRecipe);
				ingredientsList.forEach ((ingredient) => {
					let newIngredient = {hasIngredient: false, ingredient: ingredient, recipeId: results.data.name};
					IngredientService.postNewIngredient(newIngredient);
				});
				ToastService.toast("Added to Favorites");
			}).catch((err) => {
				console.log("error in saveFavorite", err);
			});
		};
			
	$scope.addToMenu= (edRecipe, isFavorited) => {
			edRecipe.recipe.uid = AuthService.getCurrentUid();
			edRecipe.recipe.isFavorite = isFavorited;
	   		edRecipe.recipe.onMenu= true;
			let newRecipe = RecipeService.createRecipeObject(edRecipe.recipe);
			RecipeService.postNewRecipe(newRecipe).then((results) => {
				console.log("saveAddToMenu working from search?", results);
				let ingredientsList = edRecipe.recipe.ingredientLines;
				console.log("ingredientsList", edRecipe);
				ingredientsList.forEach ((ingredient) => {
					// ingredient.hasIngredient = false;
					let newIngredient = {hasIngredient: false, ingredient: ingredient, recipeId: results.data.name};
					// console.log("ingredients posting too?", results.data);
					IngredientService.postNewIngredient(newIngredient);
					
				});
				ToastService.toast("Added to Menu");
			}).catch((err) => {
				console.log("error in saveFavorite", err);
			});
		};
			

	$scope.viewLink = (url) =>{
		console.log("url",url);
	    $window.open(url,'_blank');
	};

});