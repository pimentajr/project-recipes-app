import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function drinksIngredients({ drinkDetails }) {
  const oldIngredients = [
    drinkDetails.strIngredient1,
    drinkDetails.strIngredient2,
    drinkDetails.strIngredient3,
    drinkDetails.strIngredient4,
    drinkDetails.strIngredient5,
    drinkDetails.strIngredient6,
    drinkDetails.strIngredient7,
    drinkDetails.strIngredient8,
    drinkDetails.strIngredient9,
    drinkDetails.strIngredient10,
    drinkDetails.strIngredient11,
    drinkDetails.strIngredient12,
    drinkDetails.strIngredient13,
    drinkDetails.strIngredient14,
    drinkDetails.strIngredient15,
  ];

  const oldMeasures = [
    drinkDetails.strMeasure1,
    drinkDetails.strMeasure2,
    drinkDetails.strMeasure3,
    drinkDetails.strMeasure4,
    drinkDetails.strMeasure5,
    drinkDetails.strMeasure6,
    drinkDetails.strMeasure7,
    drinkDetails.strMeasure8,
    drinkDetails.strMeasure9,
    drinkDetails.strMeasure10,
    drinkDetails.strMeasure11,
    drinkDetails.strMeasure12,
    drinkDetails.strMeasure13,
    drinkDetails.strMeasure14,
    drinkDetails.strMeasure15,
  ];

  const newIngredients = oldIngredients.filter((ingredient) => ingredient !== null);
  const newMeasures = oldMeasures.filter((measure) => measure !== null);

  return (
    <ul>
      {
        drinkDetails
          ? newIngredients.map((element, index) => {
            if (newMeasures[index] === undefined) return null;
            return (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${newMeasures[index]} - ${element}`}
              </li>);
          })
          : <h1>Carregando</h1>
      }

    </ul>
  );
}

drinksIngredients.propTypes = ({
  drinkDetails: PropTypes.arrayOf,
}).isRequired;

const mapStateToProps = (state) => ({
  drinkDetails: state.recipeDetailsReducer.drink,
});

export default connect(mapStateToProps)(drinksIngredients);
