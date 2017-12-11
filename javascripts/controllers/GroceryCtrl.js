"use strict";

app.controller("GroceryCtrl", function($rootScope, $scope, $window, AuthService, IngredientService,  RecipeService){
  $scope.recipes = [];


  const getRecipes = () => {
    RecipeService.getOnMenu(AuthService.getCurrentUid()).then((results) => {
        results.forEach((result) => {
            IngredientService.getIngredientsByRecipe(result.id).then ((ingredients) => {
                result.ingredients = ingredients;
            });
        });
        
        
        $scope.recipes = results;
    }).catch((err) => {
        console.log("error in getRecipes on MEnu", err);
    });
};

getRecipes();



});