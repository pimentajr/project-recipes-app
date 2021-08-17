import React, { useEffect } from 'react';
import { func, shape, string } from 'prop-types';
import { connect } from 'react-redux';
import ConcludeRecipe from '../components/common/ConcludeRecipe';
import IngredientsListWithCheckbox from
  '../components/common/IngredientsListWithCheckbox';
import RecipeInstructions from '../components/common/RecipeInstructions';
import filterDrinkMeasuresAndIngredients from
  '../helpers/filterDrinkMeasuresAndIngredients';
import { requestDrinkDetails } from '../redux/actions/recipeDetailsActions';
import HeaderDetails from '../components/common/HeaderDetails/HeaderDetails';

const DrinkRecipeProgress = ({
  dispatch,
  match,
  drinkDetails,
  thumbDrinks,
  altDrinks,
  categoryDetails,
}) => {
  const { params: { id } } = match;
  useEffect(() => {
    dispatch(requestDrinkDetails(id));
    let inProgressRecipes = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    );
    if (inProgressRecipes) {
      if (inProgressRecipes.cocktails) {
        if (inProgressRecipes.cocktails[id]) {
          inProgressRecipes = {
            ...inProgressRecipes,
          };
        } else {
          inProgressRecipes = {
            ...inProgressRecipes,
            cocktails: {
              ...inProgressRecipes.cocktails,
              [id]: [],
            },
          };
        }
      } else {
        inProgressRecipes = {
          ...inProgressRecipes,
          cocktails: {
            [id]: [],
          },
        };
      }
    } else {
      inProgressRecipes = {
        cocktails: {
          [id]: [],
        },
      };
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }, [dispatch, id]);
  if (drinkDetails.strInstructions === undefined) return <span>Carregando...</span>;
  const measuresAndIngredients = filterDrinkMeasuresAndIngredients(drinkDetails);
  return (
    <>
      <div>Tela de receita em processo de bebida</div>
      <HeaderDetails
        thumb={ thumbDrinks.strDrinkThumb }
        alt={ altDrinks.strDrink }
        title={ altDrinks.strDrink }
        category={ categoryDetails.strAlcoholic }
        drinkOrFood="bebida"
      />
      <IngredientsListWithCheckbox
        id={ drinkDetails.idDrink }
        ingredients={ measuresAndIngredients }
        recipeType="cocktails"
      />
      <RecipeInstructions strInstructions={ drinkDetails.strInstructions } />
      <ConcludeRecipe
        id={ drinkDetails.idDrink }
        ingredients={ measuresAndIngredients }
        recipeType="cocktails"
      />
    </>
  );
};

const mapStateToProps = ({ recipeDetailsReducer }) => ({
  drinkDetails: recipeDetailsReducer.drink,
  thumbDrinks: recipeDetailsReducer.drink,
  altDrinks: recipeDetailsReducer.drink,
  categoryDetails: recipeDetailsReducer.drink,
});

DrinkRecipeProgress.propTypes = {
  dispatch: func,
  drinkDetails: shape({
    idDrink: string,
    strIngredient1: string,
    strIngredient2: string,
    strIngredient3: string,
    strIngredient4: string,
    strIngredient5: string,
    strIngredient6: string,
    strIngredient7: string,
    strIngredient8: string,
    strIngredient9: string,
    strIngredient10: string,
    strIngredient11: string,
    strIngredient12: string,
    strIngredient13: string,
    strIngredient14: string,
    strIngredient15: string,
  }),
}.isRequired;

console.log(typeof DrinkRecipeProgress);

export default connect(mapStateToProps)(DrinkRecipeProgress);
