"use strict";

app.controller("FavCommentCtrl", function($rootScope, $location, $routeParams, $scope, RecipeService) {
	$scope.recipes = [];

  $scope.editRecipe = (inputData) => {
    inputData.uid = $rootScope.uid;
	};
 
   const getRecipeInfo = () => {
		RecipeService.getSingleRecipe($routeParams.id).then((results) =>{
			$scope.recipe=results.data;
		}).catch((err) => {
			console.log("Err in Getsinglerecipe", err);
			});
		};
	
	getRecipeInfo();

	$scope.updateEditedRecipe = (recipe, recipeId) => {
		let updatedRecipe = RecipeService.createRecipeObject(recipe);
		RecipeService.updateRecipe(updatedRecipe, $routeParams.id).then((result) => {
			getRecipeInfo();
			$location.path('/favorite');
		}).catch((err) => {
			console.log("error in update movie", err);
		});	
	};
});
