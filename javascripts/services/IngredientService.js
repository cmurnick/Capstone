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
					fbIngredients[key].id = key;
	                    ingredients.push(fbIngredients[key]);
				 });
				 resolve(ingredients);
			}).catch((err) => {
				reject(err);
				console.log("getIngredientsByRecipe", err);
		});
		});
   };

   	const updateHasIngredient = (ingredientId, hasIngredient) => {
   			return $http.patch(`${FIREBASE_CONFIG.databaseURL}/ingredients/${ingredientId}.json`, JSON.stringify({hasIngredient}));

   	};

   	const createIngredientObject= (ingredient) => {
			console.log("ingredient Object", ingredient);
			return {
				"recipeId": ingredient.recipeId,
				"ingredient": ingredient.ingredient,
				"hasIngredient": ingredient.hasIngredient
				};
			};

   	const deleteIngredient= (ingredientId) => {
		return $http.delete(`${FIREBASE_CONFIG.databaseURL}/ingredients/${ingredientId}.json`);
		};

	const updateIngredient = (ingredient, ingredientId) => {
			return $http.put(`${FIREBASE_CONFIG.databaseURL}/ingredients/${ingredientId}.json`, JSON.stringify(ingredient));

		};

	return {postNewIngredient, getIngredientsByRecipe, deleteIngredient, createIngredientObject, updateIngredient, updateHasIngredient};
});