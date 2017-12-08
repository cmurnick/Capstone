"use strict";

app.controller("SearchCtrl", function($location, $rootScope, $scope, $window, RecipeService, IngredientService,  EdamamService) {
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



$scope.saveFavorite= (edRecipe) => {
		edRecipe.recipe.uid = $rootScope.uid;
		edRecipe.recipe.isFavorite = true;
   		edRecipe.recipe.onMenu= false;
		let newRecipe = RecipeService.createRecipeObject(edRecipe.recipe);
		RecipeService.postNewRecipe(newRecipe).then((results) => {
			console.log("saveFavoriteRecipe working from search?", results);
			let ingredientsList = edRecipe.recipe.ingredientLines;
			console.log("ingredientsList", edRecipe);
			ingredientsList.forEach ((ingredient) => {
				let newIngredient = {ingredient: ingredient, recipeId: results.data.name};
				// console.log("ingredients posting too?", results.data);
				IngredientService.postNewIngredient(newIngredient);
			});
		}).catch((err) => {
			console.log("error in saveFavorite", err);
		});
	};
		


$scope.addToMenu = (recipe) => {
	    recipe.recipe.uid = $rootScope.uid;
	    recipe.recipe.isFavorite = false;
			recipe.recipe.onMenu = true;
			let newRecipe = RecipeService.createRecipeObject(recipe.recipe);
			RecipeService.postNewRecipe(newRecipe).then (() => {
				$location.path('/search');
			}).catch((err) => {
				console.log("error in update movie", err);
			});	
		};

$scope.viewLink = (url) =>{
	console.log("url",url);
    $window.open(url,'_blank');
};

});