"use strict";

app.service("RecipeService", function($http, $q, FIREBASE_CONFIG) {

		const getFavoriteRecipes= (userUid) => {
				 let recipes = [];
				 return $q((resolve, reject) => {
				 	$http.get(`${FIREBASE_CONFIG.databaseURL}/recipes.json?orderBy="uid"&equalTo="${userUid}"`).then((results) => {
				 		let fbRecipes = results.data;

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

		const getOnMenu= (userUid) => {
			 let recipes = [];
			 return $q((resolve, reject) => {
			 	$http.get(`${FIREBASE_CONFIG.databaseURL}/recipes.json?orderBy="uid"&equalTo="${userUid}"`).then((results) => {
			 		let dbRecipes = results.data;
			 			Object.keys(dbRecipes).forEach((key) => {
	                   dbRecipes[key].id = key; 
	                    if(dbRecipes[key].onMenu){
	                    recipes.push(dbRecipes[key]);
	                	}
	                	resolve(recipes);
	              	});
			 	}).catch((err) => {
			 		reject(err);
			 		console.log("getOnMenuError", err);
			 });
			 });
	};

		const getWannaTryRecipes= (userUid) => {
			let recipes = [];
			return $q((resolve, reject) => {
				$http.get(`${FIREBASE_CONFIG.databaseURL}/recipes.json?orderBy="uid"&equalTo="${userUid}"`).then((results) => {
					let fbRecipes = results.data;

					Object.keys(fbRecipes).forEach((key) => {
					fbRecipes[key].id = key; 
					if(fbRecipes[key].wannaTry){
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
				"label": recipe.label,
				"url": recipe.url,
				"image": recipe.image,
				"isFavorite": recipe.isFavorite,
				"onMenu": recipe.onMenu,
				"uid": recipe.uid,
				"comments": recipe.comments,
				"wannaTry": recipe.wannaTry

				};
			};

		const postNewRecipe = (NewRecipe) => {
		 	return $http.post(`${FIREBASE_CONFIG.databaseURL}/recipes.json`, JSON.stringify(NewRecipe));
		};

		const updateRecipe = (recipe, recipeId) => {
			return $http.put(`${FIREBASE_CONFIG.databaseURL}/recipes/${recipeId}.json`, JSON.stringify(recipe));

		};

		const deleteRecipe= (recipeId) => {
		return $http.delete(`${FIREBASE_CONFIG.databaseURL}/recipes/${recipeId}.json`);
		};

		const getSingleRecipe = (recipeId)=> {
			return $http.get(`${FIREBASE_CONFIG.databaseURL}/recipes/${recipeId}.json`);
	};

		return {getFavoriteRecipes, createRecipeObject, postNewRecipe, getOnMenu, updateRecipe, deleteRecipe, getSingleRecipe, getWannaTryRecipes};
});





