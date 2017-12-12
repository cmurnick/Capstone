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

    // $scope.haveIngredient = (ingredient, IngredientId) => {
    //         if(value === false) {
    //         ingredient.haveIngredient = true;
    //         RecipeService.deleteRecipe(recipeId).then((results) => {
    //                 IngredientService.getIngredientsByRecipe(recipeId).then((ingredients) => {
    //                     console.log("ingredient", ingredients);
    //                     ingredients.forEach((ingredient) => {
    //                         IngredientService.deleteIngredient(ingredient.id);

    //         let updatedRecipe = RecipeService.createRecipeObject(recipe);
    //         RecipeService.updateRecipe(updatedRecipe, recipeId).then((result) => {
    //             getRecipes();
    //         }).catch((err) => {
    //             console.log("error in DeleteRecipe", err);
    //         }); 
    //         }   else {
    //             RecipeService.deleteRecipe(recipeId).then((results) => {
    //                 IngredientService.getIngredientsByRecipe(recipeId).then((ingredients) => {
    //                     console.log("ingredient", ingredients);
    //                     ingredients.forEach((ingredient) => {
    //                         IngredientService.deleteIngredient(ingredient.id);
    //                     });
    //                 });
    //             });
    //         }
    //             getRecipes();   
    //         };


    // $scope.haveIngredient = (ingredientId) => {
    //     IngredientService.getIngredientsByRecipe(ingredientId).then((ingredients) => {
    //        let ingredients.haveItem = true;

    // }

});