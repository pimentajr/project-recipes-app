export default function favoriteFilter(setfavoriteRecipe, filter) {
  if (localStorage.favoriteRecipes) {
    if (filter === 'all') {
      setfavoriteRecipe(JSON.parse(localStorage.favoriteRecipes));
    } if (filter === 'food') {
      const doneRecipesFromLS = JSON.parse(localStorage.favoriteRecipes);
      const foodFoneRecipes = doneRecipesFromLS
        .filter((recipe) => recipe.type === 'comida');
      setfavoriteRecipe(foodFoneRecipes);
      console.log('dentroDoIfFodao 2');
    } if (filter === 'drink') {
      const doneRecipesFromLS = JSON.parse(localStorage.favoriteRecipes);
      const drinkDoneRecipes = doneRecipesFromLS
        .filter((recipe) => recipe.type === 'bebida');
      setfavoriteRecipe(drinkDoneRecipes);
      console.log('dentroDoIfFodao 3');
    }
  }
}
