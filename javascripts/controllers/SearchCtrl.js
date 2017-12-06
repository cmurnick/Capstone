"use strict";

app.controller("SearchCtrl", function($location, $rootScope, $scope, $window, RecipeService, EdamamService) {
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
		edRecipe.uid = $rootScope.uid;
		edRecipe.isFavorite = true;
    edRecipe.onMenu= false;
		let newRecipe = RecipeService.createRecipeObject(edRecipe);
		RecipeService.postNewRecipe(newRecipe).then (() => {
			$location.path('/search');
		}).catch((err) => {
			console.log("error in postNewRecipe", err);
		});
		};

$scope.viewLink = (url) =>{
	console.log("url",url);
    $window.open(url,'_blank');
};

});