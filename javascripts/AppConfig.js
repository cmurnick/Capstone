"use strict";

let isAuth = (AuthService) => new Promise ((resolve, reject) => {
  if(AuthService.isAuthenticated()){
    resolve();
  } else {
    reject();
  }
});

app.config(function($routeProvider) {
	$routeProvider
		.when("/auth", {
			templateUrl: "partials/auth.html",
			controller:'AuthCtrl'
		})
		.when("/search", {
			templateUrl: "partials/recipes/search.html",
			controller:'SearchCtrl',
			resolve: {isAuth}
		})
		.when("/favorite", {
			templateUrl: "partials/recipes/favorite.html",
			controller:'FavoriteCtrl',
			resolve: {isAuth}
		})
		.when("/menu", {
			templateUrl: "partials/recipes/menu.html",
			controller:'MenuCtrl',
			resolve: {isAuth}
		})
                  .when("/grocery", {
			templateUrl: "partials/recipes/grocery.html",
			controller:'GroceryCtrl',
			resolve: {isAuth}
		})
		.when("/recipe/:id", {
			templateUrl: "partials/recipes/recipe_detail.html",
			controller:'RecipeDetailCtrl',
			resolve: {isAuth}
		})
		.otherwise('/auth');
});