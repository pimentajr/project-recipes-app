import React, { useEffect } from 'react';
import { func, shape, string } from 'prop-types';
import { connect } from 'react-redux';
import ConcludeRecipe from '../components/common/ConcludeRecipe';
import IngredientsListWithCheckbox from
  '../components/common/IngredientsListWithCheckbox';
import RecipeInstructions from '../components/common/RecipeInstructions';
import { requestMealDetails } from '../redux/actions/recipeDetailsActions';
import HeaderDetails from '../components/common/HeaderDetails/HeaderDetails';

const FoodRecipeProgress = ({
  dispatch,
  match,
  mealDetails,
  thumbDetails,
  altDetails,
  categoryDetails,
}) => {
  const { params: { id } } = match;
  useEffect(() => {
    dispatch(requestMealDetails(id));
    let inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes) {
      if (inProgressRecipes.meals) {
        if (inProgressRecipes.meals[id]) {
          inProgressRecipes = {
            ...inProgressRecipes,
          };
        } else {
          inProgressRecipes = {
            ...inProgressRecipes,
            meals: {
              ...inProgressRecipes.meals,
              [id]: [],
            },
          };
        }
      } else {
        inProgressRecipes = {
          ...inProgressRecipes,
          meals: {
            [id]: [],
          },
        };
      }
    } else {
      inProgressRecipes = {
        meals: {
          [id]: [],
        },
      };
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }, [dispatch, id]);
  if (mealDetails.strInstructions === undefined) return (<span>Carregando...</span>);
  const oldIngredients = [
    `${mealDetails.strMeasure1} - ${mealDetails.strIngredient1}`,
    `${mealDetails.strMeasure2} - ${mealDetails.strIngredient2}`,
    `${mealDetails.strMeasure3} - ${mealDetails.strIngredient3}`,
    `${mealDetails.strMeasure4} - ${mealDetails.strIngredient4}`,
    `${mealDetails.strMeasure5} - ${mealDetails.strIngredient5}`,
    `${mealDetails.strMeasure6} - ${mealDetails.strIngredient6}`,
    `${mealDetails.strMeasure7} - ${mealDetails.strIngredient7}`,
    `${mealDetails.strMeasure8} - ${mealDetails.strIngredient8}`,
    `${mealDetails.strMeasure9} - ${mealDetails.strIngredient9}`,
    `${mealDetails.strMeasure10} - ${mealDetails.strIngredient10}`,
    `${mealDetails.strMeasure11} - ${mealDetails.strIngredient11}`,
    `${mealDetails.strMeasure12} - ${mealDetails.strIngredient12}`,
    `${mealDetails.strMeasure13} - ${mealDetails.strIngredient13}`,
    `${mealDetails.strMeasure14} - ${mealDetails.strIngredient14}`,
    `${mealDetails.strMeasure15} - ${mealDetails.strIngredient15}`,
    `${mealDetails.strMeasure16} - ${mealDetails.strIngredient16}`,
    `${mealDetails.strMeasure17} - ${mealDetails.strIngredient17}`,
    `${mealDetails.strMeasure18} - ${mealDetails.strIngredient18}`,
    `${mealDetails.strMeasure19} - ${mealDetails.strIngredient19}`,
    `${mealDetails.strMeasure20} - ${mealDetails.strIngredient20}`,
  ];
  const ingredients = oldIngredients.filter((ingredient) => (
    !ingredient.startsWith(' ') && !ingredient.startsWith('null')
  ));
  return (
    <>
      <div>Tela de receita em processo de comidas</div>
      <HeaderDetails
        thumb={ thumbDetails.strMealThumb }
        alt={ altDetails.strMeal }
        title={ altDetails.strMeal }
        category={ categoryDetails.strCategory }
        drinkOrFood="comida"
      />
      <IngredientsListWithCheckbox
        id={ mealDetails.idMeal }
        ingredients={ ingredients }
        recipeType="meals"
      />
      <RecipeInstructions strInstructions={ mealDetails.strInstructions } />
      <ConcludeRecipe
        id={ mealDetails.idMeal }
        ingredients={ ingredients }
        recipeType="meals"
      />
    </>
  );
};
const mapStateToProps = ({
  recipeDetailsReducer,
}) => ({
  mealDetails: recipeDetailsReducer.meal,
  thumbDetails: recipeDetailsReducer.meal,
  altDetails: recipeDetailsReducer.meal,
  categoryDetails: recipeDetailsReducer.meal,
});

FoodRecipeProgress.propTypes = ({
  dispatch: func,
  mealDetails: shape({
    idMeal: string,
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
    strIngredient16: string,
    strIngredient17: string,
    strIngredient18: string,
    strIngredient19: string,
    strIngredient20: string,
    strMeasure1: string,
    strMeasure2: string,
    strMeasure3: string,
    strMeasure4: string,
    strMeasure5: string,
    strMeasure6: string,
    strMeasure7: string,
    strMeasure8: string,
    strMeasure9: string,
    strMeasure10: string,
    strMeasure11: string,
    strMeasure12: string,
    strMeasure13: string,
    strMeasure14: string,
    strMeasure15: string,
    strMeasure16: string,
    strMeasure17: string,
    strMeasure18: string,
    strMeasure19: string,
    strMeasure20: string,
  }),
}).isRequired;

export default connect(mapStateToProps)(FoodRecipeProgress);
