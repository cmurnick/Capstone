"use strict";

app.service("IngredientService", function($http, $q, FIREBASE_CONFIG) {
	const postNewIngredient = (NewIngredient) => {
		 	return $http.post(`${FIREBASE_CONFIG.databaseURL}/ingredients.json`, JSON.stringify(NewIngredient));
	};

	return {postNewIngredient};
});