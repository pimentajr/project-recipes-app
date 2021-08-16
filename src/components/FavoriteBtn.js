import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import White from '../images/whiteHeartIcon.svg';
import Black from '../images/blackHeartIcon.svg';

function FavoriteBtn({ details, gatilho, id, index, update }) {
  const [vamosBrincar, setVamosBrincar] = useState(false);
  const magicNumber = -1;
  let favoritedRecipes = [];
  let recipeId = '';
  let recipeType = ''; let recipeArea = ''; let recipeCategory = '';
  let recipeAlcoholicOrNot = ''; let recipeName = ''; let recipeImg = '';
  useEffect(() => {
    setVamosBrincar(false);
  }, [vamosBrincar, index]);
  if (gatilho !== undefined) {
    switch (gatilho) {
    case 'favorite':
      recipeId = details[0].id;
      recipeType = details[0].type;
      recipeArea = details[0].area;
      recipeCategory = details[0].category;
      recipeAlcoholicOrNot = details[0].alcoholicOrNot;
      recipeName = details[0].name;
      recipeImg = details[0].image;
      break;
    case 'comida':
      recipeId = details[0].idMeal;
      recipeType = 'comida';
      recipeArea = details[0].strArea;
      recipeCategory = details[0].strCategory;
      recipeAlcoholicOrNot = '';
      recipeName = details[0].strMeal;
      recipeImg = details[0].strMealThumb;
      break;
    case 'bebida':
      recipeId = details[0].idDrink;
      recipeType = 'bebida';
      recipeArea = '';
      recipeCategory = details[0].strCategory;
      recipeAlcoholicOrNot = details[0].strAlcoholic;
      recipeName = details[0].strDrink;
      recipeImg = details[0].strDrinkThumb;
      break;
    default:
      break;
    }
  }
  function btnClickHandler() {
    let inicial = true;
    update(true);
    if (!localStorage.favoriteRecipes
        || JSON.parse(localStorage.favoriteRecipes).length < 1) {
      const obj1 = [{
        id: recipeId,
        type: recipeType,
        area: recipeArea,
        category: recipeCategory,
        alcoholicOrNot: recipeAlcoholicOrNot,
        name: recipeName,
        image: recipeImg,
      }];
      localStorage.favoriteRecipes = JSON.stringify(obj1);
      inicial = false;
    }
    if (inicial) {
      const prev = JSON.parse(localStorage.favoriteRecipes);
      favoritedRecipes = [...prev];
      const obj2 = {
        id: recipeId,
        type: recipeType,
        area: recipeArea,
        category: recipeCategory,
        alcoholicOrNot: recipeAlcoholicOrNot,
        name: recipeName,
        image: recipeImg,
      };
      if (favoritedRecipes.some((item) => item.id === obj2.id)) {
        const filter2 = favoritedRecipes.filter((el) => el.id !== obj2.id);
        localStorage.favoriteRecipes = JSON.stringify(filter2);
      } else {
        const filter3 = [...favoritedRecipes, obj2];
        localStorage.favoriteRecipes = JSON.stringify(filter3);
      }
    }
    setVamosBrincar(true);
  }
  if (localStorage.favoriteRecipes) {
    const prev = JSON.parse(localStorage.favoriteRecipes);
    favoritedRecipes = [...prev];
  }
  return (
    <div>
      <button
        type="button"
        onClick={ btnClickHandler }
      >
        <img
          data-testid={ index > magicNumber
            ? `${index}-horizontal-favorite-btn` : 'favorite-btn' }
          src={ favoritedRecipes.some((item) => item.id === id) ? Black : White }
          alt="icone Share"
        />
      </button>
    </div>
  );
}
export default FavoriteBtn;
FavoriteBtn.propTypes = {
  details: PropTypes.arrayOf(Array),
  gatilho: PropTypes.string,
  id: PropTypes.string,
}.isRequired;
