import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Ingredients({ ingredients }) {
  const allIngredients = [
    `${ingredients.strMeasure1} - ${ingredients.strIngredient1}`,
    `${ingredients.strMeasure2} - ${ingredients.strIngredient2}`,
    `${ingredients.strMeasure3} - ${ingredients.strIngredient3}`,
    `${ingredients.strMeasure4} - ${ingredients.strIngredient4}`,
    `${ingredients.strMeasure5} - ${ingredients.strIngredient5}`,
    `${ingredients.strMeasure6} - ${ingredients.strIngredient6}`,
    `${ingredients.strMeasure7} - ${ingredients.strIngredient7}`,
    `${ingredients.strMeasure8} - ${ingredients.strIngredient8}`,
    `${ingredients.strMeasure9} - ${ingredients.strIngredient9}`,
    `${ingredients.strMeasure10} - ${ingredients.strIngredient10}`,
    `${ingredients.strMeasure11} - ${ingredients.strIngredient11}`,
    `${ingredients.strMeasure12} - ${ingredients.strIngredient12}`,
    `${ingredients.strMeasure13} - ${ingredients.strIngredient13}`,
    `${ingredients.strMeasure14} - ${ingredients.strIngredient14}`,
    `${ingredients.strMeasure15} - ${ingredients.strIngredient15}`,
    `${ingredients.strMeasure16} - ${ingredients.strIngredient16}`,
    `${ingredients.strMeasure17} - ${ingredients.strIngredient17}`,
    `${ingredients.strMeasure18} - ${ingredients.strIngredient18}`,
    `${ingredients.strMeasure19} - ${ingredients.strIngredient19}`,
    `${ingredients.strMeasure20} - ${ingredients.strIngredient20}`,
  ].filter((teste) => teste !== '  - ');

  return (
    <ul>
      {
        ingredients.strIngredient1
          ? allIngredients.map((value, index) => (
            <li
              key={ value }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {value}
            </li>))
          : <h1>Carregando</h1>
      }
    </ul>
  );
}

Ingredients.propTypes = ({
  ingredient: PropTypes.arrayOf,
}).isRequired;

const mapStateToProps = (state) => ({
  ingredients: state.recipeDetailsReducer.meal,
});

export default connect(mapStateToProps)(Ingredients);
