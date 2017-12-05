"use strict";

let isAuth = (AuthService) => new Promise ((resolve, reject) => {
  if(AuthService.isAuthenticated()){
    resolve();
  } else {
    reject();
  }
});



app.run(function($location, $rootScope, FIREBASE_CONFIG, AuthService) {
  firebase.initializeApp(FIREBASE_CONFIG);

  $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute) {
    // checks to see if there is a current user
    var logged = AuthService.isAuthenticated();

    var appTo;

    // to keep error from being thrown on page refresh
    if (currRoute.originalPath) {
      // check if the user is going to the auth page = currRoute.originalPath
      // if user is on auth page then appTo is true
      // if it finds something other than /auth it return a -1 and -1!==-1 so resolves to false
      // curreRoute.originalPath= '/search' -1 !==_1   appTo=false
      
      appTo = currRoute.originalPath.indexOf('/auth') !== -1;
    }

    //if not on /auth page AND not logged in redirect to /auth
    if (!appTo && !logged) {
      event.preventDefault();
      $location.path('/auth');
    }
  });
});


app.config(function($routeProvider) {
	$routeProvider
		.when("/auth", {
			templateUrl: 'partials/auth.html',
			controller:'AuthCtrl'
		})
		.when("/search", {
			templateUrl: 'partials/recipes/search.html',
			controller:'SearchCtrl',
			resolve: {isAuth}
		})
		.when("/favorite", {
			templateUrl: 'partials/recipes/favorite.html',
			controller:'FavoriteCtrl',
			resolve: {isAuth}
		})
		.when("/menu", {
			templateUrl: 'partials/recipes/menu.html',
			controller:'MenuCtrl',
			resolve: {isAuth}
		})
            .when("/grocery", {
			templateUrl: 'partials/recipes/grocery.html',
			controller:'GroceryCtrl',
			resolve: {isAuth}
		})
		.when("/recipe/:id", {
			templateUrl: 'partials/recipes/recipe_detail.html',
			controller:'RecipeDetailCtrl',
			resolve: {isAuth}
		})
		.otherwise('/auth');
});