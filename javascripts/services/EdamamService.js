"use strict";

app.service("EdamamService", function($http, EDAMAM_CONFIG) {
	const searchRecipes = (query) => {
		return $http.get(`https://api.edamam.com/search?q=${query}&app_id=${EDAMAM_CONFIG.appId}&app_key=${EDAMAM_CONFIG.appKey}&from=0&to=20&health=vegan`);
	};
	
	return{searchRecipes};
});