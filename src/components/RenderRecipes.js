import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DoRecipesBtn from './DoRecipesBtn';

export default function RenderRecipes({ id, trigger, title, index, srcImage, target }) {
  // const { typeRecipes, nameRecipes } = props;
  return (
    <div>
      <Link to={ `/${trigger}/${id}` }>
        <div
          className="card-body"
          key={ index }
          data-testid={ `${index}-recipe-card` }
        >
          <img
            src={ srcImage }
            className="cardImage"
            data-testid={ `${index}-card-img` }
            alt="logo"
          />
          <h2 data-testid={ `${index}-card-name` }>
            { title }
          </h2>
        </div>
      </Link>
      <Link to={ `/${trigger}/${id}/in-progress` }>
        <DoRecipesBtn target={ target } />
      </Link>
    </div>
  );
}

RenderRecipes.propTypes = {
  title: PropTypes.string,
  index: PropTypes.number,
  srcImage: PropTypes.string,
}.isRequired;
