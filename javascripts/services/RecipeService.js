"use strict";

app.service("RecipeService", function($http, $q, FIREBASE_CONFIG) {

		const getFavoriteRecipes= (userUid) => {
				 let recipes = [];
				 return $q((resolve, reject) => {
				 	$http.get(`${FIREBASE_CONFIG.databaseURL}/recipes.json?orderBy="uid"&equalTo="${userUid}"`).then((results) => {
				 		let fbRecipes = results.data;
				 		console.log("favorites working?", results.data);

				 		Object.keys(fbRecipes).forEach((key) => {
		                    fbRecipes[key].id = key; 
		                    if(fbRecipes[key].isFavorite){
		                    recipes.push(fbRecipes[key]);
		                	}
		                	resolve(recipes);
		              	});
				 	}).catch((err) => {
				 		reject(err);
				 		console.log("getFavoriteRecipes", err);
				 });
				 });
			};

		const createRecipeObject= (recipe) => {
			console.log("recipe", recipe);
			return {
				"label": recipe.recipe.label,
				"recipeURL": recipe.recipe.url,
				"image": recipe.recipe.image,
				"isFavorite": recipe.isFavorite,
				"onMenu": recipe.onMenu,
				"uid": recipe.uid
				};
			};

		const postNewRecipe = (NewRecipe) => {
		 	return $http.post(`${FIREBASE_CONFIG.databaseURL}/recipes.json`, JSON.stringify(NewRecipe));
	};

		return {getFavoriteRecipes, createRecipeObject, postNewRecipe};
});





