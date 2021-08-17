import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestMealsOptions } from '../redux/actions/exploreRecipeActions';
import Footer from '../components/common/Footer';

import Header from '../components/Header/Header';
import RecipeCard from '../components/common/RecipeCard';

const SearchFoodsByIngredients = ({
  dispatch,
  options,
  loading,
  error,
}) => {
  useEffect(() => {
    dispatch(requestMealsOptions());
  }, [dispatch]);

  if (error) {
    return (
      <>
        <Header
          page="Explorar Ingredientes"
          showSearchBtn={ false }
        />
        <main>
          Erro
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header
        page="Explorar Ingredientes"
        showSearchBtn={ false }
      />
      <main>
        {
          (loading)
            ? <div>Loading...</div>
            : (
              options.map(({ strMeal, strMealThumb }, index) => (
                <RecipeCard
                  key={ index }
                  index={ index }
                  cardType="explorar-comida"
                  cardTestId="-ingredient-card"
                  recipeThumb={ strMealThumb }
                  recipeName={ strMeal }
                  titleTestId="-card-name"
                />
              ))
            )
        }
      </main>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  options: state.exploreRecipeReducer.options,
  loading: state.exploreRecipeReducer.isLoading,
  error: state.exploreRecipeReducer.error,
});

SearchFoodsByIngredients.propTypes = {
  dispatch: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

SearchFoodsByIngredients.defaultProps = {
  options: [],
  error: null,
};

export default connect(mapStateToProps)(SearchFoodsByIngredients);
