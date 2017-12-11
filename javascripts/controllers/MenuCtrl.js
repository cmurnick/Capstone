"use strict";

app.controller("MenuCtrl", function($rootScope, $scope, $window, AuthService, IngredientService, RecipeService){
  $scope.recipes = [];

	$scope.viewLink = (url) =>{
			console.log("url",url);
		    $window.open(url,'_blank');
		};

		const getRecipes = () => {
		    RecipeService.getOnMenu(AuthService.getCurrentUid()).then((results) => {
		        results.forEach((result) => {
		            IngredientService.getIngredientsByRecipe(result.id).then ((ingredients) => {
		                result.ingredients = ingredients;
		            });
		        });
		        
		        
		        $scope.recipes = results;
		    }).catch((err) => {
		        console.log("error in getRecipes on MEnu", err);
		    });
		};

	getRecipes();



  $scope.removeFromMenu = (recipe, recipeId) => {
	  	if(recipe.isFavorite) {
		recipe.onMenu = false;
		let updatedRecipe = RecipeService.createRecipeObject(recipe);
		RecipeService.updateRecipe(updatedRecipe, recipeId).then((result) => {
			getRecipes();
		}).catch((err) => {
			console.log("error in DeleteRecipe", err);
		}); 
		}	else {
			RecipeService.deleteRecipe(recipeId).then((results) => {
				IngredientService.getIngredientsByRecipe(recipeId).then((ingredients) => {
					console.log("ingredient", ingredients);
					ingredients.forEach((ingredient) => {
						IngredientService.deleteIngredient(ingredient.id);
					});
				});
			});
		}
			getRecipes();	
		};
	
	$scope.deleteAllRecipes = () => {
		$scope.recipes.forEach((recipe) => {
			if(recipe.isFavorite) {
				recipe.onMenu = false;
				let updatedRecipe = RecipeService.createRecipeObject(recipe);
				RecipeService.updateRecipe(updatedRecipe, recipe.id).then((result) => {
					getRecipes();
				}).catch((err) => {
					console.log("error in DeleteRecipe", err);
				}); 
				}	else {
					RecipeService.deleteRecipe(recipe.id).then((results) => {
						IngredientService.getIngredientsByRecipe(recipe.id).then((ingredients) => {
							console.log("ingredient", ingredients);
							ingredients.forEach((ingredient) => {
								IngredientService.deleteIngredient(ingredient.id);
							});
						});
					});
				}

		});
		
				getRecipes();	
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