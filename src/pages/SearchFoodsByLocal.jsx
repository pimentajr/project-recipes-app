import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestMealsAreas } from '../redux/actions/exploreRecipeActions';
import {
  requestMealsMenu,
  requestMealsByArea,
} from '../redux/actions/menuReducerActions';
import Header from '../components/Header/Header';
import Footer from '../components/common/Footer';
import RecipeCard from '../components/common/RecipeCard';

const SearchFoodsByLocal = ({ dispatch, areas, menu }) => {
  const [currentOption, setCurrentOption] = useState('All-option');

  useEffect(() => {
    if (currentOption === 'All-option') {
      dispatch(requestMealsMenu());
    } else {
      dispatch(requestMealsByArea(currentOption));
    }
  }, [currentOption, dispatch]);

  useEffect(() => {
    dispatch(requestMealsAreas());
  }, [dispatch]);

  return (
    <>
      <Header
        page="Explorar Origem"
        showSearchBtn
      />
      <main>
        <nav>
          <select
            data-testid="explore-by-area-dropdown"
            onChange={ ({ target: { value } }) => setCurrentOption(value) }
          >
            <option
              data-testid="All-option"
              value="All-option"
            >
              All
            </option>
            {
              areas.map((area, index) => (
                <option
                  data-testid={ `${area}-option` }
                  valu={ area }
                  key={ index }
                >
                  { area }
                </option>
              ))
            }
          </select>
        </nav>
        {
          menu.map(({ idMeal, strMeal, strMealThumb }, index) => (
            <RecipeCard
              key={ index }
              index={ index }
              cardType="comida"
              cardTestId="-recipe-card"
              recipeId={ idMeal }
              recipeThumb={ strMealThumb }
              recipeName={ strMeal }
              titleTestId="-card-name"
            />
          ))
        }
      </main>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  areas: state.exploreRecipeReducer.recipeByArea.areas,
  menu: state.menuReducer.menu,
});

SearchFoodsByLocal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  areas: PropTypes.arrayOf(PropTypes.string).isRequired,
  menu: PropTypes.arrayOf(PropTypes.object),
};

SearchFoodsByLocal.defaultProps = {
  menu: [],
};

export default connect(mapStateToProps)(SearchFoodsByLocal);
