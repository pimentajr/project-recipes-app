import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { func, shape, string } from 'prop-types';

import RecipeInstructions from '../components/common/RecipeInstructions';
import StartRecipeBtn from '../components/common/StartRecipeBtn';
import { requestMealDetails } from '../redux/actions/recipeDetailsActions';
import RecipeVideo from '../components/common/RecipeVideo';
import RecommendationCarousel from '../components/common/RecommendationCarousel';
import HeaderDetails from '../components/common/HeaderDetails/HeaderDetails';

import Ingredients from '../services/Ingredients';

const FoodDetails = (
  {
    dispatch,
    match,
    mealDetails,
    thumbDetails,
    altDetails,
    categoryDetails,
  },
) => {
  const { params: { id }, url } = match;

  useEffect(() => {
    dispatch(requestMealDetails(id));
  }, [dispatch, id]);
  if (mealDetails.strInstructions === undefined) return (<span>Carregando...</span>);
  return (
    <>
      <HeaderDetails
        thumb={ thumbDetails.strMealThumb }
        alt={ altDetails.strMeal }
        title={ altDetails.strMeal }
        category={ categoryDetails.strCategory }
        drinkOrFood="comida"
      />
      <Ingredients />
      <RecipeInstructions strInstructions={ mealDetails.strInstructions } />
      <RecipeVideo strYoutube={ mealDetails.strYoutube } />
      <RecommendationCarousel url={ url } />
      <StartRecipeBtn routeInfo={ { id, url } } />
    </>
  );
};

const mapStateToProps = (state) => ({
  mealDetails: state.recipeDetailsReducer.meal,
  thumbDetails: state.recipeDetailsReducer.meal,
  altDetails: state.recipeDetailsReducer.meal,
  categoryDetails: state.recipeDetailsReducer.meal,
});

FoodDetails.propTypes = {
  dispatch: func,
  match: shape({
    params: shape({
      id: string,
    }),
    url: string,
  }),
  mealDetails: shape({
    strInstructions: string,
  }),
}.isRequired;

export default connect(mapStateToProps)(FoodDetails);
