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

	$scope.saveWannaTry= (edRecipe, wannaTry) => {
		edRecipe.recipe.uid = AuthService.getCurrentUid();
		edRecipe.recipe.isFavorite = false;
		edRecipe.recipe.onMenu= false;
		edRecipe.recipe.comments = "";
		edRecipe.recipe.wannaTry = true;

		let newRecipe = RecipeService.createRecipeObject(edRecipe.recipe);
		RecipeService.postNewRecipe(newRecipe).then((results) => {
			console.log("save wannaTry working from search?", results);
			let ingredientsList = edRecipe.recipe.ingredientLines;
			console.log("ingredientsList", edRecipe);
			ingredientsList.forEach ((ingredient) => {
				let newIngredient = {hasIngredient: false, ingredient: ingredient, recipeId: results.data.name};
				IngredientService.postNewIngredient(newIngredient);
			});
			ToastService.toast("Added to WannaTry");
		}).catch((err) => {
			console.log("error in saveFavorite", err);
		});
	};
			
	$scope.addToMenu= (edRecipe, isFavorited) => {
			edRecipe.recipe.uid = AuthService.getCurrentUid();
			edRecipe.recipe.isFavorite = false;
			edRecipe.recipe.comments = "";
			edRecipe.recipe.onMenu= true;
			edRecipe.recipe.wannaTry= true; 
			let newRecipe = RecipeService.createRecipeObject(edRecipe.recipe);
			RecipeService.postNewRecipe(newRecipe).then((results) => {
				console.log("saveAddToMenu working from search?", results);
				let ingredientsList = edRecipe.recipe.ingredientLines;
				console.log("ingredientsList", edRecipe);
				ingredientsList.forEach ((ingredient) => {
					// ingredient.hasIngredient = false;
					let newIngredient = {hasIngredient: false, ingredient: ingredient, recipeId: results.data.name};
					IngredientService.postNewIngredient(newIngredient);
					
				});
				ToastService.toast("Added to Menu & Wanna Try");
			}).catch((err) => {
				console.log("error in addToMenufrom Search page", err);
			});
		};
			

	$scope.viewLink = (url) =>{
		// console.log("url",url);
		if (url === null) {
			ToastService.toast("Sorry, unfortunately, no Url is available for this recipe");
		} else	{$window.open(url,'_blank');
		}
	};

});