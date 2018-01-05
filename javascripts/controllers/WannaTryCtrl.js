"use strict";

app.controller("WannaTryCtrl", function($rootScope, $scope, $window, AuthService, IngredientService, RecipeService, ToastService) {
    $scope.controller = "WannaTryCtrl";

    const getRecipes = () => {
		RecipeService.getWannaTryRecipes(AuthService.getCurrentUid()).then((results) => {
			console.log("get Recipes on wannaTryCtrl page:", results);
			$scope.recipes = results;
		}).catch((err) => {
			console.log("error in getRecipes", err);
		});
	};

	getRecipes();


    $scope.saveFavorite = (recipe, recipeId, isFavorite) => {
        recipe.isFavorite = isFavorite;
        // recipe.onMenu= true;
        recipe.wannaTry = false;
        recipe.comments = "";
		let updatedRecipe = RecipeService.createRecipeObject(recipe);
		RecipeService.updateRecipe(updatedRecipe, recipeId).then((result) => {
			getRecipes();
			ToastService.toast("Added to Favorites");
		}).catch((err) => {
			console.log("error in update movie", err);
		});
    };
    

    // $scope.saveFavorite= (recipe, isFavorited) => {
    //     recipe.uid = AuthService.getCurrentUid();
	// 	recipe.onMenu= true;
    //     recipe.isFavorite = isFavorited;
    //     recipe.wannaTry = false;
    //     recipe.comments = "";
    //         let updatedRecipe = RecipeService.createRecipeObject(recipe);
    //         RecipeService.updateRecipe(updatedRecipe, recipeId).then((result) => {
           
    //             getRecipes();
    //             ToastService.toast("Saved!");
    //         }).catch((err) => {
    //             console.log("error in update movie", err);
    //         });
    //     };

    $scope.addToMenu = (recipe) => {
        recipe.uid = AuthService.getCurrentUid();
        recipe.onMenu = true;
        let updatedRecipe = RecipeService.createRecipeObject(recipe);
        RecipeService.updateRecipe(updatedRecipe, recipe.id).then((result) => {
        ToastService.toast("Added to Menu");
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

    $scope.viewLink = (url) =>{
		// console.log("url",url);
		if (url === null) {
			ToastService.toast("Sorry, unfortunately, no Url is available for this recipe");
		} else	{$window.open(url,'_blank');
		}
	};

});