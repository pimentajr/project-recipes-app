import { useState } from 'react';

const useFavoriteRecipies = (
  favoriteFood,
  favoriteDrink,
  drinkOrFood,
) => {
  const [favoriteTrue, setFavoriteTrue] = useState(false);

  const favoriteRecipe = () => {
    const favoritedStore = localStorage.favoriteRecipes;

    const favoriteRecipies = {
      id: favoriteFood.idMeal || favoriteDrink.idDrink,
      type: drinkOrFood,
      area: favoriteFood.strArea || '',
      category: favoriteFood.strCategory || favoriteDrink.strCategory,
      alcoholicOrNot: favoriteDrink.strAlcoholic || '',
      name: favoriteFood.strMeal || favoriteDrink.strDrink,
      image: favoriteFood.strMealThumb || favoriteDrink.strDrinkThumb,
    };

    if (favoritedStore) {
      const favoriteStoreParsed = JSON.parse(favoritedStore);
      if (favoriteStoreParsed.some((a) => a.id === favoriteRecipies.id)) {
        const newFavoriteRecipes = favoriteStoreParsed
          .filter((a) => a.id !== favoriteRecipies.id);

        localStorage.favoriteRecipes = JSON.stringify(newFavoriteRecipes);
      } else {
        localStorage
          .favoriteRecipes = JSON.stringify([favoriteRecipies, ...favoriteStoreParsed]);
      }
    } else {
      localStorage.favoriteRecipes = JSON.stringify([favoriteRecipies]);
    }
    setFavoriteTrue((blackOrWhite) => !blackOrWhite);
  };
  return {
    favoriteTrue,
    setFavoriteTrue,
    favoriteRecipe,
  };
};

export default useFavoriteRecipies;
