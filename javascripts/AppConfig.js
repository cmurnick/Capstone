"use strict";

let isAuth = (AuthService) => new Promise ((resolve, reject) => {
  if(AuthService.isAuthenticated()){
    resolve();
  } else {
    reject();
  }
});



app.run(function($location, $rootScope, FIREBASE_CONFIG, AuthService){
  firebase.initializeApp(FIREBASE_CONFIG);

  
//watch method that fires on change of a route.  3 inputs. 
  //event is a change event
  //currRoute is information about your current route
  //prevRoute is information about the route you came from
  $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute) {
    // checks to see if there is a cookie with a uid for this app in localstorage
    let logged = AuthService.isAuthenticated();
    let appTo;

    // to keep error from being thrown on page refresh
    if (currRoute.originalPath) {
      // check if the user is going to the auth page = currRoute.originalPath
      // if user is on auth page then appTo is true
      // if it finds something other than /auth it return a -1 and -1!==-1 so resolves to false
      
      // currRoute.originalPath = '/search'   -1 !== -1   appTo = false
      // currRoute.originalPath = '/auth'   0 !== -1   appTo =true
      appTo = currRoute.originalPath.indexOf('/auth') !== -1;
    }

    if (!appTo && !logged) {
      //if not on /auth page AND not logged in redirect to /auth     
      event.preventDefault();
      $rootScope.navbar = false;
      $location.path('/auth');
    } else if (appTo && !logged){
      //if on /auth page AND not logged in, no redirect only authentiate in navbar
      $rootScope.navbar = false;
    } else if (appTo && logged){
      //if on /auth page AND logged in, redirect to search page
      $rootScope.navbar = true;
      $location.path('/search');
    } else if (!appTo && logged){
      //if not on /auth page AND logged in see other navbar
      $rootScope.navbar = true;
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
    .when("/recipe/favComment/:id", {
      templateUrl: 'partials/recipes/favComment.html',
      controller: 'FavCommentCtrl',
      resolve: {isAuth}
    })
    .when("/wannaTry", {
      templateUrl: 'partials/recipes/wannaTry.html',
      controller: 'WannaTryCtrl',
      resolve: {isAuth}
    })
		.otherwise('/auth');
});

app.config(['ngToastProvider', function(ngToast) {
  ngToast.configure({
    verticalPosition: 'top',
    horizontalPosition: 'center',
    animation: 'fade',
    maxNumber: 1
  });
}]);