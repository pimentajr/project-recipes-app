import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function CardRecipe({ item, index }) {
  function renderFoodCard(object) {
    if (object.idMeal) {
      return (
        <Link to={ `/comidas/${object.idMeal}` }>
          <div data-testid={ `${index}-recipe-card` } className="recipe-card">
            <p
              data-testid={ `${index}-card-name` }
              className="recipe-card-title"
            >
              { object.strMeal }
            </p>
            <img
              data-testid={ `${index}-card-img` }
              src={ object.strMealThumb }
              alt={ `${index}-card-name` }
              width="50px"
            />
          </div>
        </Link>
      );
    }
    if (object.strCategory) {
      return (
        <>
          <p data-testid={ `${object.strCategory}-category-filter` }>
            { object.strCategory }
          </p>
          <img
            data-testid={ `${index}-card-img` }
            src={ object.strCategoryThumb }
            alt={ `${index}-card-name` }
            width="50px"
          />
        </>);
    }
  }

  function renderDrinkCard(object) {
    if (object.idDrink) {
      return (
        <Link to={ `/bebidas/${object.idDrink}` }>
          <div data-testid={ `${index}-recipe-card` } className="recipe-card">
            <p
              data-testid={ `${index}-card-name` }
              className="recipe-card-title"
            >
              { object.strDrink }
            </p>
            <img
              data-testid={ `${index}-card-img` }
              src={ object.strDrinkThumb }
              alt={ `${index}-card-name` }
              width="50px"
            />
          </div>
        </Link>
      );
    }
    if (object.strCategory) {
      return (
        <>
          <p data-testid={ `${index}-card-name` }>{ object.strCategory }</p>
          <img
            data-testid={ `${index}-card-img` }
            src="https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg"
            alt={ `${index}-card-name` }
            width="50px"
          />
        </>
      );
    }
  }

  return (
    item.strMeal ? renderFoodCard(item) : renderDrinkCard(item)
  );
}
CardRecipe.propTypes = {
  item: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default CardRecipe;
