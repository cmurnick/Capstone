"use strict";

app.service("IngredientService", function($http, $q, FIREBASE_CONFIG) {
	const postNewIngredient = (NewIngredient) => {
		 	return $http.post(`${FIREBASE_CONFIG.databaseURL}/ingredients.json`, JSON.stringify(NewIngredient));
	};


	const getIngredientsByRecipe= (recipeId) => {
		let ingredients = [];
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/ingredients.json?orderBy="recipeId"&equalTo="${recipeId}"`).then((results) => {

			let fbIngredients = results.data;

				Object.keys(fbIngredients).forEach((key) => {
			
				   ingredients.push(fbIngredients[key]);
				 });
				 resolve(ingredients);
			}).catch((err) => {
				reject(err);
				console.log("getIngredientsByRecipe", err);
		});
		});
   };

	return {postNewIngredient, getIngredientsByRecipe};
});