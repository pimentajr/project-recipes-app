import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestDrinksOptions } from '../redux/actions/exploreRecipeActions';
import Footer from '../components/common/Footer';

import Header from '../components/Header/Header';
import RecipeCard from '../components/common/RecipeCard';

const SearchDrinksByIngredients = ({
  dispatch,
  options,
  loading,
  error,
}) => {
  useEffect(() => {
    dispatch(requestDrinksOptions());
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
              options.map(({ strDrink, strDrinkThumb }, index) => (
                <RecipeCard
                  key={ index }
                  index={ index }
                  cardType="explorar-bebida"
                  cardTestId="-ingredient-card"
                  recipeThumb={ strDrinkThumb }
                  recipeName={ strDrink }
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

SearchDrinksByIngredients.propTypes = {
  dispatch: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

SearchDrinksByIngredients.defaultProps = {
  options: [],
  error: null,
};

export default connect(mapStateToProps)(SearchDrinksByIngredients);
