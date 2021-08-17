import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { TransparentButton } from '../styles';
import ShareButton from './ShareButton';

export default function DoneRecipeCard({ recipe, index }) {
  const history = useHistory();
  const path = `/${recipe.type}s/${recipe.id}`;
  return (
    <div className="m-2 card">
      <div data-testid={ `${index}-recipe-card` } className="d-flex">
        <TransparentButton
          type="button"
          style={ {
            height: '100%',
            objectFit: 'cover',
            width: '45%',
          } }
          onClick={ () => history.push(path) }
        >
          <img
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${index}-horizontal-image` }
            style={ {
              height: '100%',
              objectFit: 'cover',
              width: '100%',
            } }
          />
        </TransparentButton>
        <div className="d-flex flex-column align-items-center">
          <div className="d-flex">
            <p data-testid={ `${index}-horizontal-top-text` }>
              {(recipe.type === 'comida') ? (
                `${recipe.area} - ${recipe.category}`) : recipe.alcoholicOrNot }
            </p>
            <ShareButton
              dataTestid={ `${index}-horizontal-share-btn` }
              type={ recipe.type }
              id={ recipe.id }
            />
          </div>
          <TransparentButton
            type="button"
            onClick={ () => history.push(path) }
          >
            <h4 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h4>
          </TransparentButton>
          <span data-testid={ `${index}-horizontal-done-date` }>
            { recipe.doneDate }
          </span>
          <div>
            {
              (recipe.tags) && recipe.tags.map((element, key) => (
                <p
                  key={ key }
                  data-testid={ `${index}-${element}-horizontal-tag` }
                >
                  { element }
                </p>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

DoneRecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    doneDate: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.string,
  }).isRequired,
};
