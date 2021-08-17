import React, { useEffect } from 'react';
import '../../styles/components/recommendationCarousel.css';
import { string, func } from 'prop-types';
import { connect } from 'react-redux';
import {
  requestMealsMenu,
  requestDrinkMenu,
} from '../../redux/actions/menuReducerActions';
import RecipeCard from './RecipeCard';

const RecommendationCarousel = ({ url, dispatch, menu, loading, error }) => {
  const maxCarouselCards = 6;

  useEffect(() => {
    if (url.includes('comidas')) {
      dispatch(requestDrinkMenu());
    } else {
      dispatch(requestMealsMenu());
    }
  }, [dispatch, url]);

  if (error) {
    return <div>Erro</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (url.includes('comidas') && !loading && !error) {
    return (
      <>
        <h3>Recomendadas</h3>
        <div className="recommendation-carousel">
          {
            menu
              .slice(0, maxCarouselCards)
              .map(({ idDrink, strDrink, strDrinkThumb }, index) => (
                <RecipeCard
                  key={ index }
                  cardType="bebida"
                  cardTestId="-recomendation-card"
                  index={ index }
                  recipeId={ idDrink }
                  recipeThumb={ strDrinkThumb }
                  recipeName={ strDrink }
                  titleTestId="-recomendation-title"
                />
              ))
          }
        </div>
      </>
    );
  }

  if (url.includes('bebidas') && !loading && !error) {
    return (
      <>
        <h3>Recomendadas</h3>
        <div className="recommendation-carousel">
          {
            menu
              .slice(0, maxCarouselCards)
              .map(({ idMeal, strMeal, strMealThumb }, index) => (
                <RecipeCard
                  key={ index }
                  cardType="comida"
                  cardTestId="-recomendation-card"
                  index={ index }
                  recipeId={ idMeal }
                  recipeThumb={ strMealThumb }
                  recipeName={ strMeal }
                  titleTestId="-recomendation-title"
                />
              ))
          }
        </div>
      </>
    );
  }
};

const mapStateToProps = (state) => ({
  menu: state.menuReducer.menu,
  loading: state.menuReducer.isLoading,
  error: state.menuReducer.error,
});

RecommendationCarousel.propTypes = ({
  url: string,
  dispatch: func,
}).isRequired;

export default connect(mapStateToProps)(RecommendationCarousel);
