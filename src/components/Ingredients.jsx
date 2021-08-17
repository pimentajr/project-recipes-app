import PropTypes from 'prop-types';
import React from 'react';

const onChecked = {
  textDecoration: 'line-through',
  fontSize: '25px',
};

const offChecked = {
  textDecoration: 'none',
  fontSize: '25px',
};

export default function Ingredients({ ingredients, inProgress, setIngredients }) {
  function checkedIngredient(ingredientName) {
    const newIngredients = ingredients.map(({ name, measure, checked }) => {
      if (name === ingredientName) {
        return { name, measure, checked: !checked };
      }
      return { name, measure, checked };
    });
    setIngredients(newIngredients);
  }

  return (
    <div className="bg-light pt-2 mx-3 rounded border">
      <ol className="d-flex flex-column">
        {
          ingredients.map(({ name, measure, checked }, index) => (
            (inProgress) ? (
              <div className="d-flex align-items-center">
                <label
                  key={ index }
                  htmlFor={ name }
                  data-testid={ `${index}-ingredient-step` }
                  style={ (checked) ? onChecked : offChecked }
                >
                  <input
                    style={ { height: '20px', width: '20px' } }
                    onClick={ () => checkedIngredient(name) }
                    type="checkbox"
                    checked={ checked }
                    id={ name }
                  />
                  { `  ${name} - ${measure}` }
                </label>
              </div>
            ) : (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { `${name} - ${measure}` }
              </li>
            )
          ))
        }
      </ol>
    </div>
  );
}

Ingredients.propTypes = {
  inProgress: PropTypes.string,
  ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
  setIngredients: PropTypes.func.isRequired,
};

Ingredients.defaultProps = {
  inProgress: undefined,
};
