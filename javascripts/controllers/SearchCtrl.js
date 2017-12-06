"use strict";

app.controller("SearchCtrl", function($location, $rootScope, $scope, RecipeService, EdamamService) {
	$scope.recipes = [];

	$scope.enterPush = (event) => {
			if(event.keyCode === 13) {
				console.log("event", event);
				EdamamService.searchRecipes(event.target.value).then((results) =>{
					console.log("results pull?", results);
					$scope.recipes = results.data.hits;
				console.log("scope results", $scope.recipes);
				console.log("recipes?", results.data.hits);
			}).catch((err) => {
				console.log("error in searchMovies", err);
			});
			}
		};


});